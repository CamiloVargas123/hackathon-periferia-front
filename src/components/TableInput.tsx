import { Alert, AlertIcon, Button, HStack, Input, Text, VStack } from '@chakra-ui/react'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useForm } from 'react-hook-form'
import type { TableSize } from '../App'
import { useMutant } from '../hooks/useMutant'
import Swal from 'sweetalert2'

const acepptKey = ["A", "T", "C", "G"]
interface NextFocus {
  tableSize: TableSize
  rowIndex: number
  colIndex: number
}
interface NextFocusResult { nextRow: number, nextColumn: number }
function nextFocus({ tableSize, rowIndex, colIndex }: NextFocus): NextFocusResult {
  const result: NextFocusResult = { nextColumn: 0, nextRow: 0 }
  if (colIndex === tableSize.columns - 1 && rowIndex < tableSize.rows - 1) {
    result.nextRow = rowIndex + 1
    result.nextColumn = 0
  } else if (rowIndex === tableSize.rows - 1 && colIndex < tableSize.columns - 1) {
    result.nextRow = rowIndex
    result.nextColumn = colIndex + 1
  }
  else if (rowIndex < tableSize.rows - 1) {
    result.nextRow = rowIndex
    result.nextColumn = colIndex + 1
  } else if (colIndex < tableSize.columns - 1) {
    result.nextRow = rowIndex + 1
    result.nextColumn = 0
  }
  return result
}


interface TableInputProps extends TableSize {
  resetForm?: boolean
}
export default function TableInput({ rows, columns, resetForm }: TableInputProps) {
  const table = useMemo(() => Array.from({ length: rows }, () => Array.from({ length: columns }, () => "")), [rows, columns])
  const { register, handleSubmit, formState: { errors }, setValue, setFocus, reset } = useForm({ mode: "onSubmit" });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const showMessage = useCallback(
    (isMutant: boolean) => {
      Swal.fire({
        title: isMutant ? "Estudiante preparado para luchar!" : "Este estudiante no tiene mutaciones",
        text: isMutant ? "Su secuencia de ADN indica mas de una mutación" :
          "Su secuencia de ADN no coincide de ninguna mutación",
        icon: isMutant ? 'success' : "warning",
        position: 'center',
        showConfirmButton: false,
        timer: 4000
      }).then(() => setFocus('0,0'));
    },
    [setFocus],
  )
  const { validMutant, isLoading } = useMutant({ showMessage })

  const onSubmit = (data: any) => {
    for (let i = 0; i < table.length; i++) {
      for (let j = 0; j < table[i].length; j++) {
        table[i][j] = data[`${i},${j}`]
      }
    }
    const transform = table.map(e => e.join(""))
    validMutant({ ADN: transform })
    reset()
  }

  useEffect(() => {
    setFocus('0,0');
  }, [setFocus])

  useEffect(() => {
    reset()
  }, [resetForm, reset])

  return (
    <VStack as="form" onSubmit={handleSubmit(onSubmit)} gap={2}>
      <HStack w="100%" gap={4}>
        <Text >Nitrogenada del ADN:</Text>
        <Text as="span" color={"primary"} fontWeight={"bold"}>A, T, C, G</Text>
      </HStack>
      <VStack gap={0}>
        {table.map((row, rowIndex) => (
          <HStack key={rowIndex} gap={0}>
            {row.map((_, colIndex) => (
              <Input
                key={colIndex + "," + colIndex}
                type="text"
                w="80px"
                textTransform={"uppercase"}
                textAlign={"center"}
                bgColor={errors[`${rowIndex},${colIndex}`] ? "rgba(255, 0, 0, 0.3)" : "initial"}
                {...register(`${rowIndex},${colIndex}`, {
                  required: true,
                  pattern: /^[ATCG]+$/i,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value.toUpperCase()
                    if (!acepptKey.includes(value)) return setValue(`${rowIndex},${colIndex}`, "")
                    setValue(`${rowIndex},${colIndex}`, value)
                    if (rowIndex === rows - 1 && colIndex === columns - 1) return buttonRef.current?.focus()
                    if (value !== "") {
                      const nextValue = nextFocus({ tableSize: { rows, columns }, rowIndex, colIndex })
                      return setFocus(`${nextValue.nextRow},${nextValue.nextColumn}`)
                    }
                  },
                  value: ""
                })}
              />
            ))}
          </HStack>
        ))}
      </VStack>
      <Button w="min-content" color={"primary"} bgColor={"bg.500"} px={6} type="submit" isLoading={isLoading} ref={buttonRef}>Es Mutante?</Button>
      {
        Object.entries(errors).length > 0 && <Alert status='error' borderRadius={"md"}>
          <AlertIcon />
          <Text color={"black"}>Todos los campos son requeridos</Text>
        </Alert>
      }
    </VStack>
  )
}