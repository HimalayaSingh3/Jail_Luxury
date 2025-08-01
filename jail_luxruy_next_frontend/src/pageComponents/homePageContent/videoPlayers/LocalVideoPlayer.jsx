"use client";
import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import { Box, useMediaQuery, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TruncatedText from "@/components/wrappers/TruncatedText";

const VideoContainer = styled(Box)(({ theme, ismobile }) => ({
  minWidth: ismobile ? "80vw" : "70%",
  minHeight: ismobile? "80vh":"70vh",
  display: "flex",
  marginLeft: ismobile? "1vw" : "2vw",
  marginRight: ismobile? "0.5vw" : "2vw",
  flexDirection: ismobile ? "column" : "row",
  alignItems: "center",
  justifyContent: ismobile ? "center" : "space-evenly",
  overflow: "hidden",
  borderRadius: "12px",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
  padding: theme.spacing(4),
  gap: theme.spacing(4),
  backgroundImage:
    theme.palette.mode === "dark"
      ? "url('./webps/darkmodeBackgroundImg.webp')"
      : "url('./webps/lightmodeBackgroundImg.webp')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "relative",
  backgroundSize: "cover", // or "contain" depending on your preference
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.7)",
    zIndex: 1,
  },
}));

const StyledVideo = styled("video")(({ ismobile }) => ({
  minWidth: ismobile ? "140vw" : "35vw",
  maxHeight: ismobile ? "50vh" : "60vh",
  objectFit: "cover",
  borderRadius: "12px",
  zIndex: 2,
}));

const VideoDescContainer = styled(Box)(({ theme ,ismobile}) => ({
 
  
  color: theme.palette.secondary.main,
  
  zIndex: 2,

}));

const TextContainer = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: theme.typography.pxToRem(20),
  lineHeight: "1.6",
  textAlign: "justify",
  marginBottom: theme.spacing(2),
  color: theme.custom.primaryButtonFontColor,
}));

const TitleText = styled(Typography)(({ theme }) => ({
  fontSize: "2.5rem",
  fontWeight: "bold",
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
}));

const LocalVideoPlayer = ({ videoSrc }) => {
  const theme = useTheme();
  const ismobile = useMediaQuery(theme.breakpoints.down("sm"));
  const videoRef = useRef(null);
  const [videoSrcState, setVideoSrcState] = useState(videoSrc || "");

  // Add cache busting to prevent browser caching
  const fetchVideo = async () => {
    try {
      const response = await fetch(`/api/get-video?t=${Date.now()}`);
      const data = await response.json();
      setVideoSrcState(`${data.videoUrl}?t=${Date.now()}`);
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  };

  useEffect(() => {
    if (!videoSrc) {
      fetchVideo();
    }
  }, [videoSrc]);

  // Handle video playback
  useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          await videoRef.current.play();
        } catch (err) {
          console.log("Autoplay prevented, trying muted play");
          videoRef.current.muted = true;
          await videoRef.current.play();
        }
      }
    };

    if (videoSrcState) {
      playVideo();
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.removeAttribute('src');
        videoRef.current.load();
      }
    };
  }, [videoSrcState]);

  return (
    <VideoContainer ismobile={ismobile}>
      {videoSrcState ? (
        <StyledVideo
          key={videoSrcState} // Force re-render on source change
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          ismobile={ismobile}
        >
          <source src={videoSrcState} type="video/mp4" />
          Your browser does not support the video tag.
        </StyledVideo>
      ) : (
        <Typography variant="body1" color="textSecondary">
          Loading video...
        </Typography>
      )}

      <VideoDescContainer ismobile={ismobile}>
      <TitleText>WHY JAIL?</TitleText>
        <TextContainer>
          The name “Jail” is more than just a brand. It’s a nod to our roots. The
          original shop was located on Jail Road in Banka, and the name was born
          out of the simplicity of directions—“Jail Road, Jail Road.” Today, it
          stands as a symbol of our journey, from a small shop in Bihar to a
          luxury brand that resonates with customers around the world.
        </TextContainer>
          </VideoDescContainer>
    </VideoContainer>
  );
};

export default LocalVideoPlayer;