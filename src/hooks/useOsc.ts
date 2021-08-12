import { useRef } from "react"


export const useOsc = (
    min = -1,
    max = 1,
    speed = 1
) => {
    const value = useRef(0)
    const range = max - min

    return dt => {
        value.current += dt * speed
        const alpha = Math.sin(value.current)
        const beta = (alpha + 1) / 2;
        const gamma = min + range * beta;
        return gamma;
    }
}


/*

sin = -1 <> 1
test = sf


*/
