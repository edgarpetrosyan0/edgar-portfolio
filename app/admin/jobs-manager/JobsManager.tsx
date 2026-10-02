"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Typography,
  Box,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

type Job = {
  title: string;
  period: string;
  points: string[];
  stack: string[];
};

type Props = {
  jobs: Job[];
  onChange: (jobs: Job[]) => void;
  password: string;
};

const createEmptyJob = (): Job => ({
  title: "",
  period: "",
  points: [],
  stack: [],
});

const colors = {
  bg: "#09060a",
  surface: "#130c10",
  surface2: "#1b1116",
  line: "#2e1c23",
  ink: "#f7f0f2",
  muted: "#aa9ba2",
  red: "#ff4d5e",
  crimson: "#e11d48",
  wine: "#a3154f",
  softInk: "#d3c6cb",
  dim: "#7f7077",
};

export default function JobsManager({
  jobs,
  onChange,
  password,
}: Props) {
  const [open, setOpen] = useState(false);

  const [editingIndex, setEditingIndex] =
    useState<number | null>(null);

  const [form, setForm] =
    useState<Job>(createEmptyJob());

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] =
    useState<number | null>(null);

  // =========================
  // Add / Edit
  // =========================

  function openAdd() {
    setEditingIndex(null);
    setForm(createEmptyJob());
    setError("");
    setOpen(true);
  }

  function openEdit(index: number) {
    const job = jobs[index];

    setEditingIndex(index);

    setForm({
      ...job,
      points: [...job.points],
      stack: [...job.stack],
    });

    setError("");
    setOpen(true);
  }

  function closeFormDialog() {
    if (!saving) {
      setOpen(false);
      setError("");
    }
  }

  // =========================
  // API
  // =========================

  async function saveJobs(nextJobs: Job[]) {
    const res = await fetch("/api/portfolio", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": password,
      },
      body: JSON.stringify({
        jobs: nextJobs,
      }),
    });

    if (!res.ok) {
      const responseText = await res.text();

      console.error("Save jobs API error:", responseText);

      throw new Error("Failed to save jobs");
    }
  }

  // =========================
  // Save
  // =========================

  async function handleSave() {
    if (!form.title.trim()) {
      setError("Job title is required");
      return;
    }

    const normalizedJob: Job = {
      title: form.title.trim(),

      period: form.period.trim(),

      points: form.points
        .map((point) => point.trim())
        .filter(Boolean),

      stack: form.stack
        .map((item) => item.trim())
        .filter(Boolean),
    };

    let nextJobs: Job[];

    if (editingIndex === null) {
      nextJobs = [normalizedJob, ...jobs];
    } else {
      nextJobs = [...jobs];
      nextJobs[editingIndex] = normalizedJob;
    }

    try {
      setSaving(true);
      setError("");

      await saveJobs(nextJobs);

      onChange(nextJobs);

      setOpen(false);
    } catch (error) {
      console.error(error);
      setError("Failed to save changes");
    } finally {
      setSaving(false);
    }
  }

  // =========================
  // Delete
  // =========================

  function openDelete(index: number) {
    setDeleteIndex(index);
    setError("");
    setDeleteOpen(true);
  }

  function closeDeleteDialog() {
    if (!saving) {
      setDeleteOpen(false);
      setDeleteIndex(null);
      setError("");
    }
  }

  async function confirmDelete() {
    if (deleteIndex === null) {
      return;
    }

    const nextJobs = jobs.filter(
      (_, index) => index !== deleteIndex
    );

    try {
      setSaving(true);
      setError("");

      await saveJobs(nextJobs);

      onChange(nextJobs);

      setDeleteOpen(false);
      setDeleteIndex(null);
    } catch (error) {
      console.error(error);
      setError("Failed to delete job");
    } finally {
      setSaving(false);
    }
  }

  const jobToDelete =
    deleteIndex !== null
      ? jobs[deleteIndex]
      : null;


  return (
    <Box
      sx={{
        color: colors.ink,
      }}
    >
      {/* Header */}
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: colors.ink,
          }}
        >
          Work Experience
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openAdd}
          disabled={saving}
          sx={{
            background: `linear-gradient(
              90deg,
              ${colors.red},
              ${colors.crimson},
              ${colors.wine}
            )`,
            color: colors.ink,
            textTransform: "none",
            fontWeight: 600,
            boxShadow: "none",

            "&:hover": {
              background: `linear-gradient(
                90deg,
                ${colors.crimson},
                ${colors.wine}
              )`,
              boxShadow:
                "0 6px 20px rgba(255, 77, 94, 0.18)",
            },

            "&:disabled": {
              color: colors.dim,
            },
          }}
        >
          Add Job
        </Button>
      </Stack>

      {/* Error */}
      {error && (
        <Typography
          sx={{
            mb: 2,
            color: colors.red,
            fontSize: 14,
          }}
        >
          {error}
        </Typography>
      )}

      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 2,
          backgroundColor: colors.surface,
          border: `1px solid ${colors.line}`,
          boxShadow: "none",
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: colors.surface2,
              }}
            >
              <TableCell
                sx={{
                  fontWeight: 600,
                  color: colors.muted,
                  width: 60,
                  borderBottom: `1px solid ${colors.line}`,
                }}
              >
                #
              </TableCell>

              <TableCell
                sx={{
                  fontWeight: 600,
                  color: colors.muted,
                  borderBottom: `1px solid ${colors.line}`,
                }}
              >
                Title
              </TableCell>

              <TableCell
                sx={{
                  fontWeight: 600,
                  color: colors.muted,
                  borderBottom: `1px solid ${colors.line}`,
                }}
              >
                Period
              </TableCell>

              <TableCell
                sx={{
                  fontWeight: 600,
                  color: colors.muted,
                  borderBottom: `1px solid ${colors.line}`,
                }}
              >
                Stack
              </TableCell>

              <TableCell
                align="right"
                sx={{
                  fontWeight: 600,
                  color: colors.muted,
                  borderBottom: `1px solid ${colors.line}`,
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {jobs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  align="center"
                  sx={{
                    py: 6,
                    color: colors.dim,
                    borderBottom: "none",
                  }}
                >
                  No jobs yet. Click "Add Job"
                </TableCell>
              </TableRow>
            ) : (
              jobs.map((job, index) => (
                <TableRow
                  key={`${job.title}-${index}`}
                  hover
                  sx={{
                    "&:hover": {
                      backgroundColor: colors.surface2,
                    },

                    "&:last-child td": {
                      borderBottom: 0,
                    },
                  }}
                >
                  <TableCell
                    sx={{
                      color: colors.dim,
                      borderBottom: `1px solid ${colors.line}`,
                    }}
                  >
                    {index + 1}
                  </TableCell>

                  <TableCell
                    sx={{
                      color: colors.ink,
                      fontWeight: 500,
                      borderBottom: `1px solid ${colors.line}`,
                    }}
                  >
                    {job.title}
                  </TableCell>

                  <TableCell
                    sx={{
                      color: colors.softInk,
                      borderBottom: `1px solid ${colors.line}`,
                    }}
                  >
                    {job.period}
                  </TableCell>

                  <TableCell
                    sx={{
                      color: colors.softInk,
                      borderBottom: `1px solid ${colors.line}`,
                    }}
                  >
                    {job.stack.join(", ")}
                  </TableCell>

                  <TableCell
                    align="right"
                    sx={{
                      borderBottom: `1px solid ${colors.line}`,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => openEdit(index)}
                      disabled={saving}
                      sx={{
                        color: colors.muted,

                        "&:hover": {
                          color: colors.red,
                          backgroundColor:
                            "rgba(255, 77, 94, 0.08)",
                        },
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                      size="small"
                      onClick={() => openDelete(index)}
                      disabled={saving}
                      sx={{
                        color: colors.muted,

                        "&:hover": {
                          color: colors.red,
                          backgroundColor:
                            "rgba(255, 77, 94, 0.08)",
                        },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={closeFormDialog}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              backgroundColor: colors.surface,
              color: colors.ink,
              border: `1px solid ${colors.line}`,
              borderRadius: 2,
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            color: colors.ink,
            borderBottom: `1px solid ${colors.line}`,
          }}
        >
          {editingIndex === null
            ? "Add New Job"
            : "Edit Job"}
        </DialogTitle>

        <DialogContent>
          <Stack
            spacing={2.5}
            sx={{ mt: 2 }}
          >
            <TextField
              label="Job Title"
              fullWidth
              value={form.title}
              disabled={saving}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
              sx={{
                "& .MuiInputLabel-root": {
                  color: colors.muted,
                },

                "& .MuiInputLabel-root.Mui-focused": {
                  color: colors.red,
                },

                "& .MuiOutlinedInput-root": {
                  color: colors.ink,

                  "& fieldset": {
                    borderColor: colors.line,
                  },

                  "&:hover fieldset": {
                    borderColor: colors.wine,
                  },

                  "&.Mui-focused fieldset": {
                    borderColor: colors.red,
                  },
                },
              }}
            />

            <TextField
              label="Period"
              fullWidth
              value={form.period}
              disabled={saving}
              placeholder="April 2025 – Present"
              onChange={(e) =>
                setForm({
                  ...form,
                  period: e.target.value,
                })
              }
              sx={{
                "& .MuiInputLabel-root": {
                  color: colors.muted,
                },

                "& .MuiInputLabel-root.Mui-focused": {
                  color: colors.red,
                },

                "& .MuiOutlinedInput-root": {
                  color: colors.ink,

                  "& fieldset": {
                    borderColor: colors.line,
                  },

                  "&:hover fieldset": {
                    borderColor: colors.wine,
                  },

                  "&.Mui-focused fieldset": {
                    borderColor: colors.red,
                  },
                },

                "& input::placeholder": {
                  color: colors.dim,
                  opacity: 1,
                },
              }}
            />

            <TextField
              label="Key Points (one per line)"
              fullWidth
              multiline
              rows={5}
              value={form.points.join("\n")}
              disabled={saving}
              onChange={(e) =>
                setForm({
                  ...form,
                  points: e.target.value
                    .split("\n")
                    .map((point) => point.trim())
                    .filter(Boolean),
                })
              }
              sx={{
                "& .MuiInputLabel-root": {
                  color: colors.muted,
                },

                "& .MuiInputLabel-root.Mui-focused": {
                  color: colors.red,
                },

                "& .MuiOutlinedInput-root": {
                  color: colors.ink,

                  "& fieldset": {
                    borderColor: colors.line,
                  },

                  "&:hover fieldset": {
                    borderColor: colors.wine,
                  },

                  "&.Mui-focused fieldset": {
                    borderColor: colors.red,
                  },
                },
              }}
            />

            <TextField
              label="Tech Stack (comma separated)"
              fullWidth
              value={form.stack.join(", ")}
              disabled={saving}
              onChange={(e) =>
                setForm({
                  ...form,
                  stack: e.target.value
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean),
                })
              }
              sx={{
                "& .MuiInputLabel-root": {
                  color: colors.muted,
                },

                "& .MuiInputLabel-root.Mui-focused": {
                  color: colors.red,
                },

                "& .MuiOutlinedInput-root": {
                  color: colors.ink,

                  "& fieldset": {
                    borderColor: colors.line,
                  },

                  "&:hover fieldset": {
                    borderColor: colors.wine,
                  },

                  "&.Mui-focused fieldset": {
                    borderColor: colors.red,
                  },
                },
              }}
            />
          </Stack>
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            pb: 2,
            borderTop: `1px solid ${colors.line}`,
          }}
        >
          <Button
            onClick={closeFormDialog}
            disabled={saving}
            sx={{
              color: colors.muted,

              "&:hover": {
                backgroundColor: colors.surface2,
              },
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSave}
            disabled={saving}
            sx={{
              background: `linear-gradient(
                90deg,
                ${colors.red},
                ${colors.crimson}
              )`,
              color: colors.ink,
              textTransform: "none",
              fontWeight: 600,
              boxShadow: "none",

              "&:hover": {
                background: `linear-gradient(
                  90deg,
                  ${colors.crimson},
                  ${colors.wine}
                )`,
              },
            }}
          >
            {saving
              ? "Saving..."
              : editingIndex === null
                ? "Add Job"
                : "Save Changes"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* =========================
          Delete Confirmation
          ========================= */}

      <Dialog
        open={deleteOpen}
        onClose={closeDeleteDialog}
        maxWidth="xs"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              backgroundColor: colors.surface,
              color: colors.ink,
              border: `1px solid ${colors.line}`,
              borderRadius: 2,
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            color: colors.ink,
          }}
        >
          Delete Job
        </DialogTitle>

        <DialogContent>
          <Typography
            sx={{
              color: colors.softInk,
              lineHeight: 1.6,
            }}
          >
            Are you sure you want to delete{" "}
            <Box
              component="span"
              sx={{
                color: colors.ink,
                fontWeight: 600,
              }}
            >
              "{jobToDelete?.title}"
            </Box>
            ?
          </Typography>

          <Typography
            sx={{
              mt: 1,
              color: colors.dim,
              fontSize: 14,
            }}
          >
            This action cannot be undone.
          </Typography>
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            pb: 2,
          }}
        >
          <Button
            onClick={closeDeleteDialog}
            disabled={saving}
            sx={{
              color: colors.muted,

              "&:hover": {
                backgroundColor: colors.surface2,
              },
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={confirmDelete}
            disabled={saving}
            sx={{
              background: colors.red,
              color: "#fff",
              textTransform: "none",
              fontWeight: 600,
              boxShadow: "none",

              "&:hover": {
                background: colors.crimson,
              },
            }}
          >
            {saving ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}