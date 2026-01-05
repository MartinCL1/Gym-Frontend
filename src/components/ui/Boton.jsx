const Boton = ({ Icon, text }) => {
  return (
    <button style={{display: "flex", alignItems: "center", gap: "4px", backgroundColor: "black"}}>
      <span style={{color: "white"}}>{text}</span>
      <Icon width={15} />
    </button>
  );
};

export default Boton;