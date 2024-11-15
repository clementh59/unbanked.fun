export const onMouseDown = (event: React.MouseEvent, ref: React.RefObject<HTMLElement>) => {
  event.preventDefault()

  if (ref.current) {
    const startX = event.pageX - ref.current.offsetLeft
    const scrollLeft = ref.current.scrollLeft

    const onMouseMove = (moveEvent: MouseEvent) => {
      const x = moveEvent.pageX - ref.current!.offsetLeft
      const walk = (x - startX) * 2
      ref.current!.scrollLeft = scrollLeft - walk
    }

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }
}
