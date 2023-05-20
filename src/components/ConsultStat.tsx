import { Button, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import ErrorFetch from "./ErrorFetch";
import { Stat } from "./model";
import { getStats } from "./services";

export default function ConsultStat() {
  const { data: stats, isError, isFetching, refetch } = useQuery<Stat>({
    queryFn: getStats,
    queryKey: ['stats'],
    refetchOnWindowFocus: false
  })
  function handleClick() {
    refetch()
  }

  return (
    <VStack marginBottom={14} >
      <VStack >
        <StatText label="Humanos" value={stats?.count_human_dna} />
        <StatText label="Mutantes" value={stats?.count_mutant_dna} />
        <StatText label="Porcentaje" value={stats?.ratio} />
      </VStack>
      <Button color={"primary"} bgColor={"bg.500"} px={6} onClick={handleClick} isLoading={isFetching}>Ver Estadisticas</Button>
      {isError && <ErrorFetch />}
    </VStack>
  )
}

interface StatTextProps {
  label: string;
  value?: number;
}
function StatText({ label, value }: StatTextProps) {
  return (
    <Text>{label}: <Text as="span" color={"primary"}>{value?.toFixed(2) ?? 'N/A'}</Text></Text>
  );
}