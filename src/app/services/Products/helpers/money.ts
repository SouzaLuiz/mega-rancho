export function numberForMoney (value: number) {
  return Intl.NumberFormat('pt-BR',
    { style: 'currency', currency: 'BRL' }
  ).format(value)
}
