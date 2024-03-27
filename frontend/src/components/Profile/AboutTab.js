import React, { useState } from "react";
import { Box, Typography, TextareaAutosize } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function AboutTab({ editMode, description, setDescription }) {
  const theme = useTheme();

  const handleChange = (event) => {
    // Set the edited description.\
    const lines = event.target.value.split("\n").length;
    setDescription(event.target.value);
  };

  return (
    <div>
      {/* Replace this with actual Friends content from your PDF */}

      <div style={{ textAlign: "left", marginTop: "1vw", marginLeft: "0.8vw" }}>
        {editMode ? ( // Switch between an editable text box and a display text box
          <TextareaAutosize
            placeholder="Enter description"
            value={description}
            onChange={handleChange}
            style={{
              width: "38.5vw",
              border: "none",
              background: "none",
              resize: "none",
              outline: "none",
              boxShadow: "none",
              fontSize: "1.5vw",
              lineHeight: "1.5",
              fontFamily: theme.typography.body1.fontFamily,
              color: theme.palette.text.primary,
            }}
            maxRows="13"
          />
        ) : (
          <Typography // Typography is what is displayer to users
            variant="body1"
            component="div"
            style={{
              width: "38.5vw",
              height: "62vh",
              fontSize: "1.5vw",
              lineHeight: "1.5",
              paddingTop: "2px",
              paddingLeft: "2px",
              letterSpacing: "normal",
              whiteSpace: "pre-line", // Add this line to preserve newline characters
              wordWrap: "break-word", // Allow long words to wrap onto the next line
              overflowY: "auto", // Add overflowY to enable vertical scrolling
            }}
          >
            {description}
          </Typography>
        )}
      </div>
    </div>
  );
}
