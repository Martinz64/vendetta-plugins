import { patcher } from "@vendetta";
import { findByName } from "@vendetta/metro";
import { findInReactTree } from "@vendetta/utils";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { clipboard } from "@vendetta/metro/common";
import { showToast } from "@vendetta/ui/toasts";

let unpatches = [];
export default {
    onLoad: () => {
        const ThemedRolePill = findByName("ThemedRolePill",false);
        unpatches.push(patcher.after("default",ThemedRolePill,(args,res) => {
            if(res.props?.onPress){
                let roleIcon = findInReactTree(res, m => m?.props?.style[0]?.borderRadius && m?.props?.style[1]?.backgroundColor?.startsWith("#"))
                const color = roleIcon?.props?.style[1]?.backgroundColor

                res.props.onLongPress = () => {
                    clipboard.setString(color);
                    showToast("Copied role color to clipboard", getAssetIDByName("ic_message_copy"));
                }
            }
        }))
        },
    onUnload: () => {
        unpatches.forEach(u => u());

    },
}