/** @format */

import React from "react";
import { useThemeMode } from "../../../lib/ThemeContext";
import IconButton from "@mui/material/IconButton";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function ThemeToggleButton() {
    const { theme, toggleTheme } = useThemeMode();
    const isDark = theme.palette.mode === "dark";
    return (
        <IconButton
            onClick={toggleTheme}
            aria-label='Toggle theme'
            sx={{
                backgroundColor:
                    theme.palette.mode === "dark"
                        ? "rgba(59, 130, 246, 0.1)"
                        : "rgba(37, 99, 235, 0.1)",
                borderRadius: 2,
                transition: "all 0.2s ease-in-out",
                color:
                    theme.palette.mode === "dark"
                        ? theme.palette.primary.light
                        : theme.palette.primary.main,
                "&:hover": {
                    backgroundColor:
                        theme.palette.mode === "dark"
                            ? "rgba(59, 130, 246, 0.2)"
                            : "rgba(37, 99, 235, 0.15)",
                    transform: "translateY(-2px)",
                    boxShadow:
                        theme.palette.mode === "dark"
                            ? "0 4px 12px rgba(59, 130, 246, 0.2)"
                            : "0 4px 12px rgba(37, 99, 235, 0.15)",
                },
                padding: 1.2,
            }}>
            {isDark ? (
                <LightModeIcon sx={{ fontSize: "1.5rem" }} />
            ) : (
                <DarkModeIcon sx={{ fontSize: "1.5rem" }} />
            )}
        </IconButton>
    );
}
