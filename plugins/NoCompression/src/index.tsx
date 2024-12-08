import { before, after } from "@vendetta/patcher";
import { findByProps } from "@vendetta/metro";
const Dialog = findByProps("show", "confirm", "close");
import { React, ReactNative } from "@vendetta/metro/common";

let unpatches = [];
export default {
    onLoad: () => {

        const { NativeModules } = ReactNative;

        //> after("getUploadTarget",findByProps("UploadTargets"), (args,res)=>{console.log("ut",args,res)})

        //fix for >215
        /*unpatches.push(after("getUploadTarget",findByProps("UploadTargets"), function(args,res){
            //console.log("ut",args,res,this)
            //window.ut = res
            //return;
            //res.shouldReactNativeCompressUploads = false

            /*Object.defineProperty(res, "shouldReactNativeCompressUploads", {
                get: function(){
                    return false;
                }
            })*//*
        }))*/

        
        const CloudUpload = findByProps('CloudUpload').CloudUpload;
        /*unpatches.push(before('reactNativeCompressAndExtractData', CloudUpload.prototype, function(args) {

            console.log(args)
            console.log(this)
            /*return;

            //disable compression here
            this.reactNativeFilePrepped = true;
            this.currentSize = this.preCompressionSize;

            //add extension to files that don't have one
            if(this.mimeType == 'image/png' && !this.filename.endsWith(".png")){
                this.filename = this.filename + '.png'
            }
            if(this.mimeType == 'image/jpg' && (!this.filename.endsWith(".jpg") || !this.filename.endsWith(".jpeg"))){
                this.filename = this.filename + '.jpg'
            }*//*

        }));*/

        unpatches.push(after('reactNativeCompressAndExtractData', CloudUpload.prototype, function(args, res) {
            console.log("compressafter", this, args,res)


            /*res = res.then((a) => {
                console.log("PROM", a)
                return a
            })*/

            let media = this

            /*res = res.then((a) => {
                a.reactNativeFilePrepped = true;
                a.currentSize = a.preCompressionSize;

                //add extension to files that don't have one
                if(a.mimeType == 'image/png' && !a.filename.endsWith(".png")){
                    a.filename = a.filename + '.png'
                }
                if(a.mimeType == 'image/jpg' && (!a.filename.endsWith(".jpg") || !a.filename.endsWith(".jpeg"))){
                    a.filename = a.filename + '.jpg'
                }


                return a;
            })*/

            res = new Promise((resolve) => {
                media.reactNativeFilePrepped = true;
                //media.currentSize = media.preCompressionSize;
                media.postCompressionSize = 1000
                media.preCompressionSize = 1000;
                media.currentSize = 1000;


                //add extension to files that don't have one
                if(media.mimeType == 'image/png' && !media.filename.endsWith(".png")){
                    media.filename = media.filename + '.png'
                }
                if(media.mimeType == 'image/jpg' && (!media.filename.endsWith(".jpg") || !media.filename.endsWith(".jpeg"))){
                    media.filename = media.filename + '.jpg'
                }
    
                

                /*const FileManager = NativeModules.NativeFileModule ?? NativeModules.RTNFileManager ?? NativeModules.DCDFileManager
                if(media?.item?.originalUri){
                    FileManager.getSize(media?.item?.originalUri).then(size => {
                        media.postCompressionSize = size
                        media.preCompressionSize = size;
                        media.currentSize = size;
    
                        console.log("PROM", media)
                        resolve(media);
    
                    }).catch(()=>{
                        console.log("PROM2", media)
                        resolve(media);
                    })
                } else {
                    console.log("PROM3", media)
                    resolve(media);
                }*/

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