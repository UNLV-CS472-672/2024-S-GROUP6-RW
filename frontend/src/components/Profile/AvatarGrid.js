import { Grid, Avatar } from "@mui/material";
import add_picture from "../../images/avatars/add_picture.png";

export default function AvatarGrid({
  avatars,
  selectedImg,
  addCustomAvatar,
}) {

/**
 * ChatGPT was used to help teach how to use file readers
 * and Image() to load and display images. It also showed
 * me how to reduce file sizes using canvas.
 * (ChatGPT 3.5, 1)
 */

  const plus = { img: add_picture, title: "Add Picture" };

  const uploadAvatar = (event) => {
    const file = event.target.files[0];
    if (file) {
        // Check if the file type is an image
        if (!file.type.startsWith("image/")) {
          console.log("Please select an image file.");
          return;
        }

       // Add the resized image to your custom avatars
       if (avatars[0].id === 0) {
        avatars.shift();
      }

      // ai-gen start (ChatGPT 3.5, 0)
      const reader = new FileReader();
      reader.onload = () => {
        const imgData = reader.result;
        addCustomAvatar([
          { img: imgData, title: "Custom Picture", id: 0 },
          ...avatars,
        ]);
        selectAvatar({ img: imgData, title: "Custom Picture", id: 0 }); // Set the selectedImg to the uploaded image
      };
      reader.readAsDataURL(file);
      // ai-gen end
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