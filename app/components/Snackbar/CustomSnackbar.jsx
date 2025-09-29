/** @format */

"use client";

import React from "react";
import { Snackbar, styled, alpha } from "@mui/material";

// Styled Snackbar component that inherits the beautiful styling from ModernTooltip
const StyledSnackbar = styled(Snackbar)(({ theme, variant = "default" }) => {
    const getVariantStyles = () => {
        switch (variant) {
            case "premium":
                return {
                    background:
                        theme.palette.mode === "dark"
                            ? "linear-gradient(135deg, rgba(124, 58, 237, 0.95), rgba(59, 130, 246, 0.95))"
                            : "linear-gradient(135deg, rgba(37, 99, 235, 0.95), rgba(6, 182, 212, 0.95))",
                    border: `1px solid ${
                        theme.palette.mode === "dark"
                            ? "rgba(124, 58, 237, 0.3)"
                            : "rgba(37, 99, 235, 0.3)"
                    }`,
                    boxShadow:
                        theme.palette.mode === "dark"
                            ? "0 8px 32px rgba(124, 58, 237, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)"
                            : "0 8px 32px rgba(37, 99, 235, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.8)",
                };
            case "success":
                return {
                    background: `linear-gradient(135deg, ${alpha(
                        theme.palette.success.main,
                        0.95
                    )}, ${alpha(
                        theme.palette.success.light || "#4ADE80",
                        0.95
                    )})`,
                    border: `1px solid ${alpha(
                        theme.palette.success.main,
                        0.3
                    )}`,
                    boxShadow: `0 8px 32px ${alpha(
                        theme.palette.success.main,
                        0.4
                    )}`,
                };
            case "warning":
                return {
                    background: `linear-gradient(135deg, ${alpha(
                        theme.palette.warning.main,
                        0.95
                    )}, ${alpha(
                        theme.palette.warning.light || "#FCD34D",
                        0.95
                    )})`,
                    border: `1px solid ${alpha(
                        theme.palette.warning.main,
                        0.3
                    )}`,
                    boxShadow: `0 8px 32px ${alpha(
                        theme.palette.warning.main,
                        0.4
                    )}`,
                };
            case "error":
                return {
                    background: `linear-gradient(135deg, ${alpha(
                        theme.palette.error.main,
                        0.95
                    )}, ${alpha(
                        theme.palette.error.light || "#F87171",
                        0.95
                    )})`,
                    border: `1px solid ${alpha(theme.palette.error.main, 0.3)}`,
                    boxShadow: `0 8px 32px ${alpha(
                        theme.palette.error.main,
                        0.4
                    )}`,
                };
            case "info":
                return {
                    background: `linear-gradient(135deg, ${alpha(
                        theme.palette.info.main,
                        0.95
                    )}, ${alpha(theme.palette.info.light || "#38BDF8", 0.95)})`,
                    border: `1px solid ${alpha(theme.palette.info.main, 0.3)}`,
                    boxShadow: `0 8px 32px ${alpha(
                        theme.palette.info.main,
                        0.4
                    )}`,
                };
            case "glass":
                return {
                    background:
                        theme.palette.mode === "dark"
                            ? "rgba(18, 21, 27, 0.95)"
                            : "rgba(255, 255, 255, 0.95)",
                    border:
                        theme.palette.mode === "dark"
                            ? "1px solid rgba(255, 255, 255, 0.1)"
                            : "1px solid rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(20px)",
                    boxShadow:
                        theme.palette.mode === "dark"
                            ? "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                            : "0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
                };
            default:
                return {
                    background:
                        theme.palette.mode === "dark"
                            ? "rgba(18, 21, 27, 0.98)"
                            : "rgba(255, 255, 255, 0.98)",
                    border:
                        theme.palette.mode === "dark"
                            ? "1px solid rgba(255, 255, 255, 0.06)"
                            : "1px solid rgba(0, 0, 0, 0.06)",
                    boxShadow:
                        theme.palette.mode === "dark"
                            ? "0 8px 25px rgba(0, 0, 0, 0.4)"
                            : "0 8px 25px rgba(0, 0, 0, 0.15)",
                };
        }
    };

    return {
        "& .MuiSnackbarContent-root": {
            ...getVariantStyles(),
            backdropFilter: variant !== "glass" ? "blur(12px)" : "blur(20px)",
            borderRadius: 12,
            padding: "12px 24px",
            fontSize: "0.875rem",
            fontWeight: 500,
            fontFamily: '"Inter", sans-serif',
            lineHeight: 1.4,
            letterSpacing: "0.01em",
            color:
                theme.palette.mode === "dark"
                    ? "#FFFFFF"
                    : ["warning", "info"].includes(variant)
                    ? "#FFFFFF"
                    : "#1F2937",
            maxWidth: 400,
            minWidth: "auto",
            margin: 0,
            animation: "slideIn 0.3s forwards",
        },
        "@keyframes slideIn": {
            from: {
                transform: "translateX(100%)",
                opacity: 0,
            },
            to: {
                transform: "translateX(0)",
                opacity: 1,
            },
        },
        "@keyframes slideOut": {
            from: {
                transform: "translateX(0)",
                opacity: 1,
            },
            to: {
                transform: "translateX(100%)",
                opacity: 0,
            },
        },
        "& .MuiSnackbarContent-root.MuiSnackbar-exiting": {
            animation: "slideOut 0.3s forwards",
        },
    };
});

// Main Snackbar Component with hooks for global management
export const useSnackbar = () => {
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [variant, setVariant] = React.useState("default");

    const showSnackbar = (newMessage, newVariant = "default") => {
        setMessage(newMessage);
        setVariant(newVariant);
        setOpen(true);
    };

    const hideSnackbar = () => {
        setOpen(false);
    };

    return {
        open,
        message,
        variant,
        showSnackbar,
        hideSnackbar,
    };
};

// Predefined Snackbar variants
export const showSuccessSnackbar = (message, snackbar) =>
    snackbar.showSnackbar(message, "success");
export const showErrorSnackbar = (message, snackbar) =>
    snackbar.showSnackbar(message, "error");
export const showInfoSnackbar = (message, snackbar) =>
    snackbar.showSnackbar(message, "info");
export const showWarningSnackbar = (message, snackbar) =>
    snackbar.showSnackbar(message, "warning");

const CustomSnackbar = ({
    open,
    message,
    variant = "default",
    onClose,
    ...props
}) => {
    return (
        <StyledSnackbar
            open={open}
            onClose={onClose}
            message={message}
            variant={variant}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            autoHideDuration={4000}
            sx={{
                bottom: "24px !important",
                right: "24px !important",
            }}
            {...props}
        />
    );
};

export default CustomSnackbar;
