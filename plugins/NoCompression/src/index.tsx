import { before, instead } from "@vendetta/patcher";
import { findByProps } from "@vendetta/metro";
const Dialog = findByProps("show", "confirm", "close");

const ChannelStore = findByProps("getChannel", "getDMFromUserId");
const GuildStore = findByProps("getGuild");
const { BoostedGuildFeatures } = findByProps("BoostedGuildFeatures");
const { getUserMaxFileSize } = findByProps("getUserMaxFileSize");

import { formatBytes } from "./utils";
import { storage } from "@vendetta/plugin";
import Settings from "./settings";



let unpatchCompressor;

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

function askUserToCompressFile(maxAllowedSize, fileSize){
    return new Promise((resolve) => {
        Dialog.show({
            title: `Compress before upload?`,
            body: `The size of the file you are trying to upload exceeds the maximum allowed size of ${formatBytes(maxAllowedSize)}. Do you want this file to be compressed?\nThis choice only applies to this file.`,
            confirmText: "Yes",
            cancelText: "No",
            confirmColor: "brand",
            onConfirm: () => {
                resolve(true)
            },
            onCancel: () => {
                resolve(false)
            }
        });
    })
}

export default {
    onLoad: () => {

        storage.compressBig ??= false;

        const CloudUpload = findByProps('CloudUpload').CloudUpload;
        unpatchCompressor = before('reactNativeCompressAndExtractData', CloudUpload.prototype, function(args) {

            let compressionDisabled = true
            window.rc = this
            window.rc2 = args
            
            
            const maxSize = getMaxAllowedFileSize(this.channelId);
            console.log("MAX", maxSize)
            console.log("FILE", this.preCompressionSize)

            if(this.preCompressionSize > maxSize){
                if(storage.compressBig){
                    compressionDisabled = false;
                }
            }

            console.log("CU_COMP2", this, args)

            
            if(compressionDisabled){
                console.log("WILL NOT COMPRESS")

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
                console.log("WILL COMPRESS")
            }
            //orig.apply(this);
        });
        //instead("CloudUpload", CloudUploadUtils, function(args,orig){
        before('handleError', CloudUpload.prototype, function(args) {
            
            console.log("CloudUpload2Error", args)
            window.cu = args
            window.cu2 = this

        })

        /*instead('upload', CloudUploadUtils.CloudUpload.prototype, function(args, orig) {

            console.log("CloudUpload2", args)
            window.cu = args
            window.cu2 = this

            orig.apply(this,args)
        })*/
    },
    onUnload: () => {
        unpatchCompressor();
    },
    settings:()=>{
        return <Settings/>
    }
    
}