export const styleBtn = (buttonType: string, activeButton: string) => ({
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  width: "120px",
  height: "120px",
  marginLeft: "290px",
  fontFamily: '"Oswald", sans-serif',
  boxShadow: activeButton === buttonType ? "0 0 5px" : "0 0 3px",

  background:
    activeButton === buttonType ? "rgba(255, 255, 255, 0.1)" : "transparent",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});

export const styleMealBtn = (isSelected: boolean) => ({
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  width: "120px",
  height: "120px",
  marginLeft: "290px",
  fontFamily: '"Oswald", sans-serif',
  boxShadow: isSelected ? "0 0 5px" : "0 0 3px",

  background: isSelected ? "rgba(255, 255, 255, 0.1)" : "transparent",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});

export const styleRoomBtn = (buttonType: string, activeRoomButton: string) => ({
  fontSize: "25px",
  color: "#fff",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  width: "auto",
  height: "50px",
  marginLeft: "290px",
  fontFamily: '"Oswald", sans-serif',
  boxShadow: activeRoomButton === buttonType ? "0 0 5px" : "0 0 2px",

  background:
    activeRoomButton === buttonType
      ? "rgba(255, 255, 255, 0.1)"
      : "transparent",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});

export const styleBathBtn = (buttonType: string, activeBathButton: string) => ({
  fontSize: "25px",
  color: "#fff",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  width: "auto",
  height: "50px",
  marginLeft: "290px",
  fontFamily: '"Oswald", sans-serif',
  boxShadow: activeBathButton === buttonType ? "0 0 5px" : "0 0 2px",

  background:
    activeBathButton === buttonType
      ? "rgba(255, 255, 255, 0.1)"
      : "transparent",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});

export const styleAmenityBtn = (isSelected: boolean) => ({
  fontSize: "15px",
  color: "#fff",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  width: "auto",
  height: "50px",
  marginLeft: "290px",
  fontFamily: '"Oswald", sans-serif',
  boxShadow: isSelected ? "0 0 5px" : "0 0 2px",

  background: isSelected ? "rgba(255, 255, 255, 0.1)" : "transparent",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});

export const styleAcBtn = (buttonType: string, activeAcButton: string) => ({
  fontSize: "15px",
  color: "#fff",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  width: "auto",
  height: "50px",
  marginLeft: "290px",
  fontFamily: '"Oswald", sans-serif',
  boxShadow: activeAcButton === buttonType ? "0 0 5px" : "0 0 2px",

  background:
    activeAcButton === buttonType ? "rgba(255, 255, 255, 0.1)" : "transparent",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});

export const styleTowelsBtn = (
  buttonType: string,
  activeTowelsButton: string
) => ({
  fontSize: "15px",
  color: "#fff",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  width: "auto",
  height: "50px",
  marginLeft: "290px",
  fontFamily: '"Oswald", sans-serif',
  boxShadow: activeTowelsButton === buttonType ? "0 0 5px" : "0 0 2px",

  background:
    activeTowelsButton === buttonType
      ? "rgba(255, 255, 255, 0.1)"
      : "transparent",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});

export const styleTvBtn = (buttonType: string, activeTvButton: string) => ({
  fontSize: "15px",
  color: "#fff",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  width: "auto",
  height: "50px",
  marginLeft: "290px",
  fontFamily: '"Oswald", sans-serif',
  boxShadow: activeTvButton === buttonType ? "0 0 5px" : "0 0 2px",

  background:
    activeTvButton === buttonType ? "rgba(255, 255, 255, 0.1)" : "transparent",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});

export const styleBalconyBtn = (
  buttonType: string,
  activeBalconyButton: string
) => ({
  fontSize: "15px",
  color: "#fff",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  width: "auto",
  height: "50px",
  marginLeft: "290px",
  fontFamily: '"Oswald", sans-serif',
  boxShadow: activeBalconyButton === buttonType ? "0 0 5px" : "0 0 2px",

  background:
    activeBalconyButton === buttonType
      ? "rgba(255, 255, 255, 0.1)"
      : "transparent",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});
