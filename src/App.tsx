import { Box, Button, Container, FormControl, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import ConsultStat from "./components/ConsultStat"
import TableInput from "./components/TableInput"

export interface TableSize {
  rows: number
  columns: number
}
function App() {
  const [tableSize, setTableSize] = useState<TableSize>({ rows: 6, columns: 6 })
  const [resetForm, setresetForm] = useState<boolean>()
  const { register, handleSubmit } = useForm<TableSize>();
  const onSubmit = (data: TableSize) => {
    setTableSize(data)
    setresetForm(e => !e)
  }

  return (
    <Box as="main" h={"max-content"}>
      <Container maxW='2xl' justifyContent={"space-between"} centerContent paddingBlock={10} gap={14}>
        <VStack as="form" onSubmit={handleSubmit(onSubmit)} gap={2}>
          <VStack w="100%">
            {
              Array(2).fill(undefined).map((_, idx) => (
                <FormControl key={idx}>
                  <FormLabel>{idx === 0 ? "Filas" : "Columnas"}</FormLabel>
                  <NumberInput allowMouseWheel step={1} min={4} defaultValue={tableSize.rows}>
                    <NumberInputField {...register(idx === 0 ? "rows" : "columns")} />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              ))
            }
          </VStack>
          <FormControl >
            <FormLabel>Logitud de la mutación</FormLabel>
            <NumberInput allowMouseWheel step={1} min={4} defaultValue={4} isDisabled={true}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <Button w="100%" color={"primary"} bgColor={"bg.500"} px={6} type="submit">Actualizar tamaño de la tabla</Button>
        </VStack>
        <TableInput rows={tableSize.rows} columns={tableSize.columns} resetForm={resetForm} />
        <ConsultStat />
      </Container>
    </Box >
  )
}
export default App