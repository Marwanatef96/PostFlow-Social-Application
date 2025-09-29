/** @format */

"use client";

import React, { createContext, useContext } from "react";
import CustomSnackbar, { useSnackbar } from "./CustomSnackbar";

const SnackbarContext = createContext(null);

export function SnackbarProvider({ children }) {
    const snackbar = useSnackbar();

    return (
        <SnackbarContext.Provider value={snackbar}>
            {children}
            <CustomSnackbar
                open={snackbar.open}
                message={snackbar.message}
                variant={snackbar.variant}
                onClose={snackbar.hideSnackbar}
            />
        </SnackbarContext.Provider>
    );
}

export const useSnackbarContext = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error(
            "useSnackbarContext must be used within a SnackbarProvider"
        );
    }
    return context;
};
