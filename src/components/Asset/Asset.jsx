import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import "./Asset.scss";

function Asset(props) {
  const { id, url } = props;
  const name = url.substring(url.lastIndexOf("/") + 1);
  const ref = useRef(null);
  const [customHeight, setCustomHeight] = useState(200);

  const aspectRatio = 40; // percentage

  useEffect(() => {
    if (!ref.current) return;
    const resizeObserver = new ResizeObserver(() => {
      if (!ref.current) return;
      // since user can only change the width, here height should be changed
      setCustomHeight(
        Math.round((ref.current.clientWidth / 100) * aspectRatio),
      );
    });
    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect(); // clean up
  }, []);



  return (
    <Draggable bounds="parent" handle=".DragArea">
      <div className="Asset" ref={ref} style={{ height: customHeight }}>
        <div className="DragArea">{name || "Asset"}</div>
      </div>
    </Draggable>
  );
}

export default Asset;
