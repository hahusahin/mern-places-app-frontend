import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import "./SideDrawer.css";

const SideDrawer = (props) => {
  return ReactDOM.createPortal(
    <CSSTransition
      in={props.show}
      timeout={500}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className="side-drawer" onClick={props.onClick}>{props.children}</aside>
    </CSSTransition>,
    document.getElementById("drawer-hook")
  );
};

export default SideDrawer;
