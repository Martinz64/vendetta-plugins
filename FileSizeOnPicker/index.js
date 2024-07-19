(function(o,h,R,i,c,B){"use strict";function u(t){let l=arguments.length>1&&arguments[1]!==void 0?arguments[1]:2;if(!+t)return"0 Bytes";const n=1024,e=l<0?0:l,r=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],a=Math.floor(Math.log(t)/Math.log(n));return`${parseFloat((t/Math.pow(n,a)).toFixed(e))} ${r[a]}`}const{Text:d}=c.General;let s={};function T(t){const[l,n]=i.React.useState(""),[e,r]=i.React.useState(!0),{url:a}=t,{NativeModules:p}=i.ReactNative;return i.React.useEffect(function(){async function z(){s[a]?(n(u(s[a])),r(!1)):(p.DCDFileManager??p.RTNFileManager).getSize(a).then(function(y){n(u(y)),r(!1),s[a]=y})}z()},[]),e?i.React.createElement(d,{style:t.style},"..."):i.React.createElement(d,{style:t.style},l)}const{View:f,Text:M}=c.General;let g;var v={onLoad:function(){const t=i.stylesheet.createThemedStyleSheet({sizeTagWrapper:{position:"relative"},sizeTag:{backgroundColor:"#1e1f2280",borderRadius:4,paddingHorizontal:8,paddingVertical:4,position:"absolute",top:6,left:6},sizeText:{includeFontPadding:!1,fontSize:12,color:"white",fontFamily:i.constants.Fonts.PRIMARY_BOLD}}),l=R.findByDisplayName("Pressable",!1);g=h.before("render",l.default.type,function(n){if(!n||!n[0])return;const[e]=n;if(!e||e.accessibilityRole!="imagebutton")return;if(e.oldChildren||(e.oldChildren=e.children),!e.skip)B.findInReactTree(e.oldChildren,function(a){return a.props?.localImageSource})||(e.skip=!0);else return;const r=e.oldChildren[0]?.props?.source?.uri;r&&(e.children=React.createElement(f,{style:t.sizeTagWrapper},e.oldChildren,React.createElement(f,{style:t.sizeTag},React.createElement(T,{url:r,style:t.sizeText}))))})},onUnload:function(){g()}};return o.default=v,Object.defineProperty(o,"__esModule",{value:!0}),o})({},vendetta.patcher,vendetta.metro,vendetta.metro.common,vendetta.ui.components,vendetta.utils);
