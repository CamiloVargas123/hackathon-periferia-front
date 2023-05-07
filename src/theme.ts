import { extendTheme } from "@chakra-ui/react";

export default extendTheme({
  colors: {
    bg: {
      100: "#474747",
      500: "#333333"
    },
    primary: "#8fa800"
  },
  styles: {
    global: {
      body: {
        backgroundColor: "bg.100"
      }
    }
  }
})