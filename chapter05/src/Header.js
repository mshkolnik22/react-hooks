import React, { useContext } from 'react'
import { ThemeContext } from './contexts'

const Header = ({ text }) => {
  const { secondaryColor } = useContext(ThemeContext)

  return <h1 style={{ color: secondaryColor }}>{text}</h1>
}

export default Header