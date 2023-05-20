import axios from "axios";
import { useCallback, useState } from 'react';
import { ENDPOINT } from "src/const";

export function useMutant({ showMessage }: { showMessage: (_: boolean) => void }) {
  const [isMutant, setIsMutant] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const validMutant = useCallback(async ({ ADN }: { ADN: string[] }) => {
    try {
      setIsLoading(true)
      const response = await axios.post(ENDPOINT.MUTANT, { "dna": ADN })
      setIsMutant(response.status === 200 ? true : false)
      showMessage(true)
    } catch (error) {
      showMessage(false)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [showMessage])
  return { validMutant, isMutant, isLoading }
}