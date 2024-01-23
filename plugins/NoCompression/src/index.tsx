import { before, after } from "@vendetta/patcher";
import { findByProps } from "@vendetta/metro";
const Dialog = findByProps("show", "confirm", "close");

let unpatches = [];
export default {
    onLoad: () => {

        //> after("getUploadTarget",findByProps("UploadTargets"), (args,res)=>{console.log("ut",args,res)})

        //fix for >215
        unpatches.push(after("getUploadTarget",findByProps("UploadTargets"), function(args,res){
            //console.log("ut",args,res,this)
            //res.shouldReactNativeCompressUploads = false

            Object.defineProperty(res, "shouldReactNativeCompressUploads", {
                get: function(){
                    return false;
                }
            })
        }))

        
        const CloudUpload = findByProps('CloudUpload').CloudUpload;
        unpatches.push(before('reactNativeCompressAndExtractData', CloudUpload.prototype, function(args) {
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

        }));
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