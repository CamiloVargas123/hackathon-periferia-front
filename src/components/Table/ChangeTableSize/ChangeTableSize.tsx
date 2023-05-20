import { Button, FormControl, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, VStack } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import type { TableSize } from '../models';

interface ChangeTableSizeProps {
  tableSize: TableSize
  setTableSize: Dispatch<SetStateAction<TableSize>>
}
export default function ChangeTableSize({ setTableSize, tableSize }: ChangeTableSizeProps) {
  const { register, handleSubmit } = useForm<TableSize>();

  const onSubmit = (data: TableSize) => {
    setTableSize(data)
  }

  return (
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
  )
}
