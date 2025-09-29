/** @format */

import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

export default function DeletePostConfirmModal({
    open,
    onClose,
    onConfirm,
    loading,
}) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    boxShadow: (theme) =>
                        theme.palette.mode === "dark"
                            ? "0 8px 32px rgba(0, 0, 0, 0.4)"
                            : "0 8px 32px rgba(0, 0, 0, 0.1)",
                    bgcolor: (theme) =>
                        theme.palette.mode === "dark"
                            ? "rgba(30, 41, 59, 0.8)"
                            : "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(10px)",
                },
            }}>
            <DialogTitle
                sx={{
                    pt: 3,
                    px: 4,
                    pb: 2,
                    color: (theme) => theme.palette.error.main,
                    fontWeight: 700,
                    fontSize: "1.5rem",
                }}>
                Delete Post
            </DialogTitle>
            <DialogContent sx={{ px: 4, py: 2 }}>
                <DialogContentText
                    sx={{
                        color: (theme) => theme.palette.text.primary,
                        fontSize: "1rem",
                        lineHeight: 1.6,
                    }}>
                    Are you sure you want to delete this post? This action
                    cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions
                sx={{
                    px: 4,
                    py: 3,
                    gap: 2,
                }}>
                <Button
                    onClick={onClose}
                    disabled={loading}
                    sx={{
                        px: 3,
                        py: 1,
                        borderRadius: 2,
                        fontWeight: 600,
                        color: (theme) => theme.palette.text.primary,
                        bgcolor: (theme) =>
                            theme.palette.mode === "dark"
                                ? "rgba(148, 163, 184, 0.1)"
                                : "rgba(241, 245, 249, 0.8)",
                        "&:hover": {
                            bgcolor: (theme) =>
                                theme.palette.mode === "dark"
                                    ? "rgba(148, 163, 184, 0.2)"
                                    : "rgba(241, 245, 249, 1)",
                            transform: "translateY(-1px)",
                        },
                    }}>
                    Cancel
                </Button>
                <Button
                    onClick={onConfirm}
                    disabled={loading}
                    sx={{
                        px: 3,
                        py: 1,
                        borderRadius: 2,
                        fontWeight: 600,
                        bgcolor: (theme) => theme.palette.error.main,
                        color: "#fff",
                        "&:hover": {
                            bgcolor: (theme) => theme.palette.error.dark,
                            transform: "translateY(-1px)",
                        },
                        "&:disabled": {
                            bgcolor: (theme) => theme.palette.error.main + "80",
                            color: "#fff",
                        },
                    }}>
                    {loading ? "Deleting..." : "Delete"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
