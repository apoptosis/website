import React, {
    FC,
    ReactNode,
    useEffect,
    useRef,
    useState,
} from 'react'

import { useDimensions } from "../../hooks"


export type CanvasCallback =
    (ctx: CanvasRenderingContext2D, width: number, height: number) => ReactNode

export type CanvasProps = {
    children: CanvasCallback
}

export const Canvas: FC<CanvasProps> = ({ children, ...props }) => {
    const canvasRef = useRef<HTMLCanvasElement>()
    const contextRef = useRef<CanvasRenderingContext2D>()
    const size = useDimensions(canvasRef, true)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const canvas = canvasRef.current
        contextRef.current = canvas.getContext('2d')
        if (size) {
            contextRef.current.canvas.width = size?.contentBox.width
            contextRef.current.canvas.height = size?.contentBox.height
            if (!loaded) setLoaded(true)
        }
    }, [size?.contentBox.width, loaded, canvasRef])

    return (
        <>
            <canvas
                style={{
                    width: "100%",
                    height: "100%",
                }}
                ref={canvasRef}
                {...props}
            />
            { loaded && children(contextRef.current, size?.contentBox.width, size?.contentBox.height) }
        </>
    )
}
