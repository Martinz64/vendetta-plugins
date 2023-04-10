import { before } from "@vendetta/patcher";
import { findByProps } from "@vendetta/metro";

let unpatchUploader;
let unpatchCompressor;

export default {
    onLoad: () => {
        const CloudUploaderBase = findByProps("stageAttachmentFiles");
        unpatchUploader = before("stageAttachmentFiles", CloudUploaderBase, (args) => {
            let files = args[0];
            for (let i = 0; i < files.length; i++) {
                files[i].item.uri = files[i].item.originalUri;
            }
        });

        const CloudUpload = findByProps('CloudUpload').CloudUpload;
        unpatchCompressor = before('reactNativeCompressAndExtractData', CloudUpload.prototype, function() {
            this.reactNativeFilePrepped = true;
            this.currentSize = this.preCompressionSize;
        });
    },
    onUnload: () => {
        unpatchUploader();
        unpatchCompressor();
    },
}