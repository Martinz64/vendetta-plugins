import { findByName } from '@vendetta/metro';
import { ReactNative } from '@vendetta/metro/common';
import { getAssetIDByName } from '@vendetta/ui/assets';

const {View,Text,Image,Pressable} = ReactNative;

const Svg = findByName("Svg",false).default;
const Path = findByName("Svg",false).Path;

const IconPaths = {
    desktop: "M4 2.5c-1.103 0-2 .897-2 2v11c0 1.104.897 2 2 2h7v2H7v2h10v-2h-4v-2h7c1.103 0 2-.896 2-2v-11c0-1.103-.897-2-2-2H4Zm16 2v9H4v-9h16Z",
    web: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93Zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39Z",
    mobile: "M15.5 1h-8A2.5 2.5 0 0 0 5 3.5v17A2.5 2.5 0 0 0 7.5 23h8a2.5 2.5 0 0 0 2.5-2.5v-17A2.5 2.5 0 0 0 15.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z",
    embedded: "M5.79335761,5 L18.2066424,5 C19.7805584,5 21.0868816,6.21634264 21.1990185,7.78625885 L21.8575059,17.0050826 C21.9307825,18.0309548 21.1585512,18.9219909 20.132679,18.9952675 C20.088523,18.9984215 20.0442685,19 20,19 C18.8245863,19 17.8000084,18.2000338 17.5149287,17.059715 L17,15 L7,15 L6.48507125,17.059715 C6.19999155,18.2000338 5.1754137,19 4,19 C2.97151413,19 2.13776159,18.1662475 2.13776159,17.1377616 C2.13776159,17.0934931 2.1393401,17.0492386 2.1424941,17.0050826 L2.80098151,7.78625885 C2.91311838,6.21634264 4.21944161,5 5.79335761,5 Z M14.5,10 C15.3284271,10 16,9.32842712 16,8.5 C16,7.67157288 15.3284271,7 14.5,7 C13.6715729,7 13,7.67157288 13,8.5 C13,9.32842712 13.6715729,10 14.5,10 Z M18.5,13 C19.3284271,13 20,12.3284271 20,11.5 C20,10.6715729 19.3284271,10 18.5,10 C17.6715729,10 17,10.6715729 17,11.5 C17,12.3284271 17.6715729,13 18.5,13 Z M6,9 L4,9 L4,11 L6,11 L6,13 L8,13 L8,11 L10,11 L10,9 L8,9 L8,7 L6,7 L6,9 ZM5.79335761,5 L18.2066424,5 C19.7805584,5 21.0868816,6.21634264 21.1990185,7.78625885 L21.8575059,17.0050826 C21.9307825,18.0309548 21.1585512,18.9219909 20.132679,18.9952675 C20.088523,18.9984215 20.0442685,19 20,19 C18.8245863,19 17.8000084,18.2000338 17.5149287,17.059715 L17,15 L7,15 L6.48507125,17.059715 C6.19999155,18.2000338 5.1754137,19 4,19 C2.97151413,19 2.13776159,18.1662475 2.13776159,17.1377616 C2.13776159,17.0934931 2.1393401,17.0492386 2.1424941,17.0050826 L2.80098151,7.78625885 C2.91311838,6.21634264 4.21944161,5 5.79335761,5 Z M14.5,10 C15.3284271,10 16,9.32842712 16,8.5 C16,7.67157288 15.3284271,7 14.5,7 C13.6715729,7 13,7.67157288 13,8.5 C13,9.32842712 13.6715729,10 14.5,10 Z M18.5,13 C19.3284271,13 20,12.3284271 20,11.5 C20,10.6715729 19.3284271,10 18.5,10 C17.6715729,10 17,10.6715729 17,11.5 C17,12.3284271 17.6715729,13 18.5,13 Z M6,9 L4,9 L4,11 L6,11 L6,13 L8,13 L8,11 L10,11 L10,9 L8,9 L8,7 L6,7 L6,9 Z",
    vr: "M15.55 5a5.5 5.5 0 0 1 5.15 3.67h.3a2 2 0 0 1 2 2v3.18a2 2 0 0 1-2 1.99h-.2A4.54 4.54 0 0 1 16.55 19a4.45 4.45 0 0 1-3.6-1.83 1.2 1.2 0 0 0-1.9 0 4.44 4.44 0 0 1-3.9 1.82 4.54 4.54 0 0 1-3.94-3.15H3a2 2 0 0 1-2-2v-3.18c0-1.1.9-1.99 2-1.99h.3A5.5 5.5 0 0 1 8.46 5h7.09Zm-7.1 2C6.6 7 5.06 8.5 4.97 10.41l-.02.66v3.18c0 1.43 1.05 2.66 2.34 2.74.85.06 1.63-.32 2.14-1.01a3.2 3.2 0 0 1 2.57-1.3c1 0 1.97.48 2.57 1.3.5.69 1.3 1.08 2.14 1.01 1.3-.08 2.34-1.31 2.34-2.74l-.02-3.84a3.54 3.54 0 0 0-3.49-3.43H8.45Z", 
};

