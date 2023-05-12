import { Button, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

interface StatDto {
  count_mutant_dna: number;
  count_human_dna: number;
  ratio: number;
}
export default function ConsultStat() {
  const [stats, setStats] = useState<StatDto>()
  async function handleClick() {
    const response: StatDto = await axios.get('/stats').then(res => res.data)
    setStats(response)
  }
  return (
    <VStack marginBottom={14} >
      <VStack >
        <Text>Humanos: <Text as="span" color={"primary"}>{stats?.count_human_dna}</Text></Text>
        <Text>Mutantes: <Text as="span" color={"primary"}>{stats?.count_mutant_dna}</Text></Text>
        <Text>Porcentaje: <Text as="span" color={"primary"}>{stats?.ratio}</Text></Text>
      </VStack>
      <Button color={"primary"} bgColor={"bg.500"} px={6} onClick={handleClick}>Ver Estadisticas</Button>
    </VStack>
  )
}
