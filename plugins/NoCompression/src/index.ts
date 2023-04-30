import { before } from "@vendetta/patcher";
import { findByProps } from "@vendetta/metro";

let unpatchCompressor;

export default {
    onLoad: () => {

        const CloudUpload = findByProps('CloudUpload').CloudUpload;
        unpatchCompressor = before('reactNativeCompressAndExtractData', CloudUpload.prototype, function() {
            this.reactNativeFilePrepped = true;
            this.currentSize = this.preCompressionSize;

            //add extension to files that don't have one
            if(this.mimeType == 'image/png' && !this.filename.endsWith(".png")){
                this.filename = this.filename + '.png'
            }
            if(this.mimeType == 'image/jpg' && (!this.filename.endsWith(".jpg") || !this.filename.endsWith(".jpeg"))){
                this.filename = this.filename + '.jpg'
            }
        });
    },
    onUnload: () => {
        unpatchCompressor();
    },
}