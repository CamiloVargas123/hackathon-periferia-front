import axios from "axios";
import { useCallback, useRef, useState } from 'react';

export function useMutant({ ADN }: { ADN: string }) {
  const [isMutant, setIsMutant] = useState(false)
  const previousADN = useRef(ADN)

  const validMutant = useCallback(async ({ ADN }: { ADN: string }) => {
    if (ADN === previousADN.current) return

    try {
      previousADN.current = ADN
      const response = await axios.post('/mutant', { "dna": ADN.split(",") })
      setIsMutant(response.status === 200 ? true : false)
    } catch (error) {
      console.log(error)
    }

  }, [])
  return { validMutant, isMutant }
}