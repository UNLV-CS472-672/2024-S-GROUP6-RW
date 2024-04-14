import React, { useState } from "react";
import { Box, Typography, TextareaAutosize } from "@mui/material";

export default function AboutTab({ editMode, description, setDescription, textColor }) {

  const handleChange = (event) => {
    // Set the edited description.\
    const lines = event.target.value.split("\n").length;
    setDescription(event.target.value);
  };

  return (
    <div>
      {/* Replace this with actual Friends content from your PDF */}

      <div style={styles.aboutBox}>
        {editMode ? ( // Switch between an editable text box and a display text box
          <TextareaAutosize
            placeholder="Enter description"
            value={description}
            onChange={handleChange}
            style={{...styles.editText, color: textColor}}
          />
        ) : (
          <Typography // Typography is what is displayer to users
            variant="body1"
            component="div"
            style={{...styles.setText, color: textColor}}
          >
            {description}
          </Typography>
        )}
      </div>
    </div>
  );
}

const styles = {
  aboutBox: {
    textAlign: "left",
    marginTop: "1vw",
    marginLeft: "0.8vw",
    maxHeight: "22vw",
    overflowY: "auto", // Add overflowY to enable vertical scrolling
    scrollbarWidth: "none", // Hide scrollbar for Firefox
    "&::-webkit-scrollbar": {
      display: "none", // Hide scrollbar for webkit browsers (Chrome, Safari)
    },
  },
  editText: {
    width: "37.5vw",
    border: "none",
    background: "none",
    resize: "none",
    outline: "none",
    boxShadow: "none",
    marginTop: "-0.1em",
    marginLeft: "-0.1em",
    marginBottom: "-0.6vw",
    fontSize: "1.5vw",
    letterSpacing: "normal",
    lineHeight: "1.5",
    fontFamily: "Radley",
  },
  setText: {
    width: "37.5vw",
    fontSize: "1.5vw",
    lineHeight: "1.5",
    letterSpacing: "normal",
    fontFamily: "Radley",
    whiteSpace: "pre-line", // Add this line to preserve newline characters
    wordWrap: "break-word", // Allow long words to wrap onto the next line
    overflowY: "auto", // Add overflowY to enable vertical scrolling
  },
}