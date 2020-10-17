import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Root from '../Root'

it('should render as expected', () => {
  render(<Root />)
  expect(screen.getByText('Hello human 👋')).toBeInTheDocument()
})
