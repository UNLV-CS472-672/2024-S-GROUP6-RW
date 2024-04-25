import { Box, Typography } from "@mui/material";

// NameTag component for displaying user's name with gradient background
export default function NameTag({ name, nameGradient }) {
  
  // Function to dynamically adjust font size based on the length of the name
  const handleWidth = () => {
    // Adjust font size based on the length of the name
    if ((name?.length || 13) > 12) {
      return "3vw";
    } else if (name.length > 10) {
      return "3.5vw";
    } else if (name.length > 9) {
      return "3.9vw";
    } else if (name.length > 6) {
      return "4.5vw";
    }
  }

  // Return the NameTag component
  return (
    <Box style={{...styles.nameTag, backgroundImage: `${nameGradient}`}}>
      {/* Typography component to display the user's name */}
      <Typography style={{...styles.text, fontSize: handleWidth(), lineHeight: handleWidth()}} variant="h2">
        {name}
      </Typography>
    </Box>
  );
}

// Styles for the NameTag component
const styles = {
  nameTag: {
    position: "absolute", // Position the NameTag absolutely
    color: "inherit", // Inherit color from parent
    top: "78%", // Position from the top
    left: "50%", // Position from the left
    transform: "translate(-50%, -50%)", // Center horizontally and vertically
    backgroundImage: "linear-gradient(#D3D3D3, white)", // Gradient background
    padding: "0vw 0.75vw", // Padding
    border: "0.35vw solid black", // Border
  },

  text: {
    fontWeight: "400", // Normal font weight
    fontFamily: 'Radley', // Font family
    color: "black", // Text color
  },
};
