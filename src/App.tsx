import { Box, Button, Container, FormControl, FormErrorMessage, FormHelperText, HStack, Input, VStack } from "@chakra-ui/react"
import { useCallback, useEffect, useRef, useState } from "react"
import debounce from 'just-debounce-it'
import { useMutant } from "./hooks/useMutant"

function App() {
  const { ADN, updateADN, error } = useValid()
  const { validMutant } = useMutant({ ADN })
  function submit(e: React.FormEvent) {
    e.preventDefault()
  }
  const debouncedValidSequencie = useCallback(
    debounce((ADN: string) => {
      validMutant({ adn: ADN.split(",") })
    }, 500)
    , [validMutant]
  )
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = event.target.value
    updateADN(newSearch.toUpperCase())
    debouncedValidSequencie(newSearch)
  }
  return (
    <Box as="main" h={"max-content"}>
      <Container maxW='2xl' centerContent paddingBlock={10}>
        <FormControl display={"flex"} flexDir={"column"} gap={10} onSubmit={submit} isInvalid={!!error}>
          <HStack alignItems={"start"}>
            <VStack gap={1} w="100%">
              <Input placeholder="Ingrese la secuencia de ADN" id="input" onChange={handleChange} />
              {error ? <FormErrorMessage>{error}</FormErrorMessage> :
                <FormHelperText color={"white"}>
                  Ingresa una cadena de ADN separada por comas. Ejemplo: ATGCGA,CAGTGC,TTATGT,AGAAGG,CCCCTA,TCACTG
                </FormHelperText>
              }
            </VStack>
            <Button color={"primary"} bgColor={"bg.500"} px={6} type="submit">Es mutante?</Button>
          </HStack>
          <Box >asd</Box>
        </FormControl>
      </Container>
    </Box>
  )
}

export default App


function useValid() {
  const [ADN, updateADN] = useState<string>('')
  const [error, setError] = useState<string>()
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = ADN === ''
      return
    }

    if (ADN === '') {
      setError('No se puede buscar una secuencia de ADN vacía')
      return
    }

    setError(undefined)
  }, [ADN])

  return { ADN, updateADN, error }
}