const IconIDs = {
    desktop: getAssetIDByName("ic_monitor_24px"),
    web: getAssetIDByName("ic_globe_24px"),
    //mobile: getAssetIDByName("ic_mobile_status"),
    mobile: getAssetIDByName("ic_mobile_device"),
    embedded: getAssetIDByName("ic_monitor_24px"), //provisional
    vr: getAssetIDByName("ic_vr_headset_24px"), // not provisional
};

const themableIcons = {
    desktop: {
        url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAAVFBMVEUAAACvv7+3u7+5u7+2ub+4u726vL65u765vL65vMG5u723ub23v7+3t7+6vL+4ur+6u765u764vL+4ur23t7+7vb+3ur25ur64ur+7u766ur6vr7/+1nXbAAAAHHRSTlMAEEB/UHDv/99fgIAgQJ+f7++fnyB/YN9vTz8QSaZf3QAAAI1JREFUeAHt1tUBwkAURNEXHZzg1n+d2Fc8u4OTOQXcyKqJ3ARh5C22qiQFYTC0khFIYyuYgDYthGagzQuhDLRFIYS7yBPuakLmSaF2CimkkEIKKfT8I5un0MdCT7v6LUFbFUIhaGsr2IAUWcl2B0K2t6pDVKttGR5P3BJvpxCnfdTMHVo9NaRQ1MpKRC5jHSw3VFQzIwAAAABJRU5ErkJggg==",
        path: "PlatformIndicators/Desktop.png"
    },

    web: {
        url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAQAAAD/5HvMAAADgklEQVR42u3a32vVdRzH8VdOv2NzGzM7bkp0E9F9RQSbOmK6groQpeugOzXJfnCW3YwgC4IyHCldrBmFELtQRxfK2MHp1sjVZRfBMSJFYu6cMUnOOZPz9Gb45uyc79fv5/tDvDiPv+DJh/fn8+HL56umpqbHFZsZ4hjjzJOnQJkyBfLMM87H7GWzHh16OcoVKgQpM8N79Cht7GaSVcJa5QK7lBZe5SpRzDCgpLGdH6gS3SRPKzm8xTJxFTmgJNDKtyRllFbFQxfTRLVCvSk6FR3b+J3onuRTlllvgUzk1YmVsyJJdPMN1bqkzmizM00cc1rDIP9SawpPrjhFPAf1AN1cotZJ940ezwKb1q33BLX2Kzx2sBwzZ7vWoYXvAVOkV2FxlqjuMMtBNqkBNpIDzI/h7ywnTsfIP5gquxUGV3EiB7zMPcxlPRwDOJITTgNmpx6GyZSDnqKAOa9g9LKKIzniA0yFbQrC+5B6UDf/Y44oCFdwdUPOGMfkgr8kyrg6Lmf0YUq0yw9DuLnBcTw5YwNFzB754RhmkYaUCH7BDMsPZzDDZFMM+gQzJj/8inlTYiS1oNcws/LD35jnJUtKPOgFzHX5YQmzdmCRTSXoGcyi/FDGtEqWlHhQG6YULsjTA4zg5iZf4CkAXrig25gtUowk+FwB2IpZDDfUz8pEWiUF4DnM9XDbfkiKl6QAvB5u248H38KMJBZ0FDMW7uo4qwbIJhQ0gcnKD3sxN3lCirNKgZfrf5hB+aGdEuYVNUQ2dtAuTIk2+WMG87V8MBIzaBQzrdDDVqBDPuIE0cUy5rCC0MMq5lAqQR9hKmRcPoNu0ZF0EN0sYs7JBAyc+UwNsUJYd7nGO2zUGr4CTL9MqMGu8KIaYB43C2yVJPq4h8kpDAaoYv6kS3U4jKvfaGELeUyVfoXDT4C5wAatg8cfuHqbS4A54/K8UgTMd/WnNjuckyqAKdCj8DhArdO0NFilQ8xxhyiq7JMbRqk1GXAEuDshV3hMUesvXkoo6CKe3NHJArUqfEln7KBrdCgaMnVJcIsPa6OcczKKjk6mqFfkFH20RAi6SIfiweMkjS0xwTBvEFaVE3hKAvspEleBfUoOvTGfOH+mJ40X6ctEkaNfaWEn56kQVoVz9CltZDhCjhJBSuR4l4weHdrZwzBjzJFniTJlbpNnljGyDNLW/BmlqelxdR++AoGbDB4jjAAAAABJRU5ErkJggg==",
        path: "PlatformIndicators/Web.png"
    },

    mobile: {
        url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAAXVBMVEUAAAAwMDgwMDUwMDUuMDYwMDYvMTcvMTYvMTYwMDYwMDUvMTYwMjUvMTUvMjYvMTUuMDUuMDQvMDUtMTUwMDgvMDUwMDAtMDYuMDYwMDAtMDUvMDYuMDUtMDcpMTo5aAq8AAAAH3RSTlMAIGBvf1C//89fMN9g75+/j3+fP0C/IFBfMGDPb08fcZ9WCgAAAMNJREFUeAHt2YWNxQAMg2EX/fiVud1/zBuhSaRjfwv8UsQx5J9L0iw/VySIyUoaXa7wu93pcE/g9KDTFS4F+amF5Em3ZwK7FwPeMEsYcoNVxZAaViX5uTd6MuQJKwY5A01u9goFWph1fyKggAIKKKCAAgoooIACCiiggAIKKKCAAgoooIACn/l9d/t3gU/fcEqG9LDKGVLB6saQAZ97owZ2w5NuzwEOKd1G4FMLE5wG36Y/w29ZadRviBn2/Nw2HfjTPgD3/UVA1TCAGgAAAABJRU5ErkJggg==",
        path: "PlatformIndicators/Mobile.png"
    },

    embedded: {
        url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAAk1BMVEUAAAC3u7+4ur+5vL+5u765u7+6vL+2ub+3v7+6u7+5vL66v7+6vL65u761ur+4u765vL+3t7+6u765u7+9vb23t7+7vb+6u766ur+5ur6/v7+vv7+9vcW1tb+5u727u763ur25vL+6vL+3ub24ur+5u7+4vL+5ur66ur64ur25vL+6u764ur24u722uby5u76vr7/eehxsAAAAMXRSTlMAQJ/f/8+fUCC/3zDv7zC/UEDvfx8gf88w3xAQHzCAT2Bfb4Bvj5/PP6+vv59wUM8QEONx+AAAAWZJREFUeAHt1dWa6zAMBOA5PSqzs2Vmhvd/uWWcVFHqr5f+r+3JRqtJ8UhBEAT/Mv8lpWwuD02hKHcpFXBTuSJ3qtZwQ0HPUVULiCuJhzpiGuKlCZaTL3gnxEVPaLWdkAxYJznIdfGmy0k9MEkOivChLQSkbwS18KElZEBBLSMIX4QMuRxaEJ0vCBndCkJMbEZjIRO6MTWCqjWlRjO6MTeCpLoooDWuCFvSjcgK0pYzohsrM0hZzhXdWJtBynJyR4rGv19dzrp3EC3nhoJKZpCynNxalzqIlrPKU7WDlOXUym8H0XIOufy+htxZX9tHBU24/L5mXH5fSy6/r4jL/8sOidYJv2x7fu0k84SgIn/Qmb50dT2oB6YXk+tf4hElWuuPdeaIlCFx/fkLeM+Q1Ferw3RQZ9SmP8jQlR9H/NZ3tKmG08+sW/SMnrxzZ6Qy/TrfBWkdL+Lq0RUptaYHJyU+HwRB4O0FjTMnvIkvoBQAAAAASUVORK5CYII=",
        path: "PlatformIndicators/Console.png"
    },

    vr: {
        url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAANlBMVEVMaXHv7/Hv7/Hv7/Hv7/Hv7/Hv7/Hv7/Hv7/Hs7PTu7vHv7/Hv7/Hv7/Hv7/Hv7/Hv7/Hv7/EEUZf/AAAAEXRSTlMAzGV4UNr78OcJFDufKb6ri3Gd0SEAAAHQSURBVFjD7VbHdsQgDDRNiOby/z+bjY0N2LRk95C8xxwNHo0KkqZpYGBg4PMwbBa4ZYFiZqaPRVGxNSCoavPwJs0ujLbk2K0TtipKz1s3Zl3RE/PILGKmsqbLL8JcwZ5y9LJmi3E+k8Ib1UH8xcI95Utnaeb2TAnmbzLP01NsnilfBEcBCW9FVXWpwzvxrGYiE785ASC1p2DO3M5xlWty5ZREyrEmKlQK0Tedweu1npUdNPxDVBrlHe5bIHQQue1m/YVIEKjIGKmGG7ZbPKYpqnsMnsGqqxUQNSzpP8WdJoSaNUop7nwFInZF600ijT0F3kE06dXS6RNEXfh7ROI/EMG7RPAM2++I8D48wqefZe0cJy74Bo+HaixBJPbRLXX0k5ueDenWgtzVYojLz670edNL55y2wSgPQPOtFhPbirPlKYlDPOyBPwUtjD8auzr6GwYXDKRrA4RAucMFmR0PvuXjeZ3K+wIiT++MD8Wa32n8KSxc67ArSOYcOzln6rTmi5eKhWbMIbMGyV2gkZkjKE4ZVr6cM1Lp6qxslN6ZoDodeLoVi6igTbqlYmOJ0muIBrIku4oFK7Ix9I7atAQ2SWym1F5HEjB3NDAwMPAuvgCPRUw2yKsaYwAAAABJRU5ErkJggg==",
        path: "PlatformIndicators/VR.png"
    }


}



export default function StatusIcon(props) {
    const { platform, color } = props;

    const iconSize = props.iconSize ?? 16;

    //useProxy(storage)

    // should fix crashing if discord comes up with anything new
    // TODO: Add ? icon in the else
    if(themableIcons[platform]){

        return (
            <View>
                <Image
                    style={{
                        height: iconSize,
                        width: iconSize,
                        tintColor: color
                    }}
                    source={{
                        uri: themableIcons[platform].url,
                        width: iconSize,
                        height: iconSize,
                        path: themableIcons[platform].path,
                        allowIconTheming: true
                    }}
                />
            </View>
        )
    } else {

        return (
            <View>
                
            </View>
        )
    }
}
