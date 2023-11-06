import { useEffect, useRef, useState } from "react";
import DeleteIcon from "./delete.svg";
import Draggable from "react-draggable";
import "./Asset.scss";

function Asset({ id, url, deleteAsset }) {
  const ref = useRef(null);
  const [asset, setAsset] = useState({
    id: id,
    url: url,
    name: url.substring(url.lastIndexOf("/") + 1),
    type: /\.(gif|jpg|jpeg|tiff|png)$/.test(url) ? "image" : "video",
    response: null,
    width: null,
    height: null,
    x: null,
    y: null,
  });

  useEffect(() => {
    async function getData() {
      const response = await fetch(asset.url);
      const data = await response;
      setAsset({ ...asset, response: data });
    }

    getData();
  }, []);

  const updatePosition = () => { 
    if (!ref.current) return;
    const position = ref.current.getBoundingClientRect();
    setAsset({
      ...asset,
      width: Math.round(position.width),
      height: Math.round(position.height),
      x: Math.round(position.x),
      y: Math.round(position.y)
    });
  };

  // update asset size
  useEffect(() => {
    if (!ref.current) return;
    const resizeObserver = new ResizeObserver(() => {
      updatePosition();
    });
    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect(); // surely this works and wont make the app buggy with deleting assets
  }, [asset.response]); // need to combine this with updatePosition

  return (
    asset.response && (
      <Draggable bounds="parent" handle=".Asset__DragArea" onDrag={updatePosition}>
        <div className="Asset" ref={ref}>
          <img
            src={DeleteIcon}
            className="Asset__delete"
            onClick={() => deleteAsset(asset.id)}
          />
          <div className="Asset__DragArea">{asset.name || "Asset"}</div>
          <div className="Asset__data">X {asset.x} | Y {asset.y} | W {asset.width}px | H {asset.height}px</div>
          {asset.type === "image" ? (
            <img src={asset.url} onLoad={updatePosition} />
          ) : (
            <video
              src={asset.url}
              allowFullScreen
              controls
              onLoadedMetadata={updatePosition}
            />
          )}
        </div>
      </Draggable>
    )
  );
}

export default Asset;
