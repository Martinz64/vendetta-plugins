import { before, instead } from "@vendetta/patcher";
import { findByProps } from "@vendetta/metro";
const Dialog = findByProps("show", "confirm", "close");

const ChannelStore = findByProps("getChannel", "getDMFromUserId");
const GuildStore = findByProps("getGuild");
const { BoostedGuildFeatures } = findByProps("BoostedGuildFeatures");
const { getUserMaxFileSize } = findByProps("getUserMaxFileSize");

import { storage } from "@vendetta/plugin";
import Settings from "./settings";
import { showToast } from "@vendetta/ui/toasts";
import { getAssetIDByName } from "@vendetta/ui/assets";


function getMaxAllowedFileSize(channelId){

    let guildMaxSizeLimit = 0;
    const guildId = ChannelStore.getChannel(channelId).guild_id;
    if(guildId){
        const guildBoostTier = GuildStore.getGuild(guildId).premiumTier;
        guildMaxSizeLimit = BoostedGuildFeatures[guildBoostTier].limits.fileSize;
    }
    const userMaxSizeLimit = getUserMaxFileSize();

    return userMaxSizeLimit > guildMaxSizeLimit ? userMaxSizeLimit : guildMaxSizeLimit;
}

let unpatches = [];
export default {
    onLoad: () => {
        storage.compressBig ??= false;

        const CloudUpload = findByProps('CloudUpload').CloudUpload;
        unpatches.push(before('reactNativeCompressAndExtractData', CloudUpload.prototype, function(args) {
            let compressionDisabled = true

            const maxSize = getMaxAllowedFileSize(this.channelId);
            if(this.preCompressionSize > maxSize){
                if(storage.compressBig){
                    compressionDisabled = false;
                    showToast("File is too big, compression will be allowed.", getAssetIDByName("ic_message_copy"));
                }
            }
            
            if(compressionDisabled){
                //console.log("WILL NOT COMPRESS")

                //disable compression here
                this.reactNativeFilePrepped = true;
                this.currentSize = this.preCompressionSize;

                
                //add extension to files that don't have one
                if(this.mimeType == 'image/png' && !this.filename.endsWith(".png")){
                    this.filename = this.filename + '.png'
                }
                if(this.mimeType == 'image/jpg' && (!this.filename.endsWith(".jpg") || !this.filename.endsWith(".jpeg"))){
                    this.filename = this.filename + '.jpg'
                }
            } else {
                

            }
        }));
        unpatches.push(before('handleError', CloudUpload.prototype, function(args) {
            if(args[0] == 40005){
                Dialog.show({
                    title: `File is too big to upload`,
                    body: `The size of the file you are trying to upload exceeds the maximum allowed size. You can allow compressing of big files in the plugin settings.`,
                    confirmText: "Accept",
                    confirmColor: "brand",
                })
            }
        }));
    },
    onUnload: () => {
        unpatches.forEach(u => u());
    },
    settings:()=>{
        return <Settings/>
    }
    
}