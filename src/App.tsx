import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Container, FormControl, FormErrorMessage, FormHelperText, HStack, Input, VStack } from "@chakra-ui/react"
import { useCallback, useEffect, useRef, useState } from "react"
import debounce from 'just-debounce-it'
import { useMutant } from "./hooks/useMutant"

function App() {
  const { ADN, updateADN, error } = useValid()
  const { validMutant, isMutant } = useMutant({ ADN })
  function submit(e: React.FormEvent) {
    e.preventDefault()
  }
  const debouncedValidSequencie = useCallback(
    debounce((ADN: string) => {
      validMutant({ ADN })
    }, 400)
    , [validMutant]
  )
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = event.target.value.toUpperCase()
    updateADN(newSearch)
    debouncedValidSequencie(newSearch)
  }
  return (
    <Box as="main" h={"max-content"}>
      <Container maxW='2xl' centerContent paddingBlock={10}>
        <FormControl display={"flex"} flexDir={"column"} gap={10} onSubmit={submit} isInvalid={!!error}>
          <HStack alignItems={"start"}>
            <VStack gap={1} w="100%">
              <Input placeholder="Ingrese la secuencia de ADN" onChange={handleChange} value={ADN} />
              {error ? <FormErrorMessage>{error}</FormErrorMessage> :
                <FormHelperText color={"white"}>
                  Ingresa una cadena de ADN separada por comas. Ejemplo: ATGCGA,CAGTGC,TTATGT,AGAAGG,CCCCTA,TCACTG
                </FormHelperText>
              }
            </VStack>
            <Button color={"primary"} bgColor={"bg.500"} px={6} type="submit">Es mutante?</Button>
          </HStack>
          {
            isMutant && <Alert
              status='success'
              variant='subtle'
              flexDirection='column'
              alignItems='center'
              justifyContent='center'
              textAlign='center'
              height='200px'
              bgColor={"#8fa800"}
            >
              <AlertIcon boxSize='40px' mr={0} color={"white"} />
              <AlertTitle mt={4} mb={1} fontSize='lg'color={"bg.500"}>
                Estudiante preparado para luchar!
              </AlertTitle>
              <AlertDescription maxWidth='sm'color={"bg.500"}>
                La secuencia de ADN coincide con más de 4 letras iguales en sus diferentes formar (oblicua, horizontal o vertical)
              </AlertDescription>
            </Alert>
          }
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