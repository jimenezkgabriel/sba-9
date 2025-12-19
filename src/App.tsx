import { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'

import Dashboard from "./components/Dashboard/Dashboard"

function App() {
  const [theme, setTheme] = useState('')

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  })

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
  })

  const toggleTheme = (str: string) => {
    setTheme(str === 'light' ? 'dark' : 'light')
  }

  return (
    <>
      <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
        <Dashboard onThemeChange={toggleTheme} />
      </ThemeProvider>
    </>
  )
}

export default App
