import dayjs from 'dayjs'

export const validacionFecha = (fecha) => {
  return dayjs(fecha).isBefore(dayjs('2030-01-01'))
}
