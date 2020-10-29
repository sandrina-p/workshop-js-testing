export function verifyMovieBeforeNavigate(e, id) {
  e.preventDefault()

  if (id > 100) {
    window.localStorage.setItem(
      'superMovie',
      JSON.stringify({ id, timestamp: Date.now() })
    )
  }

  window.location.assign(`//movies-page.com/movies/${id}`)
}

// BONUS #1
export function createProfile(name, age) {
  console.log(`:: createProfile - Creating profile ${name}...`)

  if (typeof age !== 'number') {
    console.warn(':: createProfile - Age must be a number')
    return
  }

  return { name, age }
}
