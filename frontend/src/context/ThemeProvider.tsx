import { useState, useEffect } from "react";
import { ThemeContext, Theme } from "./ThemeContext";

// ThemeProvider component to manage and provide theme context
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // State to hold the current theme, initialized to null
    const [theme, setTheme] = useState<Theme | null>(null);

    // Effect to load the theme from localStorage when the component mounts
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as Theme;
        setTheme(savedTheme || "light");
    }, []);

    // Effect to apply the theme to the body element and save it to localStorage whenever the theme changes
    useEffect(() => {
        if (theme) {
            document.body.setAttribute("data-theme", theme);
            localStorage.setItem("theme", theme);
        }
    }, [theme]);

    // Function to toggle the theme between light and dark
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    // Render nothing while determining the theme
    if (!theme) return null;

    // Provide the theme and toggleTheme function to the context
    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
