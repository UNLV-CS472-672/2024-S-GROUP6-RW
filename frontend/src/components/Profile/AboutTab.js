import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { Typography } from "@mui/material";

export default function AboutTab({ editMode, description, setDescription, textColor, maxCharLimit, currentCount }) {

    // Handle input changes
    const handleChange = (newText) => {
        // Update description and current count if within character limit
        if (newText.length <= maxCharLimit) {
            setDescription(newText);
            currentCount(newText.length);
        }
    };

    return (
        <View style={styles.aboutBox}>
            {editMode ? (
                // Use TextInput for editable mode
                <TextInput
                    placeholder="Enter description"
                    value={description}
                    onChangeText={handleChange}
                    style={{...styles.editText, color: textColor}}
                    multiline // Allow multiline input
                    maxLength={maxCharLimit} // Enforce max character limit at input level
                />
            ) : (
                // Display text as Typography when not in edit mode
                <Typography
                    variant="body1"
                    component="div"
                    style={{...styles.setText, color: textColor}}
                >
                    {description}
                </Typography>
            )}
        </View>
    );
}

const styles = {
    aboutBox: {
        textAlign: "left",
        marginTop: "1vw",
        marginLeft: "0.8vw",
        maxHeight: "22vw",
        overflowY: "auto",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
            display: "none",
        },
    },
    editText: {
        width: "37vw",
        height: "22vw",
        border: "none",
        background: "none",
        resize: "none",
        outline: "none",
        boxShadow: "none",
        marginLeft: "0.2em",
        marginBottom: "-0.6vw",
        fontSize: "1.5vw",
        letterSpacing: "normal",
        lineHeight: "1.5",
        fontFamily: "Radley",
        wordWrap: "break-word",
    },
    setText: {
        width: "37vw",
        fontSize: "1.5vw",
        lineHeight: "1.5",
        marginLeft: "0.2em",
        letterSpacing: "normal",
        fontFamily: "Radley",
        whiteSpace: "pre-line", // Preserve newline characters
        wordWrap: "break-word",
        overflowY: "auto",
    },
};
