import { makeStyles } from "@mui/styles";

const GlowingText = makeStyles({
  glowingText: {
    animation: "$glowing 1.5s infinite",
  },
  "@keyframes glowing": {
    "0%": { textShadow: "0 0 8px #00e6e6, 0 0 5px #00b3b3" },
    "50%": { textShadow: "0 0 5px #00e6e6, 0 0 5px #00b3b3" },
    "100%": { textShadow: "0 0 8px #00e6e6, 0 0 5px #00b3b3" },
  },
});

export default GlowingText;
