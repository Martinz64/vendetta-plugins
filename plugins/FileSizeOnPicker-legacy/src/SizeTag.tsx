//import React, { useState, useEffect } from "react";
import { React, ReactNative } from "@vendetta/metro/common";
import { formatBytes } from "./utils";
import { General } from "@vendetta/ui/components";

const { Text } = General;
let sizeCache = {};

export function SizeTag(props) {
    const [size, setSize] = React.useState("");
    const [loading, setLoading] = React.useState(true);
    const { url } = props;

    const { NativeModules } = ReactNative;

    React.useEffect(() => {
        async function fetchData() {
            if(!sizeCache[url]){
                const FileManager = NativeModules.NativeFileModule ?? NativeModules.RTNFileManager ?? NativeModules.DCDFileManager
                FileManager.getSize(url).then(size => {
                    setSize(formatBytes(size));
                    setLoading(false);
                    sizeCache[url] = size;
                })
            } else {
                setSize(formatBytes(sizeCache[url]));
                setLoading(false);
            }
            
        }
        fetchData();
    }, []);

    if (loading) {
        return <Text style={props.style}>...</Text>;
    }

    return <Text style={props.style}>{size}</Text>;
}