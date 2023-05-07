import { Box, Button, Container, HStack, Input, VStack } from "@chakra-ui/react"


function App() {

  return (
    <Box as="main" h={"max-content"}>
      <Container maxW='2xl' centerContent paddingBlock={10}>
        <VStack as="form" gap={10} >
          <HStack>
            <Input placeholder="Ingrese la secuencia de ADN" id="input"  />
            <Button color={"primary"} bgColor={"bg.500"} px={6} type="submit">Es mutante?</Button>
          </HStack>
          <Box >asd</Box>
        </VStack>
      </Container>
    </Box>
  )
}

export default App


