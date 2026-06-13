import { before } from "@vendetta/patcher";
import Settings from "./Settings";
import { findByDisplayName } from "@vendetta/metro";
import { ReactNative, stylesheet, constants as Constants } from "@vendetta/metro/common";
import { semanticColors } from "@vendetta/ui";
import { General } from "@vendetta/ui/components";
import { SizeTag } from "./SizeTag";
import { findInReactTree } from "@vendetta/utils";

const { View,Text } = General;
const { Pressable } = ReactNative;

let unpatch;

export default {
    onLoad: () => {
        const styles = stylesheet.createThemedStyleSheet({
            sizeTagWrapper: {
                position: 'relative'
            },
            sizeTag: {
                //backgroundColor: semanticColors.BACKGROUND_ACCENT,
                backgroundColor: '#1e1f2280',
                borderRadius: 4,
                paddingHorizontal: 4,
                paddingVertical: 2,
                position: 'absolute',
                top: 3,
                left: 3
            },
            sizeText: {
                includeFontPadding: false,
                fontSize: 10,
                //color: semanticColors.TEXT_NORMAL,
                color: "white",
                fontFamily: Constants.Fonts.PRIMARY_BOLD,
            }
        });

        const Pressable = findByDisplayName("Pressable",false); //importing from ReactNative doesn't work

        //unpatch = before("render",Pressable.default.type,(args)=>{
        unpatch = before("type",Pressable.default,(args)=>{
            if(!args) return;
            if(!args[0]) return;

            const [ props ] = args;

            if(!props) return;
            if(!props.modifiedByFileSizeOnPicker){
                if(props?.children?.[0]?.props?.localImageSource){
                    props.modifiedByFileSizeOnPicker = true
                    props.originalChildren = props.children

                    let fileUrl = null
                    if(!props.skip){
                        const img = findInReactTree(props.originalChildren, m => m.props?.localImageSource)
                        //window.iiimmg = img
                        if(img){
                            fileUrl = img.props.localImageSource.uri
                        } else {
                            props.skip = true
                        }
                    } else {
                        return
                    }
                    props.children = <View style={styles.sizeTagWrapper}>
                        {props.originalChildren}
                        <View style={styles.sizeTag}>
                            <SizeTag url={fileUrl} style={styles.sizeText}/>
                        </View>
                    </View>
                }
            }
        });
    },
    onUnload: () => {
        unpatch();
    },
}
