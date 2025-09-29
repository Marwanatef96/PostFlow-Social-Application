/** @format */

"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { lightTheme, darkTheme } from "../src/styles/theme";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(lightTheme);
    useEffect(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("theme");
            if (stored === "dark") {
                setTheme(darkTheme);
                document.documentElement.setAttribute("data-theme", "dark");
            } else {
                setTheme(lightTheme);
                document.documentElement.setAttribute("data-theme", "light");
            }
        }
    }, []);
    useEffect(() => {
        if (typeof document !== "undefined") {
            document.documentElement.setAttribute(
                "data-theme",
                theme === darkTheme ? "dark" : "light"
            );
            if (typeof window !== "undefined") {
                localStorage.setItem(
                    "theme",
                    theme === darkTheme ? "dark" : "light"
                );
            }
        }
    }, [theme]);
    const toggleTheme = () => {
        setTheme((prev) => (prev === lightTheme ? darkTheme : lightTheme));
    };
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useThemeMode() {
    return useContext(ThemeContext);
}
