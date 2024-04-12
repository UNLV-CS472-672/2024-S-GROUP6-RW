import { Grid, Avatar } from "@mui/material";
import add_picture from "../../images/avatars/add_picture.png";

export default function AvatarGrid({
  avatars,
  selectedImg,
  addCustomAvatar,
  customAvatars,
}) {
  const plus = { img: add_picture, title: "Add Picture" };

  const uploadAvatar = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Check if the file type is an image
      if (!file.type.startsWith("image/")) {
        console.log("Please select an image file.");
        return;
      }

      // Create an image element to load the image
      const img = new Image();
      img.onload = function () {
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
        if (customAvatars.length === 3) {
          customAvatars.pop();
        }
        addCustomAvatar([
          { img: resizedImageData, title: "Custom Picture" },
          ...customAvatars,
        ]);
        selectAvatar({ img: resizedImageData, title: "Custom Picture" }); // Set the selectedImg to the uploaded image
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
      style={{ display: "flex", width: "20vw" }}
    >
      <Grid item xs={3} justifyContent="left">
        <label htmlFor="avatar-upload">
          <Avatar
            src={plus.img}
            alt={plus.title}
            style={{
              width: "3vw",
              height: "3vw",
              margin: "1vw",
              cursor: "pointer",
              border: "0.1vw solid black",
            }}
          />
        </label>
        <input
          type="file"
          id="avatar-upload"
          accept="image/*"
          style={{ display: "none", width: "3vw", height: "3vw" }}
          onChange={uploadAvatar}
        />
      </Grid>

      {customAvatars.map((avatar, index) => (
        <Grid item xs={3} justifyContent="left" key={index}>
          <Avatar
            src={avatar.img}
            alt={avatar.title}
            style={{
              width: "3vw",
              height: "3vw",
              margin: "1vw",
              cursor: "pointer",
              border: "0.1vw solid black",
            }}
            onClick={() => selectAvatar(avatar)}
          />
        </Grid>
      ))}
      {avatars.map((avatar, index) => (
        <Grid item xs={3} justifyContent="left" key={index}>
          <Avatar
            src={avatar.img}
            alt={avatar.title}
            style={{
              width: "3vw",
              height: "3vw",
              margin: "1vw",
              cursor: "pointer",
              border: "0.1vw solid black",
            }}
            onClick={() => selectAvatar(avatar)}
          />
        </Grid>
      ))}
    </Grid>
  );
}
