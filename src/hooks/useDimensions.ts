import * as React from "react"
import { useLayoutEffect } from "react"

import { BoxModel,getBox } from "@chakra-ui/utils"


/**
 * Reack hook to measure a component's dimensions
 *
 * @param ref ref of the component to measure
 * @param observe if `true`, resize and scroll observers will be turned on
 */
export function useDimensions(
    ref: React.RefObject<HTMLElement>,
    observe?: boolean,
    scrolling?: boolean
) {
    const [dimensions, setDimensions] = React.useState<BoxModel | null>(null)
    const rafId = React.useRef<number>()

    useLayoutEffect(() => {
        if (!ref.current) return undefined

        const node = ref.current

        function measure() {
            rafId.current = requestAnimationFrame(() => {
                const boxModel = getBox(node)
                setDimensions(boxModel)
            })
        }

        measure()

        if (observe) {
            window.addEventListener("resize", measure)
            scrolling && window.addEventListener("scroll", measure)
        }

        return () => {
            if (observe) {
                window.removeEventListener("resize", measure)
                scrolling && window.removeEventListener("scroll", measure)
            }

            if (rafId.current) {
                cancelAnimationFrame(rafId.current)
            }
        }
    }, [ref, observe, scrolling])

    return dimensions
}
