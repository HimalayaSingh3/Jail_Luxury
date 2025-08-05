"use client";
import React from "react";
import { Box, TextField, Button, Stack } from "@mui/material";

export default function CategoryForm({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
  isUpdateForm = false,
}) {
  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Category Name"
          fullWidth
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />

        <Box display="flex" gap={2}>
          <Button type="submit" variant="contained" color="primary">
            {buttonText}
          </Button>

          {isUpdateForm && (
            <Button variant="outlined" color="error" onClick={handleDelete}>
              Delete
            </Button>
          )}
        </Box>
      </Stack>
    </Box>
  );
}
