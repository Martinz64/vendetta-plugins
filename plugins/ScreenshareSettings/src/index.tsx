import patcher from "@vendetta/patcher";
import { findByName, findByProps } from "@vendetta/metro";
import { storage } from "@vendetta/plugin";
import Settings from "./settings";

let unpatches = [];

export default {
    onLoad: () => {
        storage.resolution ??= "default";
        storage.framerate ??= "default";

        patcher.before("setVideoEnabled",findByProps("setVideoEnabled"),(args)=>{
            console.log("setVideoEnabled",args)
            args[0] = false
        })
        patcher.before("setExperimentalEncoders",findByProps("setExperimentalEncoders"),(args)=>{
            console.log("setExperimentalEncoders",args)
            //args[0] = false
        })

        patcher.before("setGoLiveSource",findByProps("setGoLiveSource"),(args)=>{
            //args[0].frameRate = 60
            //args[0].resolution = 480
            const params = args[0]
            if(params){
                if(!params.aaa){
                    /*params.qualityOptions.preset = 1
                    params.qualityOptions.resolution = 1080
                    params.qualityOptions.frameRate = 60*/
                    if(storage.resolution != 'default'){
                        params.qualityOptions.resolution = storage.resolution
                    }
                    if(storage.framerate != 'default'){
                        params.qualityOptions.frameRate = storage.framerate
                    }
                }
                
            }
            console.log("setGoLiveSource",args)

        })

        patcher.after("getMediaEngine",findByProps("getMediaEngine"),(args,res)=>{
            //args[0].frameRate = 60
            //args[0].resolution = 480
            
            console.log("getMediaEngine",args)

            /*patcher.after("getCodecSurvey",res,(args,res) => {
                res.then(codecs => {
                    console.log("codecs",codecs)
                })
                console.log("getCodecSurvey",args,res)


                res = new Promise(resolve => {
                    resolve('{"available_video_encoders":["video\\/avc OMX.google.h264.encoder (SW)"],"available_video_decoders":["video\\/avc OMX.google.h264.decoder (SW)"]}')
                })
                return res
            })*/

        })


        /*const Connection = findByName("Connection");

        patcher.before("create",Connection, args => {
            console.log("Connection.create",args)
        })

        patcher.after("create",Connection, (args,res) => {
            console.log("Connection.create",res)
            window.con = res
        })

        patcher.before("setCodecs",Connection.prototype, args => {
            console.log("Connection.setCodecs",args)
            //if(args[2] == "stream"){
            //    args[1] = "H264"
            //}
        })

        patcher.before("setDesktopEncodingOptions",Connection.prototype, args => {
            console.log("Connection.setDesktopEncodingOptions",args)
            
        })

        const VideoCodecUtils = findByProps("getExperimentCodecs")
        patcher.after("filterVideoCodecs",VideoCodecUtils, (args,res) => {
            console.log("filterVideoCodecs",args,res)
            //res = [ [ 'H264', [ true, true ] ], [ 'VP8', [ true, true ] ], [ 'VP9', [ true, true ] ] ]
            //res.push([ 'H264', [ true, true ] ])
        })
        patcher.after("codecNameToPayloadName",VideoCodecUtils, (args,res) => {
            console.log("codecNameToPayloadName",args,res)
        })

        patcher.after("getExperimentCodecs",VideoCodecUtils, (args,res) => {
            console.log("getExperimentCodecs",args,res)
        })*/


        //getCodecSurvey
    },
    onUnload: () => {
        unpatches.forEach(u => u());
    },
    settings:()=>{
        return <Settings/>
    }
}