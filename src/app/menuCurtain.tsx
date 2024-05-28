function MenuCurtain(props: any) {
  function expand(): void {
    const curtain=document.getElementById(props.id);
    if (curtain) {
      curtain.style.width = "100%";
    }
  }

  function wrap(): void {
    const curtain=document.getElementById(props.id);
    if (curtain) {
      curtain.style.width = "0%";
    }  }

  return (
    <>
      <div id={props.id} className="overlay">
        <button className="closebtn" onClick={wrap}>
          &times;
        </button>

        <div className="overlay-content">
          {props.children}
        </div>
      </div>

      <button onClick={expand}>EXPAND MENU</button>
    </>
  );
}

export default MenuCurtain;
