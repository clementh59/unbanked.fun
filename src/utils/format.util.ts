export const formatNormalTextToSnakeCase = (text: string = ''): string => {
  return text.trim().toLowerCase().split(/\s+/).join('_')
}

export const formatMoneyToNumber = (money: string | number): number => {
  if (typeof money === 'string') {
      return parseFloat(money.replace(/[^0-9.-]+/g, ''));
  }
  return money;
};