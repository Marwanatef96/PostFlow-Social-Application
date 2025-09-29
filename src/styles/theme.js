/** @format */

import { createTheme } from "@mui/material/styles";

export const baseThemeOptions = {
    shape: {
        borderRadius: 16,
    },
    typography: {
        fontFamily: "Inter, 'Segoe UI', Arial, sans-serif",
        h1: {
            fontSize: "2.5rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
        },
        h2: {
            fontSize: "2.25rem",
            fontWeight: 700,
            letterSpacing: "-0.01em",
            lineHeight: 1.3,
        },
        h3: {
            fontSize: "2rem",
            fontWeight: 600,
            letterSpacing: "-0.01em",
            lineHeight: 1.4,
        },
        h4: {
            fontSize: "1.75rem",
            fontWeight: 600,
            lineHeight: 1.4,
        },
        h5: {
            fontSize: "1.5rem",
            fontWeight: 600,
            lineHeight: 1.5,
        },
        h6: {
            fontSize: "1.25rem",
            fontWeight: 600,
            lineHeight: 1.5,
        },
        body1: {
            fontSize: "1rem",
            lineHeight: 1.6,
            letterSpacing: "0.01em",
        },
        body2: {
            fontSize: "0.875rem",
            lineHeight: 1.6,
            letterSpacing: "0.01em",
        },
        button: {
            textTransform: "none",
            fontWeight: 600,
        },
    },
    spacing: 8,
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: "8px 16px",
                    fontWeight: 600,
                    boxShadow: "none",
                    transition: "background-color 0.2s ease-in-out",
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
            },
        },
    },
};

export const lightTheme = createTheme({
    ...baseThemeOptions,
    palette: {
        mode: "light",
        primary: {
            main: "#2563eb",
            light: "#60a5fa",
            dark: "#1d4ed8",
        },
        secondary: {
            main: "#f97316",
            light: "#fb923c",
            dark: "#ea580c",
        },
        background: {
            default: "#f8fafc",
            paper: "#ffffff",
        },
        divider: "#e2e8f0",
        text: {
            primary: "#1e293b",
            secondary: "#475569",
        },
        success: {
            main: "#059669",
        },
        error: {
            main: "#dc2626",
        },
        warning: {
            main: "#d97706",
        },
        info: {
            main: "#0284c7",
        },
    },
});

export const darkTheme = createTheme({
    ...baseThemeOptions,
    palette: {
        mode: "dark",
        primary: {
            main: "#3b82f6",
            light: "#60a5fa",
            dark: "#2563eb",
        },
        secondary: {
            main: "#f97316",
            light: "#fb923c",
            dark: "#ea580c",
        },
        background: {
            default: "#0f172a",
            paper: "#1e293b",
        },
        divider: "#334155",
        text: {
            primary: "#f8fafc",
            secondary: "#cbd5e1",
        },
        success: {
            main: "#22c55e",
        },
        error: {
            main: "#ef4444",
        },
        warning: {
            main: "#f59e0b",
        },
        info: {
            main: "#0ea5e9",
        },
    },
});
