import { patcher } from "@vendetta";
import { findByDisplayName, findByName, findByProps, findByStoreName } from "@vendetta/metro";
import {General} from "@vendetta/ui/components"
import { findInReactTree } from "@vendetta/utils";
import StatusIcons from "./StatusIcons";
import { getAssetByName, getAssetIDByName } from "@vendetta/ui/assets";
import { storage } from "@vendetta/plugin";
import Settings from "./settings";
import React, { useState, useEffect } from 'react';
import RerenderContainer from "./RerenderContainer";
const {Text,View } = General;

let unpatches = [];

//export { default as settings } from "./settings";

export default {
    onLoad: () => {

        storage.dmTopBar ??= true
        storage.userList ??= true
        storage.profileUsername ??= true
        storage.removeDefaultMobile ??= true

        //spagetti code ahead

        unpatches.push(patcher.after("render",View,(_,res) => {
            //return;
            const textChannel = findInReactTree(res, r => r?.props?.children[1]?.type?.name == "ChannelActivity" && r?.props?.children[1]?.props?.hasOwnProperty?.("userId"))
            if(!textChannel)return;

            //textChannel.props.children = <Text>UwU</Text>

            const uid = textChannel.props.children[1].props.userId;

            const target = textChannel.props.children[0]

            const target2 = textChannel.props.children[0].props.children[1]
            patcher.after("type",target2,(_,res) => {
                console.log("SSSSSS",res)
                if(!findInReactTree(res, m => m.key == "StatusIcons")){
                    res = <View style={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}>
                            {res}
                            <View 
                            key="StatusIcons"
                            style={{
                                display: 'flex',
                            flexDirection: 'row'}}>
                                <RerenderContainer>
                                    <StatusIcons userId={uid}/>
                                </RerenderContainer>
                            </View>
                    </View>
                        
                }
                //const icons = findInReactTree(res, m => m.key == "StatusIcons");                            
                //icons.props.children = <StatusIcons userId={uid}/>
                //icons.props.children = 
                return res
            })
            console.log(target)
            /*if(!target.props.children.find(m => m.key == "StatusIcons")){
                target.props.children.push(
                    <View 
                        key="StatusIcons"
                        style={{
                            display: 'flex',
                    flexDirection: 'row'}}></View>
                )
            }
            const icons = target.props.children.find(m => m.key == "StatusIcons");                            
            icons.props.children = <StatusIcons userId={uid}/>*/
        }))

        const Pressable = findByDisplayName("Pressable",false); //importing from ReactNative doesn't work
        unpatches.push(patcher.before("render",Pressable.default.type,(args)=>{
            if(!args) return;
            if(!args[0]) return;
            const [ props ] = args;
            if(!props) return;

            //user list in non tabs v2
            if(props.accessibilityRole == "button"){
                if(!storage.userList) return;
                if(props.children){
                    if(props.children.length >= 2){
                        if(props.children[0]?.props?.user){
                            //how many checks is too many?
                            if(!props.children[0]) return;
                            if(!props.children[0]?.props?.user) return;
                            const uid = props.children[0]?.props?.user?.id

                            if(!uid) return;

                            //window.uuu = props
                            if(!props.children.find(m => m.key == "StatusIcons")){
                                props.children.push(
                                    <View 
                                        key="StatusIcons"
                                        style={{
                                            display: 'flex',
                                    flexDirection: 'row'}}></View>
                                )
                            }
                            const icons = props.children.find(m => m.key == "StatusIcons");                            
                            icons.props.children = <StatusIcons userId={uid}/>
                        }
                    }
                }
            }


            if(props.accessibilityRole == "header"){
                //non tabs v2 dm header
                return;
                if(!storage.dmTopBar) return;
                //window.hhhh = props.children
                if(findInReactTree(props.children,m => m.props?.title && m.props?.icon)){
                    const header = findInReactTree(props.children,m => m.props?.title && m.props?.icon);
                    if(header.props?.titleSuffix){
                        if(!findInReactTree(header.props.titleSuffix,m => m.key == "DMStatusIndicators")){
                            //props.children.props.title =
                            header.props.titleSuffix =
                            [
                                header.props.titleSuffix,
                                <View 
                                    key="DMStatusIndicators"
                                    style={{
                                        flexDirection: "row"
                                    }}></View>
                            ]
                        }
                        const userId = findInReactTree(header.props.titleSuffix,m => m.props?.userId).props?.userId;
                        if(userId){
                            const DMStatusIndicators = findInReactTree(header.props.titleSuffix,m => m.key == "DMStatusIndicators")
                            if(DMStatusIndicators){
                                DMStatusIndicators.props.children = <StatusIcons userId={userId}/>
                            }
                        }
                    }
                }
            }
        }));
        

        const PresenceStore = findByStoreName("PresenceStore");
        unpatches.push(patcher.after("type",findByProps("DirectMessageRow").DirectMessageRow,(args,res) => {
            //window.dmr =res

            //this shouldn't crash 
            if(!res.props?.user) return;
            const userId = res.props?.user?.id

            if(!userId) return;

            patcher.after("type",res,(args,res) => {
                //console.log("DMR",res)

                //tabs v2 dm list indicators
                const comp = findInReactTree(res,m => m.props?.children[0]?.type?.displayName == "View")
                //window.comp1 = comp.props.children[0]
                comp.props.children[0].props.children[0] = <View style={{
                    flexDirection: 'row'
                }}>
                    {comp.props.children[0].props.children[0]}
                    <View style={{
                        marginLeft: 2,
                        flexDirection: 'row'
                    }}>
                        <StatusIcons userId={userId}/>
                    </View>
                    
                </View>
            })
        }));

        //tabs v2 dm header
        unpatches.push(patcher.after("default",findByName("ChannelHeader",false),(args,res) => {

            if(!storage.dmTopBar) return;
            //window.ch = res
            if(!(res.type?.type?.name == "PrivateChannelHeader")) return;

            patcher.after("type",res.type,(args,res) => {
                if(!res.props?.children?.props?.children) return;
                const userId = findInReactTree(res,m => m.props?.user?.id)?.props?.user?.id
                if(!userId) return;
                
                const dmTopBar = res.props?.children
                if(!findInReactTree(res,m => m.key == "DMTabsV2Header")){

                    //note to self: don't hardcode asset ids
                    const arrowId = getAssetIDByName("arrow-right");
                    const container1 = findInReactTree(dmTopBar, m => m.props?.children[1]?.props?.source == arrowId)

                    container1.props?.children?.push(<View 
                        key="DMTabsV2Header"    
                        style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignContent: 'flex-start'
                    }}>
                        <View 
                            key="DMTabsV2HeaderIcons"
                            style={{
                                flexDirection: 'row'
                            }}></View>
                    </View>)

                }
                const topIcons = findInReactTree(res,m => m.key == "DMTabsV2HeaderIcons")
                if(topIcons){
                    topIcons.props.children = <StatusIcons userId={userId}/>
                }
                

            })
        }));

        //icons on profile
        //might explode in a future update
        const DefaultName = findByName("DefaultName", false);
        unpatches.push(patcher.after("default", DefaultName, (args, res) => {
            const user = args[0]?.user;
            if (user === undefined) return;
            if(!res) return;
            if(!user.id) return;
            if(!storage.profileUsername)return;
            res.props?.children[0]?.props?.children?.push(<StatusIcons userId={user.id}/>)
        }));

        const DisplayName = findByName("DisplayName", false);
        unpatches.push(patcher.after("default", DisplayName, (args, res) => {
            const user = args[0]?.user;
            if (user === undefined) return;
            if(!res) return;
            if(!user.id) return;
            if(!storage.profileUsername)return;
            res.props?.children?.props?.children[0]?.props?.children?.push(<StatusIcons userId={user.id}/>)
        }));

        const Status = findByName("Status", false);
        unpatches.push(patcher.before("default", Status, (args) => {
            if(!args) return;
            if(!args[0]) return;
            if(!storage.removeDefaultMobile)return;
            args[0].isMobileOnline = false
        }))

        },
    onUnload: () => {
        unpatches.forEach(u => u());

    },

    settings:()=>{
        return <Settings/>
    }

}

