import { findByStoreName } from '@vendetta/metro';
import { findInReactTree } from '@vendetta/utils';
import React from 'react'
import StatusIcon from './StatusIcon';
import { getStatusColor } from './colors';
import { FluxDispatcher } from '@vendetta/metro/common';

import { storage } from "@vendetta/plugin";
import { useProxy } from "@vendetta/storage";

const PresenceStore = findByStoreName("PresenceStore");
const SessionsStore = findByStoreName("SessionsStore");
const UserStore = findByStoreName("UserStore");


let statusCache;
let statusCacheHits = 0;
let statusCacheTimeout;
let currentUserId;

function queryPresenceStoreWithCache(){
    if(!statusCacheTimeout){
        statusCacheTimeout = setTimeout(() => {
            statusCacheHits = 0
            statusCacheTimeout = null
        },5000);
    }

    if(!statusCache || statusCacheHits == 0){
        statusCache = PresenceStore.getState()
        //console.log("hit store")
    }

    statusCacheHits = (statusCacheHits+1) % 20

    //console.log("hit")
    return statusCache
}

function getUserStatuses(userId){
    let statuses;

    if(!currentUserId){
        currentUserId = UserStore.getCurrentUser()?.id
    }

    if(userId == currentUserId){
        statuses = Object.values(SessionsStore.getSessions()).reduce((acc: any, curr: any) => {
            if (curr.clientInfo.client !== "unknown")
                acc[curr.clientInfo.client] = curr.status;
            return acc;
        }, {});
    } else {
        statuses = queryPresenceStoreWithCache()?.clientStatuses[userId]
    }
    return statuses
}

export default function StatusIcons(props) {
    useProxy(storage)

    //const [, forceRender] = React.useReducer(x => ~x, 0)
    const userId = props.userId;

    const statuses = getUserStatuses(userId)
    
    /*FluxDispatcher.subscribe('PRESENCE_UPDATES', u => {
        //if(u.updates.find(m => m.user?.id == userId)){
            forceRender()
        //}
    })*/
    return (
        <>
            {Object.keys(statuses ?? {}).map((s) => 
            <StatusIcon platform={s} color={getStatusColor(statuses[s],storage.fallbackColors)} useNative={storage.useNativeIcons}/>)}
        </>
    )
}
