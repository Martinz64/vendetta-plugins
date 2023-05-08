//import React, { useState, useEffect } from "react";
import { React, ReactNative } from "@vendetta/metro/common";
import { formatBytes } from "./utils";
import { General } from "@vendetta/ui/components";

const { Text } = General;

export function SizeTag(props) {
    const [size, setSize] = React.useState("");
    const [loading, setLoading] = React.useState(true);
    const { url } = props;

    const { NativeModules } = ReactNative;

    React.useEffect(() => {
        async function fetchData() {

            const FileManager = NativeModules.DCDFileManager ?? NativeModules.RTNFileManager

            FileManager.getSize(url).then(size => {
                setSize(formatBytes(size));
                setLoading(false);
            })
        }
        fetchData();
    }, []);

    if (loading) {
        return <Text style={props.style}>...</Text>;
    }

    return <Text style={props.style}>{size}</Text>;
}