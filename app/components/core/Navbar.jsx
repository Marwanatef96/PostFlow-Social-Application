/** @format */
"use client";

import * as React from "react";
// import removed: theme from "../../          <AppBar

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import ForumIcon from "@mui/icons-material/Forum";
import Link from "next/link";
import { useAuth, getToken } from "../../lib/hooks/useAuth";
import { useThemeMode } from "../../../lib/ThemeContext"; // Updated import
import dynamic from "next/dynamic";
import { useSnackbarContext } from "../Snackbar/SnackbarProvider";
import NoSsr from "@mui/material/NoSsr";
import ThemeToggleButton from "./ThemeToggleButton";

const LoginModal = dynamic(() => import("../Auth/LoginModal"), { ssr: false });
const RegisterModal = dynamic(() => import("../Auth/RegisterModal"), {
    ssr: false,
});

function Navbar() {
    const { user, logout } = useAuth();
    const { showSnackbar } = useSnackbarContext();
    const { theme } = useThemeMode();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
    const handleCloseNavMenu = () => setAnchorElNav(null);
    const navPages = user
        ? [
              { name: "Home", path: "/" },
              { name: "Profile", path: `/profile/${user?.id}` },
          ]
        : [{ name: "Home", path: "/" }];

    const toSrc = (value) =>
        typeof value === "string" ? value : value?.url ? value.url : "";

    return (
        <AppBar
            position='fixed'
            sx={{
                background:
                    theme.palette.mode === "dark"
                        ? "rgba(30, 41, 59, 0.8)"
                        : "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
                borderBottom: `1px solid ${theme.palette.divider}`,
                boxShadow:
                    theme.palette.mode === "dark"
                        ? "0 4px 20px rgba(0, 0, 0, 0.2)"
                        : "0 4px 20px rgba(0, 0, 0, 0.05)",
                transition: "all 0.3s ease-in-out",
            }}>
            <Container maxWidth='xl'>
                <Toolbar
                    disableGutters
                    sx={{ minHeight: "64px", transition: "var(--transition)" }}>
                    <Box
                        sx={{
                            display: { xs: "none", md: "flex" },
                            alignItems: "center",
                            gap: 1,
                        }}>
                        <ForumIcon
                            sx={{
                                fontSize: "2rem",
                                color: theme.palette.primary.main,
                                filter:
                                    theme.palette.mode === "dark"
                                        ? "drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))"
                                        : "drop-shadow(0 0 8px rgba(59, 130, 246, 0.2))",
                            }}
                        />
                        <Typography
                            variant='h6'
                            noWrap
                            component={Link}
                            href='/'
                            sx={{
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 800,
                                fontSize: "1.5rem",
                                letterSpacing: "0.01em",
                                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                color: "transparent",
                                textDecoration: "none",
                                transition: "all 0.3s ease-in-out",
                                "&:hover": {
                                    transform: "scale(1.05)",
                                },
                            }}>
                            PostFlow
                        </Typography>
                    </Box>
                    <NoSsr>
                        <Box sx={{ ml: 2 }}>
                            <ThemeToggleButton />
                        </Box>
                    </NoSsr>
                    {/* Mobile Menu */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}>
                        <IconButton
                            size='large'
                            aria-label='menu'
                            aria-controls='menu-appbar'
                            aria-haspopup='true'
                            onClick={handleOpenNavMenu}
                            color='inherit'>
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id='menu-appbar'
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: "block", md: "none" } }}>
                            {navPages.map((page) => (
                                <MenuItem
                                    key={page.name}
                                    onClick={handleCloseNavMenu}
                                    component={Link}
                                    href={page.path}>
                                    <Typography textAlign='center'>
                                        {page.name}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    {/* Desktop menu */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                            justifyContent: "center",
                            gap: 2,
                        }}>
                        {navPages.map((page) => (
                            <Button
                                key={page.name}
                                component={Link}
                                href={page.path}
                                sx={{
                                    px: 3,
                                    py: 1,
                                    color: theme.palette.text.primary,
                                    fontWeight: 600,
                                    borderRadius: 2,
                                    transition: "all 0.2s ease-in-out",
                                    position: "relative",
                                    overflow: "hidden",
                                    "&:before": {
                                        content: '""',
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        background: theme.palette.primary.main,
                                        opacity: 0,
                                        transition: "opacity 0.2s ease-in-out",
                                        zIndex: -1,
                                    },
                                    "&:hover": {
                                        color: theme.palette.primary.main,
                                        transform: "translateY(-2px)",
                                        "&:before": {
                                            opacity: 0.1,
                                        },
                                    },
                                    "&.active": {
                                        color: theme.palette.primary.main,
                                        "&:before": {
                                            opacity: 0.1,
                                        },
                                    },
                                }}>
                                {page.name}
                            </Button>
                        ))}
                    </Box>
                    {/* Right Section */}
                    <Box
                        sx={{
                            flexGrow: 0,
                            display: "flex",
                            alignItems: "center",
                        }}>
                        <NoSsr>
                            {user ? (
                                <>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            mr: 3,
                                            background:
                                                theme.palette.mode === "dark"
                                                    ? "rgba(30, 41, 59, 0.4)"
                                                    : "rgba(37, 99, 235, 0.1)",
                                            borderRadius: 3,
                                            padding: "8px 16px",
                                            border: `1px solid ${theme.palette.divider}`,
                                            boxShadow:
                                                theme.palette.mode === "dark"
                                                    ? "none"
                                                    : "0 2px 8px rgba(37, 99, 235, 0.1)",
                                        }}>
                                        <Avatar
                                            alt={user.name || user.username}
                                            src={toSrc(user.profile_image)}
                                            sx={{
                                                mr: 2,
                                                width: 40,
                                                height: 40,
                                                border: `2px solid ${theme.palette.primary.main}`,
                                                boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
                                                bgcolor:
                                                    theme.palette.primary.main +
                                                    "20",
                                            }}
                                        />
                                        <Typography
                                            sx={{
                                                fontWeight: 600,
                                                color:
                                                    theme.palette.mode ===
                                                    "dark"
                                                        ? theme.palette.text
                                                              .primary
                                                        : theme.palette.primary
                                                              .dark,
                                                fontSize: {
                                                    xs: "0.9rem",
                                                    md: "1rem",
                                                },
                                            }}>
                                            {user.name || user.username}
                                        </Typography>
                                    </Box>
                                    <Button
                                        variant='contained'
                                        onClick={() => {
                                            logout();
                                            showSnackbar(
                                                "Successfully logged out",
                                                "success"
                                            );
                                        }}
                                        sx={{
                                            background:
                                                theme.palette.mode === "dark"
                                                    ? "rgba(239, 68, 68, 0.2)"
                                                    : "rgba(239, 68, 68, 0.15)",
                                            color: theme.palette.error.main,
                                            fontWeight: 600,
                                            borderRadius: 2,
                                            px: 3,
                                            border: `1px solid ${theme.palette.error.main}30`,
                                            "&:hover": {
                                                background:
                                                    theme.palette.error.main,
                                                color: "#fff",
                                                transform: "translateY(-2px)",
                                                boxShadow:
                                                    "0 4px 12px rgba(239, 68, 68, 0.3)",
                                            },
                                        }}>
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: 2,
                                        alignItems: "center",
                                    }}>
                                    <LoginModal>
                                        <Button
                                            variant='outlined'
                                            sx={{
                                                borderColor:
                                                    theme.palette.primary.main,
                                                color: theme.palette.primary
                                                    .main,
                                                fontWeight: 600,
                                                px: 3,
                                                borderRadius: 2,
                                                "&:hover": {
                                                    borderColor:
                                                        theme.palette.primary
                                                            .dark,
                                                    background:
                                                        theme.palette.primary
                                                            .main + "10",
                                                    transform:
                                                        "translateY(-1px)",
                                                },
                                            }}>
                                            Login
                                        </Button>
                                    </LoginModal>
                                    <RegisterModal>
                                        <Button
                                            variant='contained'
                                            sx={{
                                                fontWeight: 600,
                                                px: 3,
                                                borderRadius: 2,
                                            }}>
                                            Register
                                        </Button>
                                    </RegisterModal>
                                </Box>
                            )}
                        </NoSsr>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;
