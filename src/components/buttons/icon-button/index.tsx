import React from 'react';
import {
  IconButton as ChakraIconButton,
  defineStyleConfig,
  HTMLChakraProps,
  IconButtonProps,
} from '@chakra-ui/react'
import { LegacyRef, useMemo } from 'react'

export const iconButtonTheme = defineStyleConfig({
  baseStyle: {
    _active: {
      transform: 'scale(0.95)',
    },
  },
  defaultProps: {
    size: 'sm',
  },
})

const IconButton = ({
  children,
  buttonRef,
  background,
  ...props
}: { buttonRef?: LegacyRef<HTMLButtonElement> } & IconButtonProps & HTMLChakraProps<'button'>) => {
  const hoverStyles = useMemo(() => {
    if (props._hover) return props._hover

    return {
      background: 'black.500',
    }
  }, [props._hover])

  return (
    <ChakraIconButton
      {...props}
      ref={buttonRef}
      borderRadius={props.borderRadius || 'full'}
      background={background || 'transparent'}
      isRound
      _hover={hoverStyles}
    >
      {children}
    </ChakraIconButton>
  )
}

export default IconButton
