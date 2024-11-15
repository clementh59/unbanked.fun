import React from 'react';
import {
  ButtonProps,
  Button as ChakraButton,
  defineStyle,
  defineStyleConfig,
  HTMLChakraProps,
} from '@chakra-ui/react'
import { LegacyRef } from 'react'

const primary = defineStyle({
  width: '100%',
  background: 'red.100',
  border: '1px solid',
  borderColor: 'red.100',
  fontSize: '14px',
  _disabled: {
    background: 'black.700',
    borderColor: 'black.700',
    color: 'rgba(255, 255, 255, 0.40)',
    '&:hover': {
      background: 'black.700 !important',
    },
  },
  _hover: {
    '&:not(:disabled)': {
      background: 'red.100 !important',
    },
  },
})

const secondary = defineStyle({
  width: '100%',
  background: 'transparent',
  border: '1px solid',
  borderColor: 'transparent',
  fontSize: '14px',
  _hover: {
    background: 'black.500',
  },
})

const green = defineStyle({
  background: 'green.300',
  borderColor: 'green.300',
})

const white = defineStyle({
  background: 'white.100',
  borderColor: 'white.100',
  color: 'black.100',
})

const menuButton = defineStyle({
  background: 'black.200',
  borderColor: 'black.200',
  fontSize: '14px',
  _hover: {
    background: 'black.400',
  },
  _active: {
    borderColor: 'red.100',
    transform: 'scale(1)',
  },
})

const maxButton = defineStyle({
  width: '46px',
  height: '24px',
  padding: '4px 8px',
  borderRadius: '900px',
  background: 'black.900',
  fontSize: '12px',
  color: 'white.100',
  _hover: {
    background: 'red.100',
  },
})

export const buttonTheme = defineStyleConfig({
  baseStyle: {
    color: 'white.100',
    fontWeight: '600',
    borderRadius: '8px',
    padding: '12px 10px',
    fontSize: '14px',
    _active: {
      '&:not(:disabled)': {
        transform: 'scale(0.95)',
      },
    },
  },
  variants: {
    green,
    white,
    primary,
    secondary,
    menuButton,
    maxButton,
  },
})

const Button = ({
  children,
  ...props
}: ButtonProps &
  HTMLChakraProps<'button'> & { buttonRef?: LegacyRef<HTMLButtonElement> | null }) => {
  return (
    <ChakraButton ref={props.buttonRef} {...props}>
      {children}
    </ChakraButton>
  )
}

export default Button
