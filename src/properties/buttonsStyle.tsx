export const styleBtn = () => ({
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  width: "150px",
  height: "120px",
  padding: "2px",
  //   marginLeft: "290px",
  fontFamily: '"Oswald", sans-serif',
  //   boxShadow: activeButton === buttonType ? "0 0 5px" : "0 0 3px",
  pointerEvents: "none",
  background: "rgba(255, 255, 255, 0.1)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});

export const styleRectangleBtn = () => ({
  fontSize: "15px",
  color: "#fff",
  display: "flex",
  flexDirection: "row",

  //   width: "auto",
  height: "50px",
  marginTop: "20px",
  fontFamily: '"Oswald", sans-serif',
  boxShadow: "0 0 3px",

  background: "transparent",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
});
