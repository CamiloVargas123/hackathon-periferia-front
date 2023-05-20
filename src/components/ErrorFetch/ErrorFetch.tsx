import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react'

export default function ErrorFetch() {
  return (
    <Alert status='error' borderRadius={"md"} color={"black"}>
      <AlertIcon />
      <AlertTitle>Error:</AlertTitle>
      <AlertDescription>La acción realizada ha fallado, intenta de nuevo</AlertDescription>
    </Alert>
  )
}
