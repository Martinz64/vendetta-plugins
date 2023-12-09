import { patcher } from "@vendetta";
import { findByDisplayName, findByName, findByProps, findByStoreName, findByTypeNameAll } from "@vendetta/metro";
import {General} from "@vendetta/ui/components"
import { findInReactTree } from "@vendetta/utils";
import StatusIcons from "./StatusIcons";
import { getAssetByName, getAssetIDByName } from "@vendetta/ui/assets";
import { storage } from "@vendetta/plugin";
import Settings from "./settings";
import React, { useState, useEffect } from 'react';
import RerenderContainer from "./RerenderContainer";
import PresenceUpdatedContainer from "./PresenceUpdatedContainer";
const {Text,View } = General;

let unpatches = [];

//export { default as settings } from "./settings";

export default {
    onLoad: () => {

        storage.dmTopBar ??= true
        storage.userList ??= true
        storage.profileUsername ??= true
        storage.removeDefaultMobile ??= true
        storage.fallbackColors ??= false
        storage.oldUserListIcons ??= false

        //spagetti code ahead

        //Big view patch
        unpatches.push(patcher.after("render",View,(_,res) => {
            if(storage.dmTopBar){

                const textChannel = findInReactTree(res, r => r?.props?.children[1]?.type?.name == "ChannelActivity" && r?.props?.children[1]?.props?.hasOwnProperty?.("userId"))
                if(!textChannel)return;
                if(textChannel.props?.children?.length != 2) return;
                if(textChannel.props?.children[0]?.props?.children?.length != 2) return;
                
                const target = textChannel.props?.children[0]?.props?.children
                if(target.filter(m => m?.props?.userId).length == 2){
                    const target2 = target[1]
                    const uid = target2.props?.userId;
                    if(!uid) return;

                    patcher.after("type",target2,(args,res) => {
                        //console.log("SSSSSS",args,res)
                        if(!findInReactTree(res, m => m.key == "StatusIcons")){
                            res = <View style={{
                                    display: 'flex',
                                    flexDirection: 'row'
                                }}>
                                    {res}
                                    <PresenceUpdatedContainer key="StatusIcons">
                                        <StatusIcons userId={uid}/>
                                    </PresenceUpdatedContainer>
                                </View>
                        }
                        return res
                    })
                }
            }

        }))

        //Big pressable patch
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

                        if((props.children[0]?.props?.user && props.children[0]?.props?.channel) || storage.oldUserListIcons){
                            //how many checks is too many?
                            if(!props.children[0]) return;
                            if(!props.children[0]?.props?.user) return;
                            const uid = props.children[0]?.props?.user?.id


                            if(!uid) return;
                            //window.uuu = props
                            if(!props.children?.find(m => m.key == "StatusIcons")){
                                //props.children[0][1].props.children[0].props.children[0]
                                props.children.push(
                                //props.children[0][1]?.props?.children[0]?.props?.children?.push?.(
                                    <View 
                                        key="StatusIcons"
                                        style={{
                                            display: 'flex',
                                    flexDirection: 'row'}}></View>
                                )
                            }

                            //explota
                            const icons = props.children?.find(m => m.key == "StatusIcons");                            
                            //if(icons.props?.children){
                                icons.props.children = <StatusIcons userId={uid}/>
                            //}
                        }
                    }
                }
            }

            if(props.accessibilityRole == "button"){
                if(!storage.userList) return;
                if(props?.children?.props?.children?.props?.children){
                    if(props?.children?.props?.children?.props?.children[0]?.type?.type?.name == "GuildContainerIndicator"){
                        //window.row2 = props.children
                        //console.log("BTN: ",props)
                        
                        
                        //> > row2.props.children.props.children[1].props.children[0].props.children.props.userrow2.props.children.props.children[1].props.children[0].props.children.props.user

                        const userId = props?.children?.props?.children?.props?.children[1]?.props?.children[0]?.props?.children?.props?.user?.id

                        if(props?.children?.props?.children?.props?.children[1]?.props?.children[0]?.props?.children?.props?.guildId) return;
                        if(userId){
                        
                            
                            //props.children.props.children.props.children[2].props.children[0] = <Text>AAABBBB</Text>
                            const nameArea = props?.children?.props?.children?.props?.children[2]?.props?.children[0]
                            //console.log(nameArea)
                            if(nameArea){

                                //nameArea.props.children[0].props.children.push(<Text>AAABBBB{userId}</Text>)

                                const userName = nameArea.props.children[0].props.children //.push(<Text>AAABBBB</Text>)
                                

                                //props?.children?.props?.children?.props?.children[1]?.props?.children[1]?.props?.itemKey

                                if(!findInReactTree(userName, (c) => c.key == "DMTabsV2DMList-v2")){
                                    userName.push(
                                        <PresenceUpdatedContainer key="DMTabsV2DMList-v2">
                                            <StatusIcons userId={userId}/>
                                        </PresenceUpdatedContainer>
                                    )
                                }
                            }
                        }


                    }
                }
                

            }
            
        }));
        

        const PresenceStore = findByStoreName("PresenceStore");


        /*Dead code
        unpatches.push(patcher.after("type",findByProps("DirectMessageRow").DirectMessageRow,(args,res) => {
            return;

            //window.dmr =res

            //this shouldn't crash 
            if(!res.props?.user) return;
            const userId = res.props?.user?.id

            if(!userId) return;




            patcher.after("type",res,(args,res) => {
                //console.log("DMR",res)
                //tabs v2 dm list indicators
                //return;
                const comp = findInReactTree(res,m => m.props?.children[0]?.type?.displayName == "View")
                //window.comp1 = comp.props.children[0]
                //comp.props.children[0].props.children
                return;

                comp.props.children[0].props.children[0] = <View style={{
                //comp.props.children[0].props.children = <View style={{
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
        }));*/

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
                    
                    //console.log("DTB",dmTopBar)
                    if(dmTopBar.props?.children?.props?.children[1]){
                        if(typeof dmTopBar.props?.children?.props?.children[1]?.type == "function"){

                            //alert(typeof dmTopBar.props?.children?.props?.children[1]?.type)
                            const titleThing = dmTopBar.props?.children?.props?.children[1]    

                            
                            const unpatchTV2HdrV2 = patcher.after("type",titleThing, (args,res)=>{
                                //console.log("TITLE",res)
                                unpatchTV2HdrV2()
                                if(!findInReactTree(res, (c) => c.key == "DMTabsV2Header-v2")){
                                    res.props.children[0].props.children.push(
                                        <PresenceUpdatedContainer key="DMTabsV2Header-v2">
                                            <StatusIcons userId={userId}/>
                                        </PresenceUpdatedContainer>
                                    )
                                }
                            })
                            


                        } else {

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
                    }

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

        //
        //next 2 patches taken from here: https://github.com/Fierdetta/staff-tags/
        const Rows = findByProps("GuildMemberRow")
        unpatches.push(patcher.after("type", Rows.GuildMemberRow, ([{ user }], res) => {
            if(!storage.userList) return;
            if(storage.oldUserListIcons) return;

            const statusIconsView = findInReactTree(res, (c) => c.key == "GuildMemberRowStatusIconsView");
            if(!statusIconsView){
                const row = findInReactTree(res, (c) => c.props.style.flexDirection === "row")
                /*if(row.props?.children){
                    console.log(row.props?.children[1])
                }*/
                //row.props.children.splice(2, 0,
                //row.props.children.push(
                row.props.children.splice(2, 0,
                    <View 
                        key="GuildMemberRowStatusIconsView"
                        style={{
                            flexDirection: 'row'
                    }}>
                        <StatusIcons userId={user.id}/>
                    </View>
                )
            }
        }))

        const rowPatch = ([{ user }], res) => {
            if(!storage.userList) return;
            if(storage.oldUserListIcons) return;
            const statusIconsView = findInReactTree(res, (c) => c.key == "TabsV2MemberListStatusIconsView");
            if(!statusIconsView){
                const row = findInReactTree(res.props.label, (c) => c.props?.lineClamp).props.children
                if(row?.props?.children){
                    //console.log("TV2ROW",row.props.children)
                    /*let element = (
                        <View key="TabsV2MemberListStatusIconsView">
                            <Text> </Text>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <StatusIcons userId={user.id}/>
                            </View>
                        </View>);*/
                    let element = (
                        <View key="TabsV2MemberListStatusIconsView" style={{
                                    flexDirection: 'row'
                                }}>
                                    <StatusIcons userId={user.id}/>
                                </View>);
                        
                    
                    let index = 1;


                    //if(row.props.children[1]?.props?.children[1]?.type?.name == "BotTag"){
                    //    row.props.children[1].props.children.splice(2,0 ,element)
                    //}else {
                        row.props.children[1]=element
                    //}
                }
            }
        }

        findByTypeNameAll("UserRow").forEach((UserRow) => unpatches.push(patcher.after("type", UserRow, rowPatch)))


        /* Saving for later
        unpatches.push(patcher.before("PureComponentWrapper", findByProps("PureComponentWrapper"), (args, res) => {
            //console.log("PureComponentWrapper")
        }))*/



        },
    onUnload: () => {
        unpatches.forEach(u => u());

    },

    settings:()=>{
        return <Settings/>
    }

}

