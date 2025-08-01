"use client";

import React from "react";
import { styled, keyframes } from "@mui/material";

// Keyframe animations
const motion = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(3px); }
  100% { transform: translateY(0px); }
`;

const roadAnimation = keyframes`
  0% { transform: translateX(0px); }
  100% { transform: translateX(-350px); }
`;

// Styled Components
const LoaderContainer = styled("div")({
  width: "fit-content",
  height: "fit-content",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const TruckWrapper = styled("div")({
  width: "200px",
  height: "100px",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  alignItems: "center",
  justifyContent: "flex-end",
  overflowX: "hidden",
});

const TruckBody = styled("div")({
  width: "130px",
  height: "fit-content",
  marginBottom: "6px",
  animation: `${motion} 1s linear infinite`,
});

const TruckTires = styled("div")({
  width: "130px",
  height: "fit-content",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0px 10px 0px 15px",
  position: "absolute",
  bottom: 0,
});

const Road = styled("div")({
  width: "100%",
  height: "1.5px",
  backgroundColor: "#282828",
  position: "relative",
  bottom: 0,
  alignSelf: "flex-end",
  borderRadius: "3px",
  "&::before": {
    content: '""',
    position: "absolute",
    width: "20px",
    height: "100%",
    backgroundColor: "#282828",
    right: "-50%",
    borderRadius: "3px",
    animation: `${roadAnimation} 1.4s linear infinite`,
    borderLeft: "10px solid white",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    width: "10px",
    height: "100%",
    backgroundColor: "#282828",
    right: "-65%",
    borderRadius: "3px",
    animation: `${roadAnimation} 1.4s linear infinite`,
    borderLeft: "4px solid white",
  },
});

const LampPost = styled("svg")({
  position: "absolute",
  bottom: 0,
  right: "-90%",
  height: "90px",
  animation: `${roadAnimation} 1.4s linear infinite`,
});

// Truck Loader Component
const TruckLoader = () => {
  return (
    <LoaderContainer>
      <TruckWrapper>
        {/* Truck Body */}
        <TruckBody>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 198 93"
            width="130px"
          >
            {/* Truck Body */}
            <path
              strokeWidth="3"
              stroke="#282828"
              fill="#F83D3D"
              d="M135 22.5H177.264C178.295 22.5 179.22 23.133 179.594 24.0939L192.33 56.8443C192.442 57.1332 192.5 57.4404 192.5 57.7504V89C192.5 90.3807 191.381 91.5 190 91.5H135C133.619 91.5 132.5 90.3807 132.5 89V25C132.5 23.6193 133.619 22.5 135 22.5Z"
            ></path>
            
            {/* Windows */}
            <rect x="137" y="30" width="20" height="15" fill="#08232c" />
            <rect x="163" y="30" width="20" height="15" fill="#030e12" />
            
            {/* Carriage/Cargo Area */}
            <rect x="10" y="50" width="125" height="20" fill="#3e0404" />
            <rect x="10" y="50" width="125" height="30" fill="#200303" />
          </svg>
        </TruckBody>

        {/* Truck Tires */}
        <TruckTires>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" width="24px">
            <circle strokeWidth="3" stroke="#282828" fill="#282828" r="13.5" cy="15" cx="15"></circle>
            <circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" width="24px">
            <circle strokeWidth="3" stroke="#282828" fill="#282828" r="13.5" cy="15" cx="15"></circle>
            <circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
          </svg>
        </TruckTires>

        {/* Road */}
        <Road />

        {/* Lamp Post */}
        <LampPost
          xmlSpace="preserve"
          viewBox="0 0 453.459 453.459"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M252.882,0c-37.781,0-68.686,29.953-70.245,67.358h-6.917v8.954c-26.109,2.163-45.463,10.011-45.463,19.366h9.993
              c-1.65,5.146-2.507,10.54-2.507,16.017c0,28.956,23.558,52.514,52.514,52.514c28.956,0,52.514-23.558,52.514-52.514
              c0-5.478-0.856-10.872-2.506-16.017h9.992c0-9.354-19.352-17.204-45.463-19.366v-8.954h-6.149C200.189,38.779,223.924,16,252.882,16
              c29.952,0,54.32,24.368,54.32,54.32c0,28.774-11.078,37.009-25.105,47.437c-17.444,12.968-37.216,27.667-37.216,78.884v113.914
              h-0.797c-5.068,0-9.174,4.108-9.174,9.177c0,2.844,1.293,5.383,3.321,7.066c-3.432,27.933-26.851,95.744-8.226,115.459v11.202h45.75
              v-11.202c18.625-19.715-4.794-87.527-8.227-115.459c2.029-1.683,3.322-4.223,3.322-7.066c0-5.068-4.107-9.177-9.176-9.177h-0.795
              V196.641c0-43.174,14.942-54.283,30.762-66.043c14.793-10.997,31.559-23.461,31.559-60.277C323.202,31.545,291.656,0,252.882,0z"
          ></path>
        </LampPost>
      </TruckWrapper>
    </LoaderContainer>
  );
};

export default TruckLoader;