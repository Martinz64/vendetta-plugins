import { patcher } from "@vendetta";
import { findByDisplayName, findByName, findByProps, findByPropsAll, findByStoreName, findByTypeNameAll } from "@vendetta/metro";
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
        storage.useNativeIcons ??= true

        //spagetti code ahead

        //Big view patch
        unpatches.push(patcher.after("render",View,(_,res) => {




            /*if(res?.props?.children?.props?.children){
                if(res?.props?.children?.props?.children[1]?.type?.type?.name == "ChannelUnreadBadge"){
                    //if(res.props?.hasOwnProperty("hitSlop")){
                        res.props.style = {
                            background: "#ff0000"
                        }
                        console.log("colapsable",res)
                    //}
                }
            }*/

            /*console.log(res)
            if(res?.props?.accessibilityLabel == 'Main (mensaje directo)'){
                //if(res.props?.hasOwnProperty("hitSlop")){
                    res.props.style = {
                        background: "#ff0000"
                    }
                    console.log("colapsable",res)
                //}
            }*/


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


            // tabs v2 DM list (current)
            if(storage.userList){
                if(props?.children?.props?.children?.props?.children){ 
                    if(props.children.props.children.props.children[1]?.type?.type?.name == "ChannelUnreadBadge"){
                    //if(findInReactTree(props, m => m?.type?.type?.name == "ChannelUnreadBadge")){
                        //window.prv1 = args
                        const targetCard = props.children.props.children
                        const userDataElement = findInReactTree(targetCard, m => m?.user)
                        if(userDataElement?.user){
                            //console.log("UDE",userDataElement)
                            if(!findInReactTree(props, m => m?.key == "TabsV2-DM-List")){
                                //const userHeader = findInReactTree(props, m => (m?.props?.children == username && m?.props?.variant == "text-md/semibold"))
                                const userHeader = findInReactTree(props, m => (m?.props?.variant == "text-md/semibold" || m?.props?.variant == "redesign/channel-title/semibold"))
                                if(userHeader){
                                    userHeader.props.children = [
                                        userHeader.props.children, 
                                        <View 
                                            key="TabsV2-DM-List"
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                alignContent: 'flex-start'
                                        }}>
                                            <PresenceUpdatedContainer>
                                                <StatusIcons userId={userDataElement.user.id}/>
                                            </PresenceUpdatedContainer>
                                        </View>
                                    ]
                                }
                            }
                        }
                        
                        /*props.children.props.children.props.children[3].props.children[0].props.children[0].props.children = [
                            props.children.props.children.props.children[3].props.children[0].props.children[0].props.children,
                            <View><Text>User</Text></View>
                        ]*/
                        //props.children.props.children.props.children[3].props.children[1].props.children = <View><Text>User</Text></View>
                        //props.children = <View><Text>Pressabletest</Text></View>
                    }
                }
            }
            
            //user list in non tabs v2
            //might remove later
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

            //DM list on tabs v2
            //kinda broken ik
            if(props.accessibilityRole == "button"){
                if(!storage.userList) return;

                //diggy diggy hole
                if(props?.children?.props?.children?.props?.children){
                    //console.log("diggy", props?.children?.props?.children?.props?.children[0]?.type?.type?.name)
                    //if(props?.children?.props?.children?.props?.children[0]?.type?.type?.name == "GuildContainerIndicator" || props?.children?.props?.children?.props?.children[0]?.type?.type?.name == "ChannelUnreadBadge"){
                    if(props?.children?.props?.children?.props?.children[0]?.type?.type?.name == "GuildContainerIndicator"){
                        
                        //if(!findInReactTree(props.children, m => m?.source?.uri?.contains?.("/avatars"))) return;
                        //if(!findInReactTree(props.children, m => m?.props?.source?.uri)) return;
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
        if(Rows?.GuildMemberRow){
            unpatches.push(patcher.after("type", Rows.GuildMemberRow, ([{ user }], res) => {
                if(!storage.userList) return;
                if(storage.oldUserListIcons) return;
                const statusIconsView = findInReactTree(res, (c) => c.key == "GuildMemberRowStatusIconsView");
                if(!statusIconsView){
                    const row = findInReactTree(res, (c) => c.props.style.flexDirection === "row")
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
        }

        // user list on tabs v2
        const rowPatch = ([{ user }], res) => {
            if(!storage.userList) return;
            


            //const row2 = findInReactTree(res.props.label, (c) => c.props?.lineClamp).props.children
            window.row2 = res

            /*const row2 = findInReactTree(res.props.label, (c) => c.props?.lineClamp)
            console.log("r2propschild:",row2.props.children)
            row2.props.children = (
                <View style={{
                    flex:1,
                    justifyContent: "space-between"
                }}>
                    <Text>UwU</Text>
                    {row2.props.children.props.children}
                </View>

            )*/


            const modifiedStatusIcons = findInReactTree(res, (c) => c.key == "TabsV2MemberListStatusIconsView");
            if(!modifiedStatusIcons){
                res.props.label = (
                    <View style={{
                        flex:1,
                        justifyContent: storage.oldUserListIcons ? "space-between": "flex-start",
                        flexDirection: "row"
                    }}
                    key="TabsV2MemberListStatusIconsView">
                        {res.props.label}
                        <View key="TabsV2MemberListStatusIconsView" style={{
                            flexDirection: 'row'
                        }}>
                            <StatusIcons userId={user.id}/>
                        </View>
                    </View>
                )
            }

            
        }

        findByTypeNameAll("UserRow").forEach((UserRow) => unpatches.push(patcher.after("type", UserRow, rowPatch)))






        //Saving for later (tests)
        /*unpatches.push(patcher.before("PureComponentWrapper", findByProps("PureComponentWrapper"), (args) => {
            console.log("PureComponentWrapper")
            window.pcw = args

            args[0].renderer = (a) => {
                return <View><Text>PureComponentWrapper</Text></View>
            }
        }))*/
        
        /*
        unpatches.push(patcher.after("PureComponentWrapper", findByProps("PureComponentWrapper"), (args,res) => {
            console.log("PureComponentWrapper")
            window.pcw = res


            patcher.after("renderer", res.props, (args,res) => {
                console.log("RENDERER")
                window.renderer1 = res
                res.props.children = [<View><Text>renderer1</Text></View>,res.props.children]
            })

        
        }))*/

        /*unpatches.push(patcher.before("render", findByProps("PureComponentWrapper").PureComponentWrapper.prototype, (args) => {
            console.log("PureComponentWrapper.render")
            window.pcwr = args
            return <View>
                <Text>AABBBB</Text>
            </View>
        }))*/


        /*unpatches.push(patcher.before("constructor", findByProps("PureComponentWrapper").PureComponentWrapper.prototype, (args) => {
            console.log("PureComponentWrapper.render")
            window.pcwrc = args
        }))*/


        /*findByPropsAll("CellContainer").forEach((CellContainer) => unpatches.push(patcher.before("CellContainer", CellContainer, (args) => {
            console.log("CellContainer")
            window.cc1 = args

        })))*/

        /*unpatches.push(patcher.before("CellContainer", findByProps("CellContainer"), (args) => {
            console.log("CellContainer")
            window.cc1 = args
        }))*/

        /*const ViewRenderer = findByName("ViewRenderer",false)
        unpatches.push(patcher.before("default", ViewRenderer, (args) => {
            //return;

            window.vrrargs = args

            args[0].childRenderer = (a,b,c,d) => {
                return <View><Text>childRenderer</Text></View>
            }

            return;

            const origrender = args[0].renderItemContainer
            args[0].renderItemContainer = (a,b) => {
                //console.log("render",a,b)
                let retval = origrender(a,b)
                //console.log("render-ret", retval)
                window.vrrargs2 = retval
                //retval.props.children = <View><Text>UWU</Text></View>

                if(retval?.props?.children?.props?.renderer){
                    retval.props.children.props.renderer = (a) => {
                        return <View><Text>UWU</Text></View>
                    }
                }


                return retval
            }



            const itemlayout = args[0].onItemLayout
            args[0].onItemLayout = (a,b) => {
                //console.log("render",a,b)
                let retval = itemlayout(a,b)
                //console.log("render-ret", retval)
                window.vrrargs3 = retval
                //retval.props.children = <View><Text>UWU</Text></View>


                return retval
            }
        }))
        unpatches.push(patcher.after("default", ViewRenderer, (args, res) => {
            console.log("VRRR")
            window.viewrender = res
        }))*/








        },
    onUnload: () => {
        unpatches.forEach(u => u());

    },

    settings:()=>{
        return <Settings/>
    }

}

