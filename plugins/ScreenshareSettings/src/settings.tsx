import { React, ReactNative } from "@vendetta/metro/common";
import { storage } from "@vendetta/plugin";
import { useProxy } from "@vendetta/storage";
import { Forms } from "@vendetta/ui/components";
import { ReactNative as RN } from "@vendetta/metro/common";

const {View, ScrollView} = ReactNative;
const { FormSection, FormRadioRow } = Forms;

const Resolutions = {
    Default: 'default',
    '144p': 144,
    '240p': 240,
    '360p': 360,
    '480p': 480,
    '720p': 720,
    '1080p': 1080,
    '2160p': 2160
}

const FPS = {
    Default: 'default',
    '5fps': 5,
    '15fps': 15,
    '30fps': 30,
    '60fps': 60,
    '120fps': 120
}

export default function Settings() {
    useProxy(storage);

    return (
        <RN.ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 38 }}>
            <FormSection title="Resolution" titleStyleType="no_border">
                {Object.entries(Resolutions).map(([name, resolution]) => <FormRadioRow
                    label={name}
                    //subLabel={resolution}
                    selected={storage.resolution === resolution}
                    onPress={() => {
                        storage.resolution = resolution;
                    }}
                />)}
            </FormSection>
            <FormSection title="Frame rate" titleStyleType="no_border">
                {Object.entries(FPS).map(([name, fps]) => <FormRadioRow
                    label={name}
                    //subLabel={resolution}
                    selected={storage.framerate === fps}
                    onPress={() => {
                        storage.framerate = fps;
                    }}
                />)}
            </FormSection>
        </RN.ScrollView>
    );
}