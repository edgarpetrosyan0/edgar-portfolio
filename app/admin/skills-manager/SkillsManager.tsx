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
  Chip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

type Skills = Record<string, string[]>;

type Props = {
  skills: Skills;
  onChange: (skills: Skills) => void;
  password: string;
};

const colors = {
  bg: "#09060a",
  surface: "#111318",
  surface2: "#111318",
  line: "rgba(220, 220, 220, 0.07)",
  ink: "#f7f0f2",
  muted: "#aa9ba2",
  red: "#ff4d5e",
  crimson: "#e11d48",
  wine: "#a3154f",
  softInk: "#d3c6cb",
  dim: "#7f7077",
};

export default function SkillsManager({
  skills,
  onChange,
  password,
}: Props) {
  const [open, setOpen] = useState(false);

  const [editingCategory, setEditingCategory] =
    useState<string | null>(null);

  const [categoryName, setCategoryName] = useState("");
  const [skillsText, setSkillsText] = useState("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteCategory, setDeleteCategory] =
    useState<string | null>(null);

  function openAdd() {
    setEditingCategory(null);
    setCategoryName("");
    setSkillsText("");
    setError("");
    setOpen(true);
  }

  function openEdit(category: string) {
    setEditingCategory(category);
    setCategoryName(category);
    setSkillsText(skills[category].join("\n"));
    setError("");
    setOpen(true);
  }

  async function saveSkills(nextSkills: Skills) {
    const res = await fetch("/api/portfolio", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": password,
      },
      body: JSON.stringify({
        skills: nextSkills,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to save skills");
    }
  }

  async function handleSave() {
    const trimmedCategory = categoryName.trim();

    if (!trimmedCategory) {
      setError("Category name is required");
      return;
    }

    const list = skillsText
      .split("\n")
      .map((skill) => skill.trim())
      .filter(Boolean);

    const next = { ...skills };

    if (
      editingCategory &&
      editingCategory !== trimmedCategory
    ) {
      delete next[editingCategory];
    }

    next[trimmedCategory] =
      list.length > 0 ? list : ["New skill"];

    try {
      setSaving(true);
      setError("");

      await saveSkills(next);

      onChange(next);
      setOpen(false);
    } catch (error) {
      console.error(error);
      setError("Failed to save changes");
    } finally {
      setSaving(false);
    }
  }

  function openDelete(category: string) {
    setDeleteCategory(category);
    setError("");
    setDeleteOpen(true);
  }

  async function confirmDelete() {
    if (!deleteCategory) {
      return;
    }

    const next = { ...skills };

    delete next[deleteCategory];

    try {
      setSaving(true);
      setError("");

      await saveSkills(next);

      onChange(next);

      setDeleteOpen(false);
      setDeleteCategory(null);
    } catch (error) {
      console.error(error);
      setError("Failed to delete category");
    } finally {
      setSaving(false);
    }
  }

  function closeDeleteDialog() {
    if (!saving) {
      setDeleteOpen(false);
      setDeleteCategory(null);
    }
  }

  const entries = Object.entries(skills);

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
          Skills
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
          Add Category
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
                Category
              </TableCell>

              <TableCell
                sx={{
                  fontWeight: 600,
                  color: colors.muted,
                  borderBottom: `1px solid ${colors.line}`,
                }}
              >
                Skills
              </TableCell>

              <TableCell
                align="right"
                sx={{
                  fontWeight: 600,
                  color: colors.muted,
                  borderBottom: `1px solid ${colors.line}`,
                  width: 120,
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {entries.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  align="center"
                  sx={{
                    py: 6,
                    color: colors.dim,
                    borderBottom: "none",
                  }}
                >
                  No skills yet. Click "Add Category"
                </TableCell>
              </TableRow>
            ) : (
              entries.map(([category, items], index) => (
                <TableRow
                  key={category}
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
                  {/* Number */}
                  <TableCell
                    sx={{
                      color: colors.dim,
                      borderBottom: `1px solid ${colors.line}`,
                    }}
                  >
                    {index + 1}
                  </TableCell>

                  {/* Category */}
                  <TableCell
                    sx={{
                      fontWeight: 500,
                      color: colors.ink,
                      borderBottom: `1px solid ${colors.line}`,
                    }}
                  >
                    {category}
                  </TableCell>

                  {/* Skills */}
                  <TableCell
                    sx={{
                      borderBottom: `1px solid ${colors.line}`,
                    }}
                  >
                    <Stack
                      direction="row"
                      sx={{
                        flexWrap: "wrap",
                        gap: 0.5,
                      }}
                    >
                      {items.map((skill) => (
                        <Chip
                          key={skill}
                          label={skill}
                          size="small"
                          sx={{
                            backgroundColor: colors.surface2,
                            color: colors.softInk,
                            border: `1px solid ${colors.line}`,
                            borderRadius: 1,

                            "& .MuiChip-label": {
                              px: 1,
                            },
                            
                          }}
                        />
                      ))}
                    </Stack>
                  </TableCell>

                  {/* Actions */}
                  <TableCell
                    align="right"
                    sx={{
                      borderBottom: `1px solid ${colors.line}`,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => openEdit(category)}
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
                      onClick={() => openDelete(category)}
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

      {/* Add / Edit Dialog */}
      <Dialog
        open={open}
        onClose={() => {
          if (!saving) {
            setOpen(false);
          }
        }}
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
          {editingCategory
            ? "Edit Category"
            : "Add New Category"}
        </DialogTitle>

        <DialogContent>
          <Stack
            spacing={2.5}
            sx={{
              mt: 2,
            }}
          >
            {/* Category */}
            <TextField
              label="Category Name"
              fullWidth
              value={categoryName}
              disabled={saving}
              onChange={(e) =>
                setCategoryName(e.target.value)
              }
              placeholder="Example: Soft Skills"
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

            {/* Skills */}
            <TextField
              label="Skills (one per line)"
              fullWidth
              multiline
              rows={6}
              value={skillsText}
              disabled={saving}
              onChange={(e) =>
                setSkillsText(e.target.value)
              }
              placeholder={"Skill 1\nSkill 2\nSkill 3"}
              helperText="Write each skill on a new line"
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

                "& textarea::placeholder": {
                  color: colors.dim,
                  opacity: 1,
                },

                "& .MuiFormHelperText-root": {
                  color: colors.dim,
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
            onClick={() => setOpen(false)}
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
              : editingCategory
                ? "Save Changes"
                : "Add Category"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
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
          Delete Category
        </DialogTitle>

        <DialogContent>
          <Typography
            sx={{
              color: colors.softInk,
            }}
          >
            Are you sure you want to delete{" "}
            <strong>
              {deleteCategory}
            </strong>
            ?
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

            }}
          >
            {saving ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}