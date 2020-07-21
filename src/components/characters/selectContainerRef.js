import React, { useState, useEffect, useCallback, useRef } from "react";
//import useEventListener from "./useEvent";
function SelectContainerRef(props) {
  const scrollContainer = useRef(null);

  const [coords, setCoords] = useState({ x: 0, y: 0 });

  /* const handler = useCallback(event => {
 
    if (
      event.target.offsetHeight + event.target.scrollTop >=
      event.target.scrollHeight
    ) {
      alert("Llegamos al final del bloque");
    }
  }, []);

  useEventListener("scroll", handler);*/
  return (
    <div
      ref={scrollContainer}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      {props.children}
    </div>
  );
}

export default SelectContainerRef;
