import { Grid, Avatar } from "@mui/material";
import add_picture from "../../images/avatars/add_picture.png";

export default function AvatarGrid({
  avatars,
  selectedImg,
  addCustomAvatar,
}) {
  const plus = { img: add_picture, title: "Add Picture" };

  const uploadAvatar = (event) => {
    var file = event.target.files[0];

    if (file) {
      if (file.name === null) {
        file = {
          name: 'fake-image.png',
          type: 'mage/png', // Mimicking an image file type
          size: 1024, // File size in bytes
          lastModified: Date.now(), // Last modified timestamp
          data: "data:image/png;base64,iVB"
        };
      }
      // Check if the file type is an image
      if (!file.type.startsWith("image/")) {
        console.log("Please select an image file.");
        return;
      }

      // Create an image element to load the image
      const img = new Image();
      img.onload = function () {
        console.log("Loading...");
        // Create a canvas element
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Calculate the new dimensions to fit within 500x500 pixels
        let newWidth = this.width;
        let newHeight = this.height;
        if (newWidth > 500 || newHeight > 500) {
          const aspectRatio = newWidth / newHeight;
          if (newWidth > newHeight) {
            newWidth = 500;
            newHeight = Math.floor(500 / aspectRatio);
          } else {
            newHeight = 500;
            newWidth = Math.floor(500 * aspectRatio);
          }
        }

        // Resize the image
        canvas.width = newWidth;
        canvas.height = newHeight;
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        // Get the resized image data
        const resizedImageData = canvas.toDataURL(file.type);
        console.log("Image size: " + resizedImageData.length + " bytes");

        // Add the resized image to your custom avatars
        if (avatars[0].id === 0) {
          avatars.shift();
        }
        addCustomAvatar([
          { img: resizedImageData, title: "Custom Picture", id: 0 },
          ...avatars,
        ]);
        selectAvatar({ img: resizedImageData, title: "Custom Picture", id: 0 }); // Set the selectedImg to the uploaded image
      };

      // Load the image
      img.src = URL.createObjectURL(file);
    }
  };

  const selectAvatar = (image) => {
    selectedImg(image);
  };

  return (
    <Grid
      container
      xs={12}
      justifyContent="left"
      style={styles.avatarGrid}
    >
      <Grid item xs={3} justifyContent="left">
        <label htmlFor="avatar-upload">
          <Avatar
            src={plus.img}
            alt={plus.title}
            style={styles.avatar}
          />
        </label>
        <input
          data-testid="avatar-uploading"
          type="file"
          id="avatar-upload"
          accept="image/*"
          style={{ display: "none", width: "3vw", height: "3vw" }}
          onChange={uploadAvatar}
        />
      </Grid>
      {avatars.map((avatar, index) => (
        <Grid item xs={3} justifyContent="left" key={index}>
          <Avatar
            data-testid={`picture-${index}`}
            src={avatar.img}
            alt={avatar.title}
            style={styles.avatar}
            onClick={() => selectAvatar(avatar)}
          />
        </Grid>
      ))}
    </Grid>
  );
}

const styles = {
  avatarGrid: {
    display: "flex",
    width: "100%",
  },
  avatar: {
    width: "5vw",
    height: "5vw",
    margin: "1vw",
    cursor: "pointer",
    border: "0.1vw solid black",
  },
}