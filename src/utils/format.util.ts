export const formatNormalTextToSnakeCase = (text: string = ''): string => {
  return text.trim().toLowerCase().split(/\s+/).join('_')
}