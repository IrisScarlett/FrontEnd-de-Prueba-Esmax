import Swal from 'sweetalert2'

export const alertSwal = (ok, msg, timer = 1500) => {
  ok
    ? Swal.fire({
      position: 'center',
      icon: 'success',
      title: msg,
      showConfirmButton: false,
      timer: 1500
    })
    : Swal.fire({
      position: 'center',
      icon: 'error',
      title: msg,
      showConfirmButton: false,
      timer
    })
}
