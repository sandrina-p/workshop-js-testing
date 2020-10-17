export function linkTo(setLocation, path) {
  return {
    href: path,
    onClick: e => {
      e.preventDefault()
      setLocation(path)
    },
  }
}
