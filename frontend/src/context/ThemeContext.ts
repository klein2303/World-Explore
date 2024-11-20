import { createContext, useContext } from "react";

// Define the possible theme values
export type Theme = "light" | "dark";

// Define the shape of the theme context
export interface ThemeContextProps {
    theme: Theme;
    toggleTheme: () => void;
}

// Create the ThemeContext with an undefined default value
export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// Custom hook to use the ThemeContext
export const useTheme = (): ThemeContextProps => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};