import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div style={containerStyle}>
      <div style={spinnerStyle}></div>
    </div>
  );
};

// Styling
const containerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh", // Adjust this to fit your parent container
  backgroundColor: "transparent",
};

const spinnerStyle: React.CSSProperties = {
  width: "50px",
  height: "50px",
  border: "6px solid rgba(0, 163, 255, 0.2)", // Light blue background for the spinner
  borderTop: "6px solid #00A3FF", // Blue color for the active part
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};

// Keyframes for the spinner animation
const keyframesStyle = `
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`;

// Inject the keyframes into the document
const styleElement = document.createElement("style");
styleElement.innerHTML = keyframesStyle;
document.head.appendChild(styleElement);

export default LoadingSpinner;