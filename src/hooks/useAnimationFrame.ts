import { useEffect, useRef } from "react";


export const useAnimationFrame = callback => {
    // Use useRef for mutable variables that we want to persist
    // without triggering a re-render on their change
    const callbackRef = useRef(callback);
    const requestRef = useRef<number>();
    const previousTimeRef = useRef<number>();

    const animate = time => {
        if (previousTimeRef.current === undefined) {
            previousTimeRef.current = time;
        }
        const deltaTime = time - previousTimeRef.current;
        if (deltaTime > 1000 / 16) {
            previousTimeRef.current = time;
            callbackRef.current(deltaTime)
        }
        requestRef.current = requestAnimationFrame(animate);
    }

    callbackRef.current = callback;

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, []); // Make sure the effect runs only once
}
