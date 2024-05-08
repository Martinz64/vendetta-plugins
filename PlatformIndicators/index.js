(function(le,M,C,Y,y,r,v,$,n,oe,ee){"use strict";const{View:Ue,Text:Qe,Image:$e,Pressable:en}=v.ReactNative,Pe=C.findByName("Svg",!1).default,He=C.findByName("Svg",!1).Path,Ae={desktop:"M4 2.5c-1.103 0-2 .897-2 2v11c0 1.104.897 2 2 2h7v2H7v2h10v-2h-4v-2h7c1.103 0 2-.896 2-2v-11c0-1.103-.897-2-2-2H4Zm16 2v9H4v-9h16Z",web:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93Zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39Z",mobile:"M15.5 1h-8A2.5 2.5 0 0 0 5 3.5v17A2.5 2.5 0 0 0 7.5 23h8a2.5 2.5 0 0 0 2.5-2.5v-17A2.5 2.5 0 0 0 15.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z",embedded:"M5.79335761,5 L18.2066424,5 C19.7805584,5 21.0868816,6.21634264 21.1990185,7.78625885 L21.8575059,17.0050826 C21.9307825,18.0309548 21.1585512,18.9219909 20.132679,18.9952675 C20.088523,18.9984215 20.0442685,19 20,19 C18.8245863,19 17.8000084,18.2000338 17.5149287,17.059715 L17,15 L7,15 L6.48507125,17.059715 C6.19999155,18.2000338 5.1754137,19 4,19 C2.97151413,19 2.13776159,18.1662475 2.13776159,17.1377616 C2.13776159,17.0934931 2.1393401,17.0492386 2.1424941,17.0050826 L2.80098151,7.78625885 C2.91311838,6.21634264 4.21944161,5 5.79335761,5 Z M14.5,10 C15.3284271,10 16,9.32842712 16,8.5 C16,7.67157288 15.3284271,7 14.5,7 C13.6715729,7 13,7.67157288 13,8.5 C13,9.32842712 13.6715729,10 14.5,10 Z M18.5,13 C19.3284271,13 20,12.3284271 20,11.5 C20,10.6715729 19.3284271,10 18.5,10 C17.6715729,10 17,10.6715729 17,11.5 C17,12.3284271 17.6715729,13 18.5,13 Z M6,9 L4,9 L4,11 L6,11 L6,13 L8,13 L8,11 L10,11 L10,9 L8,9 L8,7 L6,7 L6,9 ZM5.79335761,5 L18.2066424,5 C19.7805584,5 21.0868816,6.21634264 21.1990185,7.78625885 L21.8575059,17.0050826 C21.9307825,18.0309548 21.1585512,18.9219909 20.132679,18.9952675 C20.088523,18.9984215 20.0442685,19 20,19 C18.8245863,19 17.8000084,18.2000338 17.5149287,17.059715 L17,15 L7,15 L6.48507125,17.059715 C6.19999155,18.2000338 5.1754137,19 4,19 C2.97151413,19 2.13776159,18.1662475 2.13776159,17.1377616 C2.13776159,17.0934931 2.1393401,17.0492386 2.1424941,17.0050826 L2.80098151,7.78625885 C2.91311838,6.21634264 4.21944161,5 5.79335761,5 Z M14.5,10 C15.3284271,10 16,9.32842712 16,8.5 C16,7.67157288 15.3284271,7 14.5,7 C13.6715729,7 13,7.67157288 13,8.5 C13,9.32842712 13.6715729,10 14.5,10 Z M18.5,13 C19.3284271,13 20,12.3284271 20,11.5 C20,10.6715729 19.3284271,10 18.5,10 C17.6715729,10 17,10.6715729 17,11.5 C17,12.3284271 17.6715729,13 18.5,13 Z M6,9 L4,9 L4,11 L6,11 L6,13 L8,13 L8,11 L10,11 L10,9 L8,9 L8,7 L6,7 L6,9 Z"};$.getAssetIDByName("ic_monitor_24px"),$.getAssetIDByName("ic_globe_24px"),$.getAssetIDByName("ic_mobile_status"),$.getAssetIDByName("ic_monitor_24px");function Fe(l){const{platform:D,color:I}=l;return oe.useProxy(n.storage),React.createElement(Ue,null,React.createElement(Pe,{height:"16",width:"16",viewBox:"0 0 24 24",fill:I},React.createElement(He,{d:Ae[D]})))}const Ze={online:v.chroma(ee.rawColors.GREEN_360).hex(),dnd:v.chroma(ee.rawColors.RED_400).hex(),idle:v.chroma(ee.rawColors.YELLOW_300).hex(),offline:v.chroma(ee.rawColors.PRIMARY_400).hex()},Oe={online:"#23a55a",dnd:"#f23f43",idle:"#f0b232",offline:"#80848e"};function Ge(l){return arguments.length>1&&arguments[1]!==void 0&&arguments[1]?Oe[l]:Ze[l]}const Ye=C.findByStoreName("PresenceStore"),je=C.findByStoreName("SessionsStore"),_e=C.findByStoreName("UserStore");let te,ne=0,ie,se;function qe(){return ie||(ie=setTimeout(function(){ne=0,ie=null},5e3)),(!te||ne==0)&&(te=Ye.getState()),ne=(ne+1)%20,te}function ze(l){let D;if(!se){var I;se=(I=_e.getCurrentUser())===null||I===void 0?void 0:I.id}if(l==se)D=Object.values(je.getSessions()).reduce(function(P,O){return O.clientInfo.client!=="unknown"&&(P[O.clientInfo.client]=O.status),P},{});else{var U;D=(U=qe())===null||U===void 0?void 0:U.clientStatuses[l]}return D}function N(l){oe.useProxy(n.storage);const D=l.userId,I=ze(D);return r.createElement(r.Fragment,null,Object.keys(I??{}).map(function(U){return r.createElement(Fe,{platform:U,color:Ge(I[U],n.storage.fallbackColors)})}))}const{View:Xe,ScrollView:We}=v.ReactNative;function Je(){return oe.useProxy(n.storage),v.React.createElement(We,null,v.React.createElement(Xe,null,v.React.createElement(Y.Forms.FormSwitchRow,{label:"Show icons on the dm top bar",value:n.storage.dmTopBar??!0,onValueChange:function(l){return n.storage.dmTopBar=l},note:""}),v.React.createElement(Y.Forms.FormSwitchRow,{label:"Show icons on the users and DMs list",value:n.storage.userList??!0,onValueChange:function(l){return n.storage.userList=l},note:""}),v.React.createElement(Y.Forms.FormSwitchRow,{label:"Show icons on user profiles",value:n.storage.profileUsername??!0,onValueChange:function(l){return n.storage.profileUsername=l},note:""}),v.React.createElement(Y.Forms.FormSwitchRow,{label:"Hide mobile status from the normal indicator",value:n.storage.removeDefaultMobile??!0,onValueChange:function(l){return n.storage.removeDefaultMobile=l},note:""}),v.React.createElement(Y.Forms.FormSwitchRow,{label:"Theme compatibility mode",value:n.storage.fallbackColors??!1,onValueChange:function(l){return n.storage.fallbackColors=l},note:""}),v.React.createElement(Y.Forms.FormSwitchRow,{label:"Old user list icon style",value:n.storage.oldUserListIcons??!1,onValueChange:function(l){return n.storage.oldUserListIcons=l},note:"Moves status indicators to the right"}),v.React.createElement(Y.Forms.FormSwitchRow,{label:"Icon theming compatibility",value:n.storage.useNativeIcons??!0,onValueChange:function(l){return n.storage.useNativeIcons=l},note:"Use native icons to allow icon theming"})))}const re=function(l){let{children:D}=l;const[I,U]=r.useState(0);return r.useEffect(function(){const P=function(){U(function(O){return O+1})};return v.FluxDispatcher.subscribe("PRESENCE_UPDATES",P),function(){v.FluxDispatcher.unsubscribe("PRESENCE_UPDATES",P)}},[]),r.Children.map(D,function(P,O){return r.cloneElement(P,{key:`${O}-${I}`})})},{Text:nn,View:F}=Y.General;let Z=[];var Ke={onLoad:function(){n.storage.dmTopBar??=!0,n.storage.userList??=!0,n.storage.profileUsername??=!0,n.storage.removeDefaultMobile??=!0,n.storage.fallbackColors??=!1,n.storage.oldUserListIcons??=!1,n.storage.useNativeIcons??=!0,Z.push(M.patcher.after("render",F,function(s,e){if(n.storage.dmTopBar){var t,o,f,i,a,d,h,m,T;const E=y.findInReactTree(e,function(u){var c,R,p,L,S,x,k;return(u==null||(p=u.props)===null||p===void 0||(R=p.children[1])===null||R===void 0||(c=R.type)===null||c===void 0?void 0:c.name)=="ChannelActivity"&&(u==null||(k=u.props)===null||k===void 0||(x=k.children[1])===null||x===void 0||(S=x.props)===null||S===void 0||(L=S.hasOwnProperty)===null||L===void 0?void 0:L.call(S,"userId"))});if(!E||((o=E.props)===null||o===void 0||(t=o.children)===null||t===void 0?void 0:t.length)!=2||((d=E.props)===null||d===void 0||(a=d.children[0])===null||a===void 0||(i=a.props)===null||i===void 0||(f=i.children)===null||f===void 0?void 0:f.length)!=2)return;const H=(T=E.props)===null||T===void 0||(m=T.children[0])===null||m===void 0||(h=m.props)===null||h===void 0?void 0:h.children;if(H.filter(function(u){var c;return u==null||(c=u.props)===null||c===void 0?void 0:c.userId}).length==2){var V;const u=H[1],c=(V=u.props)===null||V===void 0?void 0:V.userId;if(!c)return;M.patcher.after("type",u,function(R,p){return y.findInReactTree(p,function(L){return L.key=="StatusIcons"})||(p=r.createElement(F,{style:{display:"flex",flexDirection:"row"}},p,r.createElement(re,{key:"StatusIcons"},r.createElement(N,{userId:c})))),p})}}}));const l=C.findByDisplayName("Pressable",!1);Z.push(M.patcher.before("render",l.default.type,function(s){if(!s||!s[0])return;const[e]=s;if(e){if(n.storage.userList){var t,o,f,i;if(!(e==null||(i=e.children)===null||i===void 0||(f=i.props)===null||f===void 0||(o=f.children)===null||o===void 0||(t=o.props)===null||t===void 0)&&t.children){var a,d,h;if(((h=e.children.props.children.props.children[1])===null||h===void 0||(d=h.type)===null||d===void 0||(a=d.type)===null||a===void 0?void 0:a.name)=="ChannelUnreadBadge"){const W=e.children.props.children,J=y.findInReactTree(W,function(b){return b?.user});if(J?.user&&!y.findInReactTree(e,function(b){return b?.key=="TabsV2-DM-List"})){const b=y.findInReactTree(e,function(Q){var Be,Ne;return(Q==null||(Be=Q.props)===null||Be===void 0?void 0:Be.variant)=="text-md/semibold"||(Q==null||(Ne=Q.props)===null||Ne===void 0?void 0:Ne.variant)=="redesign/channel-title/semibold"});b&&(b.props.children=[b.props.children,r.createElement(F,{key:"TabsV2-DM-List",style:{flexDirection:"row",justifyContent:"center",alignContent:"flex-start"}},r.createElement(re,null,r.createElement(N,{userId:J.user.id})))])}}}}if(e.accessibilityRole=="button"){if(!n.storage.userList)return;if(e.children&&e.children.length>=2){var m,T,V,E;if(!((T=e.children[0])===null||T===void 0||(m=T.props)===null||m===void 0)&&m.user&&!((E=e.children[0])===null||E===void 0||(V=E.props)===null||V===void 0)&&V.channel||n.storage.oldUserListIcons){var H,u,c,R,p,L,S;if(!e.children[0]||!(!((u=e.children[0])===null||u===void 0||(H=u.props)===null||H===void 0)&&H.user))return;const W=(p=e.children[0])===null||p===void 0||(R=p.props)===null||R===void 0||(c=R.user)===null||c===void 0?void 0:c.id;if(!W)return;!((L=e.children)===null||L===void 0)&&L.find(function(b){return b.key=="StatusIcons"})||e.children.push(r.createElement(F,{key:"StatusIcons",style:{display:"flex",flexDirection:"row"}}));const J=(S=e.children)===null||S===void 0?void 0:S.find(function(b){return b.key=="StatusIcons"});J.props.children=r.createElement(N,{userId:W})}}}if(e.accessibilityRole=="button"){var x,k,j,_;if(!n.storage.userList)return;if(!(e==null||(_=e.children)===null||_===void 0||(j=_.props)===null||j===void 0||(k=j.children)===null||k===void 0||(x=k.props)===null||x===void 0)&&x.children){var q,z,X,K,w,B,g;if((e==null||(g=e.children)===null||g===void 0||(B=g.props)===null||B===void 0||(w=B.children)===null||w===void 0||(K=w.props)===null||K===void 0||(X=K.children[0])===null||X===void 0||(z=X.type)===null||z===void 0||(q=z.type)===null||q===void 0?void 0:q.name)=="GuildContainerIndicator"){var A,G,ae,de,ue,ce,ve,fe,pe,he,me,ye,be,Ce,Le,we,Ie,Ee,Re,Se,ge;const W=e==null||(me=e.children)===null||me===void 0||(he=me.props)===null||he===void 0||(pe=he.children)===null||pe===void 0||(fe=pe.props)===null||fe===void 0||(ve=fe.children[1])===null||ve===void 0||(ce=ve.props)===null||ce===void 0||(ue=ce.children[0])===null||ue===void 0||(de=ue.props)===null||de===void 0||(ae=de.children)===null||ae===void 0||(G=ae.props)===null||G===void 0||(A=G.user)===null||A===void 0?void 0:A.id;if(!(e==null||(ge=e.children)===null||ge===void 0||(Se=ge.props)===null||Se===void 0||(Re=Se.children)===null||Re===void 0||(Ee=Re.props)===null||Ee===void 0||(Ie=Ee.children[1])===null||Ie===void 0||(we=Ie.props)===null||we===void 0||(Le=we.children[0])===null||Le===void 0||(Ce=Le.props)===null||Ce===void 0||(be=Ce.children)===null||be===void 0||(ye=be.props)===null||ye===void 0)&&ye.guildId)return;if(W){var Me,De,Te,Ve,xe,ke;const J=e==null||(ke=e.children)===null||ke===void 0||(xe=ke.props)===null||xe===void 0||(Ve=xe.children)===null||Ve===void 0||(Te=Ve.props)===null||Te===void 0||(De=Te.children[2])===null||De===void 0||(Me=De.props)===null||Me===void 0?void 0:Me.children[0];if(J){const b=J.props.children[0].props.children;y.findInReactTree(b,function(Q){return Q.key=="DMTabsV2DMList-v2"})||b.push(r.createElement(re,{key:"DMTabsV2DMList-v2"},r.createElement(N,{userId:W})))}}}}}}})),C.findByStoreName("PresenceStore"),Z.push(M.patcher.after("default",C.findByName("ChannelHeader",!1),function(s,e){var t,o;n.storage.dmTopBar&&((o=e.type)===null||o===void 0||(t=o.type)===null||t===void 0?void 0:t.name)=="PrivateChannelHeader"&&M.patcher.after("type",e.type,function(f,i){var a,d,h,m,T,V,E;if(!(!((h=i.props)===null||h===void 0||(d=h.children)===null||d===void 0||(a=d.props)===null||a===void 0)&&a.children))return;const H=(V=y.findInReactTree(i,function(w){var B,g;return(g=w.props)===null||g===void 0||(B=g.user)===null||B===void 0?void 0:B.id}))===null||V===void 0||(T=V.props)===null||T===void 0||(m=T.user)===null||m===void 0?void 0:m.id;if(!H)return;const u=(E=i.props)===null||E===void 0?void 0:E.children;if(!y.findInReactTree(i,function(w){return w.key=="DMTabsV2Header"})){var c,R,p;if(!((p=u.props)===null||p===void 0||(R=p.children)===null||R===void 0||(c=R.props)===null||c===void 0)&&c.children[1]){var L,S,x,k;if(typeof((k=u.props)===null||k===void 0||(x=k.children)===null||x===void 0||(S=x.props)===null||S===void 0||(L=S.children[1])===null||L===void 0?void 0:L.type)=="function"){var j,_,q;const w=(q=u.props)===null||q===void 0||(_=q.children)===null||_===void 0||(j=_.props)===null||j===void 0?void 0:j.children[1],B=M.patcher.after("type",w,function(g,A){B(),y.findInReactTree(A,function(G){return G.key=="DMTabsV2Header-v2"})||A.props.children[0].props.children.push(r.createElement(re,{key:"DMTabsV2Header-v2"},r.createElement(N,{userId:H})))})}else{var z,X;const w=$.getAssetIDByName("arrow-right");(X=y.findInReactTree(u,function(B){var g,A,G;return((G=B.props)===null||G===void 0||(A=G.children[1])===null||A===void 0||(g=A.props)===null||g===void 0?void 0:g.source)==w}).props)===null||X===void 0||(z=X.children)===null||z===void 0||z.push(r.createElement(F,{key:"DMTabsV2Header",style:{flexDirection:"row",justifyContent:"center",alignContent:"flex-start"}},r.createElement(F,{key:"DMTabsV2HeaderIcons",style:{flexDirection:"row"}})))}}}const K=y.findInReactTree(i,function(w){return w.key=="DMTabsV2HeaderIcons"});K&&(K.props.children=r.createElement(N,{userId:H}))})}));const D=C.findByName("DefaultName",!1);Z.push(M.patcher.after("default",D,function(s,e){var t,o,f,i,a;const d=(t=s[0])===null||t===void 0?void 0:t.user;d!==void 0&&e&&d.id&&n.storage.profileUsername&&((a=e.props)===null||a===void 0||(i=a.children[0])===null||i===void 0||(f=i.props)===null||f===void 0||(o=f.children)===null||o===void 0||o.push(r.createElement(N,{userId:d.id})))}));const I=C.findByName("DisplayName",!1);Z.push(M.patcher.after("default",I,function(s,e){var t,o,f,i,a,d,h;const m=(t=s[0])===null||t===void 0?void 0:t.user;m!==void 0&&e&&m.id&&n.storage.profileUsername&&((h=e.props)===null||h===void 0||(d=h.children)===null||d===void 0||(a=d.props)===null||a===void 0||(i=a.children[0])===null||i===void 0||(f=i.props)===null||f===void 0||(o=f.children)===null||o===void 0||o.push(r.createElement(N,{userId:m.id})))}));const U=C.findByName("Status",!1);Z.push(M.patcher.before("default",U,function(s){s&&s[0]&&n.storage.removeDefaultMobile&&(s[0].isMobileOnline=!1)}));const P=C.findByProps("GuildMemberRow");P?.GuildMemberRow&&Z.push(M.patcher.after("type",P.GuildMemberRow,function(s,e){let[{user:t}]=s;!n.storage.userList||n.storage.oldUserListIcons||y.findInReactTree(e,function(o){return o.key=="GuildMemberRowStatusIconsView"})||y.findInReactTree(e,function(o){return o.props.style.flexDirection==="row"}).props.children.splice(2,0,r.createElement(F,{key:"GuildMemberRowStatusIconsView",style:{flexDirection:"row"}},r.createElement(N,{userId:t.id})))}));const O=function(s,e){let[{user:t}]=s;n.storage.userList&&(window.row2=e,y.findInReactTree(e,function(o){return o.key=="TabsV2MemberListStatusIconsView"})||(e.props.label=r.createElement(F,{style:{flex:1,justifyContent:n.storage.oldUserListIcons?"space-between":"flex-start",flexDirection:"row"},key:"TabsV2MemberListStatusIconsView"},e.props.label,r.createElement(F,{key:"TabsV2MemberListStatusIconsView",style:{flexDirection:"row"}},r.createElement(N,{userId:t.id})))))};C.findByTypeNameAll("UserRow").forEach(function(s){return Z.push(M.patcher.after("type",s,O))})},onUnload:function(){Z.forEach(function(l){return l()})},settings:function(){return r.createElement(Je,null)}};return le.default=Ke,Object.defineProperty(le,"__esModule",{value:!0}),le})({},vendetta,vendetta.metro,vendetta.ui.components,vendetta.utils,window.React,vendetta.metro.common,vendetta.ui.assets,vendetta.plugin,vendetta.storage,vendetta.ui);
