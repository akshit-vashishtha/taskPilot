import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Load theme preference from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark')
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDarkMode(prefersDark)
    }
  }, [])

  // Apply theme to document and save to localStorage
  useEffect(() => {
    console.log('Theme effect running, isDarkMode:', isDarkMode)
    const htmlElement = document.documentElement
    
    if (isDarkMode) {
      htmlElement.classList.add('dark')
      htmlElement.style.colorScheme = 'dark'
      document.body.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      console.log('Added dark class to document and body')
    } else {
      htmlElement.classList.remove('dark')
      htmlElement.style.colorScheme = 'light'
      document.body.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      console.log('Removed dark class from document and body')
    }
    
    // Force a style recalculation
    document.body.style.display = 'none'
    document.body.offsetHeight // Trigger reflow
    document.body.style.display = ''
  }, [isDarkMode])

  const toggleTheme = () => {
    console.log('Toggling theme, current isDarkMode:', isDarkMode)
    setIsDarkMode(prev => {
      console.log('Setting isDarkMode to:', !prev)
      return !prev
    })
  }

  const value = {
    isDarkMode,
    toggleTheme,
    theme: isDarkMode ? 'dark' : 'light'
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}