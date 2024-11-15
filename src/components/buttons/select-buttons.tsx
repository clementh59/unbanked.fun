import React from 'react';
import { onMouseDown } from '@/utils/event.util'
import clsx from 'clsx'
import { memo, useCallback, useRef } from 'react'
import './styles.scss'

type TypeSelectButtonsProps = {
  options: {
    [key: string]: any
    label: string
    value: any
  }[]
  className?: string
  isMulti?: boolean
  values: any[]
  disabled?: any[]
  onChange: (value: any[]) => void
}

const SelectButtons = ({
  options,
  isMulti,
  values,
  className = '',
  disabled = [],
  onChange,
}: TypeSelectButtonsProps) => {
  const selectButtonsRef = useRef<HTMLUListElement | null>(null)

  const handleMouseDown = useCallback(
    (event: React.MouseEvent) => onMouseDown(event, selectButtonsRef),
    [],
  )

  const handleChange = (value: string, idx: number) => {
    // handle scrollable
    if (selectButtonsRef.current) {
      const selectedItem = selectButtonsRef.current.children[idx] as HTMLElement

      if (selectedItem) {
        const scrollLeft = selectedItem.offsetLeft - selectButtonsRef.current.offsetLeft

        selectButtonsRef.current.scrollTo({
          left: idx ? scrollLeft : 0,
          behavior: 'smooth',
        })
      }
    }

    // handle change
    const currentValues = [...values]
    const index = currentValues.findIndex((item) => item === value)

    if (index >= 0) currentValues.splice(index, 1)
    else currentValues.push(value)

    return isMulti
      ? onChange([...currentValues])
      : onChange([currentValues[currentValues.length - 1]])
  }

  return (
    <ul
      ref={selectButtonsRef}
      className={`select-buttons hide-scrollbar ${className}`}
      onMouseDown={handleMouseDown}
    >
      {options.map((item, index) => (
        <li
          key={item.value || index}
          className={clsx('button', {
            'button--active': values.includes(item.value),
            'button--disabled': disabled.includes(item.value),
          })}
          onClick={() => (disabled.includes(item.value) ? {} : handleChange(item.value, index))}
        >
          {item.label}
        </li>
      ))}
    </ul>
  )
}

export default memo(SelectButtons)
