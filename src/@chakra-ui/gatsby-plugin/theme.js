import { extendTheme } from "@chakra-ui/react"


const theme = {
    sizes: {max: "960px"},
    colors: {
        primary: "white",
        secondary: "black",
    },
    styles: {global: {body: {bg: "white"}}},
}

export default extendTheme(theme)
