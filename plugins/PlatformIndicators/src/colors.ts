import { findByProps, findByStoreName } from "@vendetta/metro";
import { ReactNative, chroma } from "@vendetta/metro/common";
import { rawColors, semanticColors } from "@vendetta/ui";

/*const { colors, meta } = findByProps("colors", "meta");
const ThemeStore = findByStoreName("ThemeStore");

const color = meta.resolveSemanticColor(ThemeStore.theme, colors.STATUS_ONLINE)*/

const Colors = {
    online: chroma(rawColors.GREEN_360).hex(),
    dnd: chroma(semanticColors.STATUS_DND).hex(),
    idle: chroma(rawColors.YELLOW_300).hex(),
    offline: chroma(rawColors.PRIMARY_400).hex(),  
};

const FallbackColors = { 
    online: '#23a55a',
    dnd: '#f23f43',
    idle: '#f0b232',
    offline: '#80848e'
}

export function convertHexColorToInt(color: string){
    return parseInt(color.replace("#","0x"))
}

export function getStatusColor(status: string, useFallback: boolean = false) {
    if(useFallback){
        return FallbackColors[status]
    }
    return Colors[status]
}
