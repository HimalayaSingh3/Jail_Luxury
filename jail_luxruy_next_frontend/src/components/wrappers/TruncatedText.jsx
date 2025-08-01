"use client"
import { Typography, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import React, { useRef, useEffect, useState } from "react";

// ✅ Styled Typography with Overflow Handling
const StyledTypography = styled("span")(({ theme ,fontSizeNumber}) => ({
  fontWeight: "bold",
  fontSize: theme.typography.pxToRem(fontSizeNumber),
  lineHeight: "1.4",
  maxHeight: "7vh",
  maxWidth: "20vw",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  display: "block",
  cursor: "pointer",
  color: theme.typography.color,
}));

// ✅ TruncatedText Component
const TruncatedText = ({ children, maxWidth ,fontSizeNumber=16}) => {
  const textRef = useRef(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    if (textRef.current) {
      setIsTruncated(textRef.current.scrollWidth > textRef.current.clientWidth);
    }
  }, [children]);

  const content = (
    <StyledTypography ref={textRef} fontSizeNumber={fontSizeNumber} sx={{ maxWidth}}>
      {children}
    </StyledTypography>
  );

  return isTruncated ? <Tooltip title={children} arrow>{content}</Tooltip> : content;
};

// ✅ Prop Type Validation
TruncatedText.propTypes = {
  children: PropTypes.node.isRequired, // Allows any text or component inside
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

// ✅ Default Props
TruncatedText.defaultProps = {
  maxWidth: "20vw",
};

export default TruncatedText;
