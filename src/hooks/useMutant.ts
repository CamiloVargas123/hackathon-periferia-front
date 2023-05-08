import axios from "axios";
import { useCallback, useRef, useState } from 'react';

export function useMutant({ ADN }: { ADN: string }) {
  const [isMutant, setIsMutant] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const previousADN = useRef(ADN)
  function removeMessage() {
    setTimeout(() => {
      setIsMutant(false)
    }, 5000);
  }
  const validMutant = useCallback(async ({ ADN }: { ADN: string }) => {
    if (ADN === previousADN.current) return

    try {
      setIsLoading(true)
      previousADN.current = ADN
      const response = await axios.post('/mutant', { "dna": ADN.split(",") })
      setIsMutant(response.status === 200 ? true : false)
      removeMessage()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }, [])
  return { validMutant, isMutant, isLoading }
}