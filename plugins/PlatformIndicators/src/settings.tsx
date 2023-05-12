import { React, ReactNative } from "@vendetta/metro/common";
import { storage } from "@vendetta/plugin";
import { useProxy } from "@vendetta/storage";
import { Forms } from "@vendetta/ui/components";

const {View} = ReactNative;

export default function Settings() {
    useProxy(storage);

    return (
        <View>
            <Forms.FormSwitchRow
                label="DM Top Bar"
                subLabel="Show icons on the dm top bar"
                value={storage.dmTopBar ?? true}
                onValueChange={v => storage.dmTopBar = v}
                note=""
            />
            <Forms.FormSwitchRow
                label="Users/DMs list"
                subLabel="Show icons on the users and DMs list"
                value={storage.userList ?? true}
                onValueChange={v => storage.userList = v}
                note=""
            />
            <Forms.FormSwitchRow
                label="Profile name"
                subLabel="Show icons on user profiles"
                value={storage.profileUsername ?? true}
                onValueChange={v => storage.profileUsername = v}
                note=""
            />
            <Forms.FormSwitchRow
                label="Disable mobile icon"
                subLabel="Hide mobile status from the normal indicator"
                value={storage.removeDefaultMobile ?? true}
                onValueChange={v => storage.removeDefaultMobile = v}
                note=""
            />
        </View>
        
    );
}