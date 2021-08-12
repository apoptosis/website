import {
    FC,
    useEffect,
    useRef,
    useState,
} from "react"

import SimplexNoise from "simplex-noise"

import { useAnimationFrame } from '../../hooks/useAnimationFrame'
import { useOsc } from "../../hooks/useOsc"


export type VectorFieldProps = {
    density: number
    width: number
    height: number
    ctx: CanvasRenderingContext2D
}

export const VectorField: FC<VectorFieldProps> = ({ ctx, density, width, height }) => {
    // const width = ctx.canvas.width;
    // const height = ctx.canvas.height;
    // const width = ctx.content
    // const height = ctx.canvas.height;
    const otherCanvas = useRef<HTMLCanvasElement>(null)
    const otherCtx = useRef<CanvasRenderingContext2D>(null)

    useEffect(() => {
        otherCanvas.current = document.getElementById('footer-canvas') as HTMLCanvasElement
        otherCtx.current = otherCanvas.current.getContext('2d')
        // otherCanvas.current.width = ctx.canvas.width;
        // otherCtx.current.scale(1, 2.3);
    }, [])

    const [noise] = useState(() => new SimplexNoise())
    const columns = Math.floor(width / density) + 1
    const rows = Math.floor(height / density) + 1

    const halfColumns = columns * 0.5
    const halfRows = rows * 0.5

    const field = new Array(columns)
    for(let x = 0; x < columns; x++) {
        field[x] = new Array(columns)
        for(let y = 0; y < rows; y++) {
            field[x][y] = [0, 0, 0]
        }
    }

    const minColor = 230
    const colorCo = 255 - minColor
    const noiseZ = useRef(0)
    const timeCo = .00003
    const angleZoom = useOsc(0.005, 0.025, .000000002)
    const lengthCo = useOsc(30, 30, 0.0002)

    useAnimationFrame(dt => {
        const _lengthCo = lengthCo(dt)
        noiseZ.current += dt * timeCo
        for(let x = 0; x < columns; x++) {
            for(let y = 0; y < rows; y++) {
                const _angleZoom = angleZoom(dt)
                const dx = (x - halfColumns) * _angleZoom
                const dy = (y - halfRows) * _angleZoom
                const r = noise.noise3D(dx, dy, noiseZ.current) * colorCo + minColor
                const g = noise.noise3D(dx, dy, noiseZ.current * 2) * colorCo + minColor
                const b = noise.noise3D(dx, dy, noiseZ.current * 4) * colorCo + minColor
                const noiseValue = noise.noise3D(dx, dy, noiseZ.current)
                field[x][y][0] = noiseValue * Math.PI * 2
                field[x][y][1] = noiseValue
                field[x][y][2] = `rgb(${r}, ${g}, ${b})`
            }
        }

        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

        for(let x = 0; x < columns; x++) {
            for(let y = 0; y < rows; y++) {
                const angle = field[x][y][0]
                const length = field[x][y][1]
                const color = field[x][y][2]
                ctx.save()
                ctx.translate(x*density, y*density)
                ctx.rotate(angle)
                ctx.strokeStyle = color //"#EEE"
                ctx.beginPath()
                ctx.moveTo(0, 0)
                ctx.lineTo(0, length * _lengthCo)
                ctx.stroke()
                ctx.restore()
            }
        }

        if (otherCtx.current) {
            otherCtx.current.canvas.width = ctx.canvas.offsetWidth
            otherCtx.current.canvas.height = ctx.canvas.offsetHeight / 2
            otherCtx.current.drawImage(ctx.canvas, 0, 0)
        }
    })

    return null
}
