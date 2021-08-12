import React from "react"
import innerText from "react-innertext"
import SyntaxHighlighter from "react-syntax-highlighter"
import { monokai } from "react-syntax-highlighter/dist/esm/styles/hljs"

import { Flex } from "@chakra-ui/react"


const cleanupSnippet = (text: string) => {
    const parts = text.split("\n")
    const keptParts = []
    const finalParts = []
    let state = "head"
    for (const part of parts) {
        switch (state) {
            case "head":
                if (part.trim() !== "") {
                    state = "body"
                    keptParts.push(part)
                }
                break
            case "body":
                keptParts.push(part)
                break
        }
    }
    keptParts.reverse()
    state = "head"
    for (const part of keptParts) {
        switch (state) {
            case "head":
                if (part.trim() !== "") {
                    state = "body"
                    finalParts.push(part)
                }
                break
            case "body":
                finalParts.push(part)
                break
        }
    }
    finalParts.reverse()
    return finalParts.join("\n")
}


export const pre = ({children, ...props}) => {
    console.log(props)
    console.log(children)
    const istxt = !children.props.className || children.props.className === "language-text"
    return istxt ?
        <Flex style={{
            color:"white",
            overflowX: "auto",
            backgroundColor:"black",
            marginBottom: "2em",
            borderRadius: "5px",
        }}>
            <pre style={{margin: "auto"}}>{children}</pre>
        </Flex> 
        : <SyntaxHighlighter {...props}
            style={props.language === "text" ? null : monokai}
            children={cleanupSnippet(innerText(children))} />
}
export const Code = pre