/** @format */

import ThemeRegistry from "./components/core/ThemeRegistry";
import { ThemeProvider } from "../lib/ThemeContext";
import { SnackbarProvider } from "./components/Snackbar/SnackbarProvider";
import Navbar from "./components/core/Navbar";
import Box from "@mui/material/Box";
import "./globals.css";

export const metadata = {
    title: "PostFlow",
    description: "A modern social media app UI",
};

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body>
                <ThemeProvider>
                    <ThemeRegistry>
                        <SnackbarProvider>
                            <Navbar />
                            <Box
                                component='main'
                                sx={{
                                    pt: { xs: 8, sm: 10 },
                                    p: { xs: 2, sm: 3 },
                                    mt: 8,
                                }}>
                                {children}
                            </Box>
                        </SnackbarProvider>
                    </ThemeRegistry>
                </ThemeProvider>
            </body>
        </html>
    );
}
