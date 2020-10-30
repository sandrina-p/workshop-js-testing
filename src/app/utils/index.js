export function linkTo(setLocation, path) {
  return {
    href: path,
    onClick: e => {
      e.preventDefault()
      window.scroll(0, 0)
      setLocation(path)
    },
  }
}
