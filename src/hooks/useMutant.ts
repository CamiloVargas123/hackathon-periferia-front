import { useCallback, useRef, useState } from 'react'
import { validSequencie } from '../services/validSequencie'

export function useMutant({ ADN }: { ADN: string }) {
  const [isMutant, setIsMutant] = useState(false)
  const previousADN = useRef(ADN)

  const validMutant = useCallback(({ ADN }: { ADN: string }) => {
    if (ADN === previousADN.current) return

    try {
      previousADN.current = ADN
      setIsMutant(validSequencie({ adn: ADN.split(",") }))
    } catch (e) {
      console.log(e)
    }

  }, [])
  return { validMutant, isMutant }
}