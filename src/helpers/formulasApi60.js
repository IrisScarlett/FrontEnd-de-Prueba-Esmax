/* eslint-disable camelcase */
export const api60factor6 = (apiObs, tempObs, tempInt) => {
  const D = tempObs - 60 // celda C8
  const CH = 1 - (1.278 * D) / Math.pow(10, 5) // Celda C9
  const R = (141.5 * 999.012) / (131.5 + apiObs) // Celda C10
  const K = CH * R // Celda C11

  const R6 = K // innecesario? Celda C12
  const K0 = 103.872 // Celda C13
  const K0_b = 330.301 // Celda D13
  const K0_c = 192.4171 // Celda E13
  const K1 = 0.2701 // Celda C14
  // eslint-disable-next-line no-unused-vars
  const K1_b = 0 // Celda D14
  const K1_c = 0.2438 // Celda E14
  const A = K0 / (R6 * R6) + K1 / R6 // Celda C15
  const A_b = K0_b / (R6 * R6) // Celda D15
  const A_c = K0_c / (R6 * R6) + K1_c / R6 // Celda E15
  const A_d = -0.0018684 + 1489.067 / (R6 * R6) // Celda F15
  const FC = Math.exp(-A * D * (1 + 0.8 * A * D)) // Celda C16

  const FC_b = Math.exp(-A_b * D * (1 + 0.8 * A_b * D)) // Celda D16
  const FC_c = Math.exp(-A_c * D * (1 + 0.8 * A_c * D)) // Celda E16
  const FC_d = Math.exp(-A_d * D * (1 + 0.8 * A_d * D)) // Celda F16
  const T = K / FC // Celda C17

  const T_b = K / FC_b // Celda D17
  const T_c = K / FC_c // Celda E17
  const T_d = K / FC_d // Celda F17
  const AP = (141360.198 / T) - 131.5 // Celda C18
  const AP_b = (141360.198 / T_b) - 131.5 // Celda D18
  const AP_c = (141360.198 / T_c) - 131.5 // Celda E18
  const AP_d = (141360.198 / T_d) - 131.5 // Celda F18 (141360.198/F$17)-131.5

  const API60 = () => {
    if (apiObs < 48) {
      if (apiObs > 0) {
        if (apiObs <= 37) {
          return AP
        } else {
          return AP_b
        }
      } else {
        console.log('error')
      }
    } else {
      if (apiObs > 52) {
        if (apiObs < 85) {
          return AP_c
        } else {
          console.log('error')
        }
      } else {
        return AP_d
      }
    }
  }
  const apiTabla = () => {
    if (RB < 0.59) {
      return Math.floor(API60())
    } else {
      if (RB > 1.5) {
        return Math.floor(API60()) + 1
      } else {
        return Math.floor(API60()) + 0.5
      }
    }
  }

  const RB = (API60() - Math.floor(API60())) / 0.5
  const DB = tempInt - 60
  const S = (141.5 * 999.012) / (131.5 + apiTabla())
  const I = (192.4571 / S / S) + (0.2438 / S)
  const I_b = (1489.067 / S / S) - 0.0018684
  const I_c = (330.301 / S / S)
  const I_d = (103.872 / S / S) + (0.2701 / S)
  const FCB = Math.exp(-I * DB * (1 + 0.8 * I * DB))
  const FCB_b = Math.exp(-I_b * DB * (1 + 0.8 * I_b * DB))
  const FCB_c = Math.exp(-I_c * DB * (1 + 0.8 * I_c * DB))
  const FCB_d = Math.exp(-I_d * DB * (1 + 0.8 * I_d * DB))
  const factor = () => {
    if (S <= 771) {
      return FCB
    } else {
      if (S <= 778.5) {
        return FCB_b
      } else {
        if (S <= 840) {
          return FCB_c
        } else {
          return FCB_d
        }
      }
    }
  }
  return {
    factor6: (Math.round((factor() + Number.EPSILON) * 10000) / 10000)?.toFixed(4),
    api60: API60()?.toFixed(1)
  }
}

export const volumen60 = (vol, factor6) => {
  return Math.round(vol * factor6)
}
export const calcKilos = (vol, factor6, factor13) => {
  return Math.round(vol * factor6 * factor13)
}
