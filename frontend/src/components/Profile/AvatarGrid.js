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
      if (customAvatars.length === 3) {
        customAvatars.pop();
      }
      const reader = new FileReader();
      reader.onload = () => {
        const imgData = reader.result;
        addCustomAvatar([
          { img: imgData, title: "Custom Picture" },
          ...customAvatars,
        ]);
        selectAvatar({ img: imgData, title: "Custom Picture" }); // Set the selectedImg to the uploaded image
      };
      reader.readAsDataURL(file);
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
