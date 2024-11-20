// src/context/ThemeContext.ts

import { createContext, useContext } from "react";

// Define possible theme types
export type Theme = "light" | "dark";

// Define the structure of the context value
export interface ThemeContextProps {
    theme: Theme;
    toggleTheme: () => void;
}

// Create the Theme context with a default value of undefined
export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// Custom hook to access the theme and toggle function
export const useTheme = (): ThemeContextProps => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
