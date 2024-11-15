import React from "react";
import { createStandaloneToast } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { formatNormalTextToSnakeCase } from './format.util'
import ToastMessage from '@/components/Toast'

const { toast } = createStandaloneToast()

export const showToast = (
  status: 'success' | 'error',
  title: string,
  description?: string | ReactNode,
  className?: string,
) => {
  const id = formatNormalTextToSnakeCase(title)
  if (toast.isActive(id)) return

  return toast({
    id,
    title,
    status,
    description,
    duration: 5000,
    isClosable: true,
    position: 'bottom-right',
    containerStyle: {
      transform: className ? 'translateX(-356px)' : 'auto',
    },
    render: () => <ToastMessage status={status} title={title} description={description} />,
  })
}
