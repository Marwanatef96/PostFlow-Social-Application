/** @format */

"use client";
import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { useThemeMode } from "../../../lib/ThemeContext";
import CssBaseline from "@mui/material/CssBaseline";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { SWRConfig } from "swr";
import { fetcher } from "../../lib/fetcher";

export default function ThemeRegistry({ children }) {
    const { theme } = useThemeMode();
    return (
        <AppRouterCacheProvider options={{ key: "mui" }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <SWRConfig
                    value={{
                        fetcher,
                        revalidateOnFocus: true,
                        dedupingInterval: 2000,
                    }}>
                    {children}
                </SWRConfig>
            </ThemeProvider>
        </AppRouterCacheProvider>
    );
}
