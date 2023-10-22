import { React, ReactNative } from "@vendetta/metro/common";
import { storage } from "@vendetta/plugin";
import { useProxy } from "@vendetta/storage";
import { Forms } from "@vendetta/ui/components";

const {View, ScrollView} = ReactNative;

export default function Settings() {
    useProxy(storage);

    return (
        <ScrollView>
            <View>
                <Forms.FormSwitchRow
                    label="Compress files bigger than the limit"
                    value={storage.compressBig ?? true}
                    onValueChange={v => storage.compressBig = v}
                    note=""
                />
            </View>
        </ScrollView>
    );
}