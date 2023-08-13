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
                    label="Show icons on the dm top bar"
                    value={storage.dmTopBar ?? true}
                    onValueChange={v => storage.dmTopBar = v}
                    note=""
                />
                <Forms.FormSwitchRow
                    label="Show icons on the users and DMs list"
                    value={storage.userList ?? true}
                    onValueChange={v => storage.userList = v}
                    note=""
                />
                <Forms.FormSwitchRow
                    label="Show icons on user profiles"
                    value={storage.profileUsername ?? true}
                    onValueChange={v => storage.profileUsername = v}
                    note=""
                />
                <Forms.FormSwitchRow
                    label="Hide mobile status from the normal indicator"
                    value={storage.removeDefaultMobile ?? true}
                    onValueChange={v => storage.removeDefaultMobile = v}
                    note=""
                />
                <Forms.FormSwitchRow
                    label="Theme compatibility mode"
                    value={storage.fallbackColors ?? false}
                    onValueChange={v => storage.fallbackColors = v}
                    note=""
                />
                <Forms.FormSwitchRow
                    label="Old user list icon style"
                    value={storage.oldUserListIcons ?? false}
                    onValueChange={v => storage.oldUserListIcons = v}
                    note=""
                />
            </View>
        </ScrollView>
    );
}