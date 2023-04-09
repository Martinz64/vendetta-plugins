import { patcher } from "@vendetta";
import { findByProps } from "@vendetta/metro";
import { i18n } from "@vendetta/metro/common";

let unpatchUploader;
let unpatchEmbeds;

export default {
    onLoad: () => {
        const CloudUploaderBase = findByProps("stageAttachmentFiles");
        unpatchUploader = patcher.before("stageAttachmentFiles", CloudUploaderBase, (args) => {
            let files = args[0];
            for (let i = 0; i < files.length; i++) {
                files[i].item.uri = files[i].item.originalUri;
            }
        });

        const EmbedManager = findByProps("createUploadProgressEmbed")
        unpatchEmbeds = patcher.before("createUploadProgressEmbed",EmbedManager,(args)=>{
            let embeds = args[0];
            //console.log("createUploadProgressEmbed",args)
            embeds.forEach(embed => {
                if(embed.name == i18n.Messages["ATTACHMENT_COMPRESSING"]){
                    embed.name = i18n.Messages["ATTACHMENT_PROCESSING_SERVER"];
                }
            });
        });
    },
    onUnload: () => {
        unpatchUploader();
        unpatchEmbeds();
    },
}