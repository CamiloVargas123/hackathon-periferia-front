import { Box, Container, Text } from "@chakra-ui/react"
import { ConsultStat, Table } from "./components"

export default function App() {
  return (
    <Box as="main" h={"max-content"}>
      <Container maxW='2xl' justifyContent={"space-between"} centerContent paddingBlock={4} gap={10}>
        <Text>
          El profesor Charles Xavier quiere reclutar la mayor cantidad de estudiantes para su escuela para
          poder luchar contra los Centinelas.<br />
          Esta aplicación detecta si un a persona es mutante
          basándose en su secuencia de ADN.<br />
          Sabrás si una persona es mutante, si encuentras más de una secuencia de cuatro letras iguales, de
          forma oblicua, horizontal o vertical.<br />
          Las letras solo pueden ser: (A,T,C,G), las cuales
          representa cada base nitrogenada del ADN.
        </Text>
        <Table />
        <ConsultStat />
      </Container>
    </Box >
  )
}