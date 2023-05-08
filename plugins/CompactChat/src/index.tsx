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
        const Chat = findByName("Chat");
        unpatches.push(patcher.after("render",Chat.prototype,(args,res)=>{
            console.log("Chat",res)

            /*res.props.style[0].marginLeft = -10
            res.props.style[0].left = -48*/
            //res.props.children[0].props.style.marginLeft = -10
            res.props.children[0].props.style.left = -48
            window.cn = res
            res.props.onTapUsername = res.props.onTapAvatar
        }));

        const { DCDChatManager } = ReactNative.NativeModules;
        unpatches.push(patcher.before("updateRows", DCDChatManager, args => {
            const rows = JSON.parse(args[1]);

            for ( const row of rows ) {
                if (row.type !== 1) continue;
                if (row.message.opTagText) {
                    row.message.tagText = (
                        row.message.tagText 
                            ? row.message.tagText + " • " 
                            : ""
                        + row.message.opTagText)
                }

                //console.log(row)
                row.message.roleIcon = { 
                    source: row.message.avatarURL,
                    name: 'staff',
                    size: 18,
                    alt: 'Role icon, staff'
                }
                
                //row.renderContentOnly = true
                //row.message.renderContentOnly = true
                const avatarUrl = row.message.avatarURL
                row.message.avatarURL = null
                row.message.avatarDecorationURL = null

                
                //row.message.constrainedWidth = 600
                
                /*row.message.content = [ { content: 
                    [ 
                        { id: '0',
                        alt: 'barcelona',
                        src: (row.message.avatarURL+"").replace(".webp?size=480",".png"),
                        frozenSrc: (row.message.avatarURL+"").replace(".webp?size=480",".png"),
                        type: 'customEmoji',
                        jumboable: false },

                      { content: [ { type: 'text', content: row.message.username } ],
                        target: 'usernameOnClick',
                        context: 
                         { username: 1,
                           usernameOnClick: 
                            { action: 'bindUserMenu',
                              userId: '307215253811363843',
                              linkColor: -1499549,
                              messageChannelId: '1098657786935640107' },
                           medium: true },
                        type: 'link' },
                      ],
                   type: 'paragraph' } ]*/

            }
    
            /**
             * Finally, re-stringify the row.
             */
            args[1] = JSON.stringify(rows);
        }));


        console.log(findByName("ScrollView"))
        },
    onUnload: () => {
        unpatches.forEach(u => u());

    },
}