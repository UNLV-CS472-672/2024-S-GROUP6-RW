// AboutTab.js
import React, { useState } from "react";
import { Box, Typography, TextareaAutosize } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function AboutTab() {
  const theme = useTheme();
  const [description, setDescription] = useState("I am super awesome.");
  const [numRows, setNumRows] = useState(3); // Initialize with the minimum number of rows

  const handleChange = (event) => {
    const lines = event.target.value.split("\n").length;
    setDescription(event.target.value);

    // Prevent adding more lines than the maximum allowed
    if (lines <= 8) {
      setNumRows(lines);
    }
  };

  return (
    <div>
      {/* Replace this with actual Friends content from your PDF */}
      <p>About content goes here.</p>

      <div style={{ textAlign: "left", marginTop: "1rem" }}>
        {true ? (
          <TextareaAutosize
            rows={numRows}
            placeholder="Enter description"
            value={description}
            onChange={handleChange}
            style={{
              width: "35vw",
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
          />
        ) : (
          <Typography
            variant="body1"
            component="div"
            style={{
              fontSize: "1.5vw",
              lineHeight: "1.5",
              paddingTop: "2px",
              paddingLeft: "2px",
              fontFamily: theme.typography.body1.fontFamily,
              letterSpacing: "normal",
            }}
            dangerouslySetInnerHTML={{
              __html: description.replace(/\n/g, "<br>"),
            }}
          />
        )}
      </div>
    </div>
  );
}
