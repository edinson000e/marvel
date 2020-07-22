import React, { useRef } from "react";
//import useEventListener from "./useEvent";
function SelectContainerRef(props) {
  const scrollContainer = useRef(null);

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
