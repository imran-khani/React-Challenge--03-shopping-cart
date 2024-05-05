import { createContext, useEffect, useState } from "react";


const initialValues = {
    theme: 'light',
    onToggle: () => { }
}

export const ThemeContext = createContext(initialValues)

export const ThemeProvider = ({ children }: any) => {

    const [theme, setTheme] = useState('light')

    const onToggle = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
    }

    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove('light', 'dark')
        root.classList.add(theme)
    }, [theme])

    const ContextValues = {
        theme,
        onToggle
    }

    return (
        <ThemeContext.Provider value={ContextValues}>
            {children}
        </ThemeContext.Provider>
    )

}