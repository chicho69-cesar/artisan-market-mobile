import { Alert, AlertCircleIcon, AlertIcon, AlertText, VStack } from '@gluestack-ui/themed'

interface Props {
  action: 'error' | 'info' | 'muted' | 'success'
  title: string
  description: string
}

export default function AppAlert({ action, description, title }: Props) {
  return (
    <Alert action={action} >
      <AlertIcon as={AlertCircleIcon} size='xl' mr='$3' />
      <VStack space='xs'>
        <AlertText fontWeight='$bold' mt='$2'>
          {title}
        </AlertText>

        <AlertText>
          {description}
        </AlertText>
      </VStack>
    </Alert>
  )
}
