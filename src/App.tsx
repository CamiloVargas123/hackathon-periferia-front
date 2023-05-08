import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Container, FormControl, FormErrorMessage, FormHelperText, Input, VStack } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import ConsultStat from "./components/ConsultStat"
import { useMutant } from "./hooks/useMutant"

function App() {
  const { ADN, updateADN, error } = useValid()
  const { validMutant, isMutant, isLoading } = useMutant({ ADN })

  const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault()
    validMutant({ ADN })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.includes('"')) return
    const newSearch = event.target.value.toUpperCase()
    updateADN(newSearch)
  }
  return (
    <Box as="main" h={"max-content"}>
      <Container maxW='2xl' justifyContent={"space-between"} centerContent paddingBlock={10} gap={10}>
        <FormControl as="form" display={"flex"} alignItems={"start"} gap={10} isInvalid={!!error} onSubmit={handleSubmit} isDisabled={isLoading || isMutant}>
          <VStack gap={0} w="100%" alignItems={"flex-start"}>
            <Input placeholder="Ingrese la secuencia de ADN" value={ADN} onChange={handleChange} />
            {error ? <FormErrorMessage>{error}</FormErrorMessage> :
              <FormHelperText color={"white"}>
                Ejemplo: ATGCGA,CAGTGC,TTATGT,AGAAGG,CCCCTA,TCACTG
              </FormHelperText>
            }
          </VStack>
          <Button color={"primary"} bgColor={"bg.500"} px={6} type="submit">Es mutante?</Button>
        </FormControl>
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
            <AlertTitle mt={4} mb={1} fontSize='lg' color={"bg.500"}>
              Estudiante preparado para luchar!
            </AlertTitle>
            <AlertDescription maxWidth='sm' color={"bg.500"}>
              La secuencia de ADN coincide con más de 4 letras iguales en sus diferentes formar (oblicua, horizontal o vertical)
            </AlertDescription>
          </Alert>
        }
        <ConsultStat />
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