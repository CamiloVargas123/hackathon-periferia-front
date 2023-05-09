import axios from "axios";
import { useCallback, useRef, useState } from 'react';

export function useMutant({ ADN, showMessage }: { ADN: string, showMessage: (_: boolean) => void }) {
  const [isMutant, setIsMutant] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const previousADN = useRef(ADN)

  const validMutant = useCallback(async ({ ADN }: { ADN: string }) => {
    if (ADN === previousADN.current) return
    try {
      setIsLoading(true)
      previousADN.current = ADN
      const response = await axios.post('/mutant', { "dna": ADN.split(",") })
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