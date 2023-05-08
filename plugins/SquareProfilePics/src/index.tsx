import { patcher } from "@vendetta";
import { findByDisplayName, findByName, findByProps, findByStoreName } from "@vendetta/metro";
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
    },
    onUnload: () => {
        unpatches.forEach(u => u());

    },
}