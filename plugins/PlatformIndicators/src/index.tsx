import { patcher } from "@vendetta";
import { findByDisplayName, findByName, findByProps, findByStoreName } from "@vendetta/metro";
import { i18n, ReactNative } from "@vendetta/metro/common";
import {General} from "@vendetta/ui/components"
import AAAA from "./AAAA";
import StatusIcon from "./StatusIcon";
import { getStatusColor } from "./colors";
import { findInReactTree, unfreeze } from "@vendetta/utils";
import StatusIcons from "./StatusIcons";

const {Text,View } = General;

let unpatchUploader;
let unpatchEmbeds;

export default {
    onLoad: () => {
        const Pressable = findByDisplayName("Pressable",false); //importing from ReactNative doesn't work
        patcher.before("render",Pressable.default.type,(args)=>{
            if(!args) return;
            if(!args[0]) return;
            const [ props ] = args;
            if(!props) return;
            if(props.accessibilityRole == "button"){
                if(props.children){
                    if(props.children.length >= 2){
                        if(props.children[0]?.props?.user){
                            //console.log(props.children[0]?.props?.user?.id)
                            const uid = props.children[0]?.props?.user?.id
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
        });
        

        const PresenceStore = findByStoreName("PresenceStore");
        patcher.after("type",findByProps("DirectMessageRow").DirectMessageRow,(args,res) => {
            //window.dmr =res
            const userId = res.props?.user?.id
            patcher.after("type",res,(args,res) => {
                //console.log(res)
                const comp = findInReactTree(res,m => m.props?.children[0]?.type?.displayName == "View")
                //window.comp1 = comp.props.children[0]
                comp.props.children[0].props.children[0] = <View style={{
                    flexDirection: 'row'
                }}>
                    {comp.props.children[0].props.children[0]}
                    <StatusIcons userId={userId}/>
                </View>
            })
        })

        patcher.after("default",findByName("ChannelHeader",false),(args,res) => {
            //window.ch = res
            if(!(res.type?.type?.name == "PrivateChannelHeader")) return;
            patcher.after("type",res.type,(args,res) => {
                if(!res.props?.children?.props?.children) return;
                const userId = findInReactTree(res,m => m.props?.user?.id)?.props?.user?.id
                if(!userId) return;
                //console.log(res.props.children.props.children)
                const dmTopBar = res.props.children

                if(dmTopBar.props.children.key != "DMTabsV2Header"){
                    dmTopBar.props.children = <View 
                        key="DMTabsV2Header"    
                        style={{
                        flexDirection: 'row'
                    }}>
                        {dmTopBar.props.children}
                        <View 
                            key="DMTabsV2HeaderIcons"
                            style={{
                                flexDirection: 'row'
                            }}></View>
                    </View>
                }
                const topIcons = findInReactTree(res,m => m.key == "DMTabsV2HeaderIcons")
                topIcons.props.children = <StatusIcons userId={userId}/>
            })
        })

        },
    onUnload: () => {
        unpatchUploader();

    },
}