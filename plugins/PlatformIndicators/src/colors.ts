import { findByProps } from "@vendetta/metro";
import { ReactNative, chroma } from "@vendetta/metro/common";
import { rawColors } from "@vendetta/ui";


const Colors = {
    online: chroma(rawColors.GREEN_360).hex(),
    dnd: chroma(rawColors.RED_400).hex(),
    idle: chroma(rawColors.YELLOW_300).hex(),
    offline: chroma(rawColors.PRIMARY_400).hex(),
    
};

//const ColorMap = findByProps("STATUS_YELLOW","TWITCH","STATUS_GREY");


export function convertHexColorToInt(color: string){
    return parseInt(color.replace("#","0x"))
}

export function getStatusColor(status: string) {
    //const colorName = Colors[status];
    //const colorCode = ColorMap[colorName];
    //return colorCode
    return Colors[status]
}