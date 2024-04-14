import { Box, Typography } from "@mui/material";

export default function NameTag({ name, textGradient }) {

  console.log(textGradient);

  return (
    <Box style={{...styles.nameTag, backgroundImage: `${textGradient}`}}>
      <Typography style={styles.text} variant="h2">
        {name}
      </Typography>
    </Box>
  );
}

const styles = {
  nameTag: {
    position: "absolute",
    color: "inherit",
    top: "78%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundImage: "linear-gradient(#D3D3D3, white)",
    padding: "0vw 0.75vw",
    border: "0.35vw solid black",
  },

  text: {
    fontSize: "5vw",
    fontWeight: "400",
    lineHeight: "5vw",
    fontFamily: 'Radley',
    color: "black",
  },
};
