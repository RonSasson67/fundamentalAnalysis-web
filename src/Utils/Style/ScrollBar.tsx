import { makeStyles } from "@mui/styles";

const ScrollBar = makeStyles({
  scrollBox: {
    overflowY: "auto", // Enable vertical scrolling
    "&::-webkit-scrollbar": {
      width: "4px", // Set the width of the scrollbar
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#f1f1f1", // Set the background color of the scrollbar track
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#1B1B1B", // Set the color of the scrollbar thumb
    },
  },
});

export default ScrollBar;
