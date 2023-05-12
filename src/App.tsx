import { Box, Button, Container, FormControl, FormErrorMessage, FormHelperText, Input, VStack } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import Swal from 'sweetalert2'
import ConsultStat from "./components/ConsultStat"
import { useMutant } from "./hooks/useMutant"

const showMessage = (isMutant: boolean) => {
  Swal.fire({
    title: isMutant ? "Estudiante preparado para luchar!" : "Este estudiante no tiene mutaciones",
    text: isMutant ? "La secuencia de ADN coincide con más de 4 letras iguales en sus diferentes formar (oblicua, horizontal o vertical)" :
      "Su secuencia de ADN no coincide de ninguna mutacion",
    icon: isMutant ? 'success' : "warning",
    position: 'top',
    showConfirmButton: false,
    backdrop: "transparent",
    timer: 4000
  });
};

function App() {
  const { ADN, updateADN, error } = useValid()
  const { validMutant, isLoading } = useMutant({ ADN, showMessage })

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
        <FormControl as="form" display={"flex"} alignItems={"start"} gap={10} isInvalid={!!error} onSubmit={handleSubmit} isDisabled={isLoading}>
          <VStack gap={0} w="100%" alignItems={"flex-start"}>
            <Input placeholder="Ingrese la secuencia de ADN" value={ADN} onChange={handleChange} />
            {error ? <FormErrorMessage>{error}</FormErrorMessage> :
              <FormHelperText color={"white"}>
                Ejemplo: ATGCGA,CAGTGC,TTATGT,AGAAGG,CCCCTA,TCACTG
              </FormHelperText>
            }
          </VStack>
          <Button color={"primary"} bgColor={"bg.500"} px={6} type="submit" isLoading={isLoading}>Es mutante?</Button>
        </FormControl>
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