import { before, after } from "@vendetta/patcher";
import { findByProps } from "@vendetta/metro";
const Dialog = findByProps("show", "confirm", "close");
import { React, ReactNative } from "@vendetta/metro/common";

let unpatches = [];
export default {
    onLoad: () => {
        const CloudUpload = findByProps('CloudUpload').CloudUpload;
        unpatches.push(after('reactNativeCompressAndExtractData', CloudUpload.prototype, function(args, res) {
            //console.log("compressafter", this, args,res)

            let media = this
            res = new Promise((resolve) => {
                media.reactNativeFilePrepped = true;
                if(media.preCompressionSize){
                    media.currentSize = media.preCompressionSize;
                    media.postCompressionSize = media.preCompressionSize;
                } else { // just in case
                    media.postCompressionSize = 1000
                    media.preCompressionSize = 1000;
                    media.currentSize = 1000;
                }
                //window.aaa = media;


                //add extension to files that don't have one (just in case)
                if(media.mimeType == 'image/png' && !media.filename.toLowerCase().endsWith(".png")){
                    media.filename = media.filename + '.png'
                }
                if(media.mimeType == 'image/jpg' && !(media.filename.toLowerCase().endsWith(".jpg") || media.filename.toLowerCase().endsWith(".jpeg"))){
                    media.filename = media.filename + '.jpg'
                }
                resolve(media);
            })

            return res


        }))
        unpatches.push(before('handleError', CloudUpload.prototype, function(args) {
            if(args[0] == 40005){
                Dialog.show({
                    title: `File is too big to upload`,
                    body: `The size of the file you are trying to upload exceeds the maximum allowed size.`,
                    confirmText: "Accept",
                    confirmColor: "brand",
                })
            }
        }));
    },
    onUnload: () => {
        unpatches.forEach(u => u());
    }
    
}