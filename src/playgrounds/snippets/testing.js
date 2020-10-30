/**
 * Query function that looks for text broken in multiple elements
 * @link https://www.polvara.me/posts/five-things-you-didnt-know-about-testing-library/ Queries are functions too
 * @param {String} text
 * @example
 * <p>Hello <span>world!</span></p>
 * hasTextNode('Hello world') will match!
 */
export const hasTextNode = text => (content, node) => {
  const hasText = node => node.textContent === text
  const nodeHasText = hasText(node)
  const childrenDontHaveText = Array.from(node.children).every(
    child => !hasText(child)
  )

  return nodeHasText && childrenDontHaveText
}
