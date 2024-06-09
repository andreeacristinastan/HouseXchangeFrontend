export const buttonStyleLeft = {
  width: "30px",
  background: "none",
  marginLeft: "2%",
  marginTop: "5%",
  border: "0px",
  outline: "none",
};

export const buttonStyleRight = {
  width: "30px",
  background: "none",
  marginRight: "3%",
  marginTop: "5%",
  border: "0px",
  outline: "none",
};

export const properties = {
  prevArrow: (
    <button style={{ ...buttonStyleLeft }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff">
        <path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z" />
      </svg>
    </button>
  ),
  nextArrow: (
    <button style={{ ...buttonStyleRight }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff">
        <path d="M512 256L270 42.6v138.2H0v150.6h270v138z" />
      </svg>
    </button>
  ),
};
