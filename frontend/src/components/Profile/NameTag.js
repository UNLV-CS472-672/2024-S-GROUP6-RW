import { Box, Typography } from "@mui/material";

export default function NameTag({ name }) {
  const getWidth = () => {
    return name.length * 2.8 + "vw";
  };

  return (
    <Box style={{ ...styles.nameTag, width: getWidth() }}>
      <Typography style={styles.text} variant="h2">
        {name}
      </Typography>
    </Box>
  );
}

const styles = {
  nameTag: {
    height: "4.5vw",
    position: "absolute",
    color: "inherit",
    top: "80%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(128, 128, 128, 1)",
    padding: "0.25vw 0.5vw",
    borderRadius: "0.5vw",
    border: "0.3vw solid black",
  },

  text: {
    fontSize: "3.9vw",
    color: "black",
  },
};
