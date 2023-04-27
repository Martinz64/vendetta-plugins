import { findByStoreName } from '@vendetta/metro';
import { findInReactTree } from '@vendetta/utils';
import React from 'react'
import StatusIcon from './StatusIcon';
import { getStatusColor } from './colors';
import { FluxDispatcher } from '@vendetta/metro/common';

const PresenceStore = findByStoreName("PresenceStore");
const SessionsStore = findByStoreName("SessionsStore");
const UserStore = findByStoreName("UserStore");



export default function StatusIcons(props) {

    const [, forceRender] = React.useReducer(x => ~x, 0)
    const userId = props.userId;

    let statuses;

    if(userId == UserStore.getCurrentUser().id){
        statuses = Object.values(SessionsStore.getSessions()).reduce((acc: any, curr: any) => {
            if (curr.clientInfo.client !== "unknown")
                acc[curr.clientInfo.client] = curr.status;
            return acc;
        }, {});
    } else {
        statuses = PresenceStore.getState()?.clientStatuses[userId]
    }
    
    /*FluxDispatcher.subscribe('PRESENCE_UPDATES', u => {
        //if(u.updates.find(m => m.user?.id == userId)){
            forceRender()
        //}
    })*/
    return (
        <>
            {Object.keys(statuses ?? {}).map((s) => 
            <StatusIcon platform={s} color={getStatusColor(statuses[s])}/>)}
        </>
    )
}
