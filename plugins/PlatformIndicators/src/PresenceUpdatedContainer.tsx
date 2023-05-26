import { FluxDispatcher } from "@vendetta/metro/common";
import {General} from "@vendetta/ui/components"
import React, { useState, useEffect } from 'react';
const {Text,View } = General;

const PresenceUpdatedContainer = ({ children }) => {
    const [counter, setCounter] = useState(0);
    useEffect(() => {

        const presenceUpdate = () => {
            setCounter(prevCounter => prevCounter + 1);
        }
        FluxDispatcher.subscribe('PRESENCE_UPDATES',presenceUpdate);
        return () => {
            FluxDispatcher.unsubscribe('PRESENCE_UPDATES',presenceUpdate);
        };
    }, []);
    
    //return children;
    return (
        React.Children.map(children, (child, index) => {
            return React.cloneElement(child, { key: `${index}-${counter}` });
        })
    );
};

export default PresenceUpdatedContainer