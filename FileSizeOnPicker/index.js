(function(o,h,R,i,u,B){"use strict";function d(t){let r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:2;if(!+t)return"0 Bytes";const n=1024,e=r<0?0:r,l=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],a=Math.floor(Math.log(t)/Math.log(n));return`${parseFloat((t/Math.pow(n,a)).toFixed(e))} ${l[a]}`}const{Text:f}=u.General;let s={};function T(t){const[r,n]=i.React.useState(""),[e,l]=i.React.useState(!0),{url:a}=t,{NativeModules:c}=i.ReactNative;return i.React.useEffect(function(){async function M(){s[a]?(n(d(s[a])),l(!1)):(c.NativeFileModule??c.RTNFileManager??c.DCDFileManager).getSize(a).then(function(y){n(d(y)),l(!1),s[a]=y})}M()},[]),e?i.React.createElement(f,{style:t.style},"..."):i.React.createElement(f,{style:t.style},r)}const{View:g,Text:z}=u.General;let p;var v={onLoad:function(){const t=i.stylesheet.createThemedStyleSheet({sizeTagWrapper:{position:"relative"},sizeTag:{backgroundColor:"#1e1f2280",borderRadius:4,paddingHorizontal:8,paddingVertical:4,position:"absolute",top:6,left:6},sizeText:{includeFontPadding:!1,fontSize:12,color:"white",fontFamily:i.constants.Fonts.PRIMARY_BOLD}}),r=R.findByDisplayName("Pressable",!1);p=h.before("render",r.default.type,function(n){if(!n||!n[0])return;const[e]=n;if(!e||e.accessibilityRole!="imagebutton")return;if(e.oldChildren||(e.oldChildren=e.children),!e.skip)B.findInReactTree(e.oldChildren,function(a){return a.props?.localImageSource})||(e.skip=!0);else return;const l=e.oldChildren[0]?.props?.source?.uri;l&&(e.children=React.createElement(g,{style:t.sizeTagWrapper},e.oldChildren,React.createElement(g,{style:t.sizeTag},React.createElement(T,{url:l,style:t.sizeText}))))})},onUnload:function(){p()}};return o.default=v,Object.defineProperty(o,"__esModule",{value:!0}),o})({},vendetta.patcher,vendetta.metro,vendetta.metro.common,vendetta.ui.components,vendetta.utils);
