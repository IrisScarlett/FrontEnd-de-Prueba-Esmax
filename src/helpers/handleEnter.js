export const handleEnter = (e) => {
  if (e.key.toLowerCase() === 'enter') {
    e.preventDefault()
    const form = e.target.form
    const index = [...form].indexOf(e.target)
    form.elements[index + 1].focus()
    form.elements[index + 1].select()
  }
}
export const handleEnter2 = (e) => {
  if (e.key.toLowerCase() === 'enter') {
    e.preventDefault()
    const form = e.target.form
    const index = [...form].indexOf(e.target)
    form.elements[index + 2].focus()
    form.elements[index + 2].select()
  }
}
