import React from 'react';
import { Box, Text } from '@chakra-ui/react'
import clsx from 'clsx'
import { ReactNode } from 'react'

type TypeToastMessageProps = {
  title: string
  description?: string | ReactNode
  status: 'success' | 'error'
  className?: string
}

const toastStyles = {
  success: {
    bg: '#00851A',
  },
  error: {
    bg: '#B4000f',
  },
}

const ToastMessage = ({ title, description, status }: TypeToastMessageProps) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap="12px"
      padding="16px"
      borderRadius="12px"
      boxShadow="0px 0px 2px 0px rgba(0, 0, 0, 0.20), 0px 2px 10px 0px rgba(0, 0, 0, 0.10)"
      className={clsx('toast-message')}
      {...toastStyles[status]}
    >
      <Box flexGrow="1">
        <Text fontWeight="700" lineHeight="24px" textTransform="capitalize">
          {title}
        </Text>

        {description && (
          <Text
            marginTop="4px"
            fontSize="14px"
            lineHeight="21px"
            fontWeight="400"
            display="flex"
            alignItems="center"
            flexWrap="wrap"
          >
            {description}
          </Text>
        )}
      </Box>
    </Box>
  )
}

export default ToastMessage
