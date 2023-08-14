import { patcher } from "@vendetta";
import { findByDisplayName, findByName, findByProps, findByStoreName, findByDisplayNameAll } from "@vendetta/metro";
import {General} from "@vendetta/ui/components"
import { findInReactTree } from "@vendetta/utils";
import { getAssetByName, getAssetIDByName } from "@vendetta/ui/assets";
import { ReactNative } from "@vendetta/metro/common";

const {Text,View } = General;



let unpatches = [];


export default {
    onLoad: () => {

        //spagetti code ahead
        const { DCDChatManager } = ReactNative.NativeModules;
        unpatches.push(patcher.before("updateRows", DCDChatManager, args => {
            const rows = JSON.parse(args[1]);
            for ( const row of rows ) {
                if (row.type !== 1) continue;
                row.message.avatarDecorationURL = row.message.avatarURL
            }
            args[1] = JSON.stringify(rows);
        }));


        const Rows = findByProps("GuildMemberRow")
        unpatches.push(patcher.after("type", Rows.GuildMemberRow, ([{ user }], res) => {
            //console.log(res.props.children[0])
            //res.props.children[0] = [res.props.children[0],<Text>AAA</Text>]
            if(res?.props?.children[0]?.type){
                const unpatch1 = patcher.after("type",res.props.children[0].type, (args, res) => {
                    //console.log(res)
                    window.pfp = res
                    if(res?.props?.style[0]?.borderRadius){
                        res.props.style[0].borderRadius = 4
                    }
                    unpatch1()
                })
            }
        }))

        /*const GuildContainerObj = findByProps("GuildContainer")
        unpatches.push(patcher.after("SimpleGuild", GuildContainerObj, (args, res) => {
            console.log(res)
        }))*/

        /*const TouchableWithoutFeedbackObj = findByProps("TouchableWithoutFeedback")
        unpatches.push(patcher.before("TouchableWithoutFeedback", TouchableWithoutFeedbackObj, (args) => {
            //console.log(args)
        }))
        unpatches.push(patcher.before("TouchableWithoutFeedback", TouchableWithoutFeedbackObj, (args) => {
            
            //console.log(res?.props?.children?.props?.children[0]?.props?.children?.type?.name)

            if(args[0]?.props?.children?.props?.children[0]?.props?.children?.type?.name == "GuildIcon"){
                //console.log(args[1])
                args[0].props.children.props.children[0].props.style.push({borderRadius:4})
            }
        }))*/

        
        

        /*setTimeout(()=>{
            findByDisplayName("View").forEach((v) => {
                console.log("pa")
                console.log(v)
                unpatches.push(patcher.before("render",v,(args) => {
                    //console.log(args)
                    console.log(args[0]?.children?.type?.name)
                    if(args[0]?.children?.type?.name == "GuildIcon"){
                        args[0].style.borderRadius = 4
                    }
                }))
            });


            unpatches.push(patcher.after("render",findByDisplayName("View"),(args,res) => {
                //console.log(args)
                console.log(args[0]?.children?.type?.name)
                if(args[0]?.children?.type?.name == "GuildIcon"){
            
                }

                if(res?.props?.style?.marginTop||res?.props?.style?.position == "relative"){
                    console.log(args)
                }
            }))
        },1000)*/
        
        setTimeout(()=>{
            console.log("AAA")
            
        },1);

        

        findByDisplayNameAll("View").forEach((v) => {
            console.log("pa")
            console.log(v)
            unpatches.push(patcher.before("render",v,(args) => {
                /*console.log(args[0]?.children?.length)
                console.log(args[0]?.children?.type?.name)*/
                if(args[0]?.children?.type?.name == "GuildIcon"){
                    args[0].style.borderRadius = 4
                }

                /*if(args[0]?.children?.type?.name == "GuildIconSelectable"){
                    window.gis = args[0]
                }*/
                if(args[0]?.children?.length == 4){
                    if(
                        args[0]?.children[1]?.props?.hasOwnProperty("selected") &&
                        args[0]?.children[2]?.props?.guild?.id
                    ){
                        let style = args[0].children[0].props.style
                        style[style.length - 1] = {}
                        //args[0].children[0].props.style = {}
                    }
                    //window.gis2 = args[0]
                }

                if(args[0]?.children?.length == 3){
                    if(args[0]?.children[2]?.type?.name == "HeaderAvatar"){
                        //console.log("G")
                        window.gis2 = args[0]
                        //console.log(args[0]?.children[2]?.type?.name)

                        if(args[0]?.children[0]?.props?.style[1]?.borderRadius){
                            args[0].children[0].props.style[1].borderRadius = 8
                        }
                        

                    }

                }

            }))
        });

        const HeaderAvatar = findByName("HeaderAvatar",false);
        unpatches.push(patcher.after("default", HeaderAvatar, (args,res) => {
            const doTypeThing = (res) => {
                const unpatch1 = patcher.after("type",res.type,(args,res) => {
                    let borderRadiusObj = res.props.style.find(h => h.borderRadius)
                    
                    borderRadiusObj.borderRadius = 4
                    unpatch1()
                })
            }

            console.log(res?.type)
            if(res?.type?.type){
                if(res?.type?.displayName){
                    doTypeThing(res.props.children)
                } else {
                    doTypeThing(res)
                }
                
            }
        }))

        const { setAMOLEDThemeEnabled } = findByProps("setAMOLEDThemeEnabled");
        const { useAMOLEDTheme } = findByProps("useAMOLEDTheme");

        let amoledThemeState = useAMOLEDTheme == 2
        setAMOLEDThemeEnabled(!amoledThemeState);
        setAMOLEDThemeEnabled(amoledThemeState);

    },
    onUnload: () => {
        unpatches.forEach(u => u());

    },
}