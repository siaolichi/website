import React, {useState, useRef, cloneElement, useEffect, useCallback} from 'react';
import {TransitionGroup} from 'react-transition-group';
import useEffectListener from '../hooks/useEffectListener';

const ScrollDrag = ({children, items}) => {
    const [state, setState] = useState({isScrolling: false, clientX: 0, scrollX: 0});

    const ref = useRef(null);
    const onMouseDown = useCallback((e) => {
        setState((s) => ({...s, isScrolling: true, clientX: e.clientX}));
    }, []);

    const onMouseUp = () => {
        // console.log('Mouse Up');
        setState((s) => ({...s, isScrolling: false}));
    };
    useEffectListener('mouseup', onMouseUp);
    const onMouseMove = (e, callbackState) => {
        const {clientX, scrollX, isScrolling} = callbackState;
        if (isScrolling) {
            // console.log(ref.current);
            ref.current.scrollTo = scrollX + e.clientX - clientX;
            // setState((s) => ({...s, scrollX: scrollX + e.clientX - clientX, clientX: e.clientX}));
        }
    };
    return (
        <div
            style={{
                display: 'flex',
                width: 300 * items.length + 'px',
                justifyContent: 'space-around',
                height: '100%',
                alignItems: 'flex-end',
                flexDirection: 'row',
            }}
            ref={ref}
            onMouseDown={onMouseDown}
            onMouseMove={(e) => onMouseMove(e, state)}
        >
            <TransitionGroup
                style={{
                    display: 'flex',
                    width: 300 * items.length + 'px',
                    justifyContent: 'space-around',
                    height: '100%',
                    alignItems: 'flex-end',
                    flexDirection: 'row',
                }}
            >
                {children}
            </TransitionGroup>
        </div>
    );
};

export default ScrollDrag;
