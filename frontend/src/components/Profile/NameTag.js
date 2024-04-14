import { Box, Typography } from "@mui/material";

export default function NameTag({ name, textGradient }) {

  console.log(textGradient);
  
  const handleWidth = () => {
    if (name.length > 13) {
      return "4vw";
    } else if (name.length > 11) {
      return "4.5vw";
    } else {
      return "5vw";
    }
    
  }

  return (
    <Box style={{...styles.nameTag, backgroundImage: `${textGradient}`}}>
      <Typography style={{...styles.text, fontSize: handleWidth(), lineHeight: handleWidth()}} variant="h2">
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
    fontWeight: "400",
    fontFamily: 'Radley',
    color: "black",
  },
};
