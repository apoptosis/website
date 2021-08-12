import React, { FC, useState } from "react"

import { Box, Flex } from "@chakra-ui/react"

// recursive TOC component where each item has title, url and optionally items
const TOC = ({ items, ...rest }) => {
    const depth = rest.depth || 0

    if (items.length === 0) {
        return null
    }

    const itemProps = depth === 0 ? {marginRight: "1.5em", flexShrink: 0} : {}
    const linkProps = depth === 0 ? {fontSize: "1.5em"} : {}

    const toc = items.map(({ title, url, items: childItems }) => {
        return (
            <Box key={title} style={itemProps}>
                <a href={url} style={{...linkProps}}>{title}</a>
                {childItems && TOC({ items: childItems, depth: depth + 1 })}
            </Box>
        )
    })

    return (
        <Box style={{display: depth === 0 ? "flex" : "block"}}>
            {toc}
        </Box>
    )
}

export type FooterProps = {
    toc: any | undefined
    size?: number
}

function isWithingARect(x: number, y: number, rect: ClientRect) {
    const xIsWithin = x > rect.left && x < rect.right
    const yIsWithin = y > rect.top && y < rect.bottom
    return xIsWithin && yIsWithin
}

export const Footer: FC<FooterProps> = ({ toc, size }) => {
    const [open, setOpen] = useState(false)
    size = size || 45
    const hasToc = toc && Object.keys(toc).length > 0
    const tocProps = hasToc ? {
        position: "fixed",
        bottom: "0px",
    } : {}

    const onMouseEnter = () => {
        if (hasToc) {
            setOpen(true)
        }
    }

    const onMouseLeave = (ev) => {
        if (hasToc) {
            const trigger: HTMLElement = document.getElementById('footer')
            const triggerRect = trigger.getBoundingClientRect()
            const falsePositive = isWithingARect(ev.clientX, ev.clientY, triggerRect)
        
            if (!falsePositive) {
                // do what needs to be done
                setOpen(false)
            }            
        }
    }

    const openProps = open ? {height: "auto"} : {}

    return (
        <Flex 
            id="footer"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            position="fixed"
            bottom="0px"
            width={'100%'}
            h={`${size}px`} 
            borderTop="1px solid black" 
            flexDirection="column"
            {...(tocProps as any)} 
            {...(openProps as any)} 
        >
            <Box h={`${size}px`} position="relative">
                <canvas id="footer-canvas" style={{width: "100%", height: `${size}px`}} />
                <Box
                    position="absolute"
                    top={`-${size}px`}
                    left={`calc(50% - 22px)`}
                    width="0px" 
                    height="0px"
                    borderTop={`${size}px solid transparent`}
                    borderLeft={`${size}px solid transparent`}
                    borderRight={`${size}px solid transparent`}
                    borderBottom={`${size}px solid black`}
                ></Box>
            </Box>
            <Flex color="white" bg="black" p={ open ? "2em" : "0"} overflowX="auto">
                {hasToc && <TOC items={toc.items} />}
            </Flex>
        </Flex>
    )
}
