import { findByStoreName } from '@vendetta/metro';
import { findInReactTree } from '@vendetta/utils';
import React from 'react'
import StatusIcon from './StatusIcon';
import { getStatusColor } from './colors';
import { FluxDispatcher } from '@vendetta/metro/common';

const PresenceStore = findByStoreName("PresenceStore");



export default function StatusIcons(props) {

    const [, forceRender] = React.useReducer(x => ~x, 0)
    const userId = props.userId;

    const statuses = PresenceStore.getState()?.clientStatuses[userId]

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
