import { useState } from "react";
import Asset from "./components/Asset/Asset";
import { v4 as uuidv4 } from "uuid";
import "./App.scss";

function App() {
  const [links, setLinks] = useState([]);
  const [error, setError] = useState({
    name: null,
    assetName: null,
    shown: false
  });

  const upload = (e) => {
    e.preventDefault();
    setLinks([...links, { id: uuidv4(), url: e.target.url.value }]);
  };

  const deleteAsset = (id) => {
    setLinks([...links.filter((item) => item.id !== id)]);
  };

  const updateErrors = (errorName, assetName) => {
    setError({...error, name: errorName, assetName: assetName, shown: true});
    setTimeout(() => {
      setError({...error, name: errorName, assetName: assetName, shown: false})
    }, 5000);
  };

  return (
    <div className="main">
      <form className="upload" onSubmit={upload}>
        <strong>Upload files to add on canvas:</strong>
        <div className="upload-url__wrapper">
          <input
            className="upload-url"
            id="url"
            type="url"
            placeholder="Pleas provide direct link to an asset"
            pattern="^https?:\/\/.+\.(jpg|jpeg|png|webp|gif|svg|mp4|avi|mkv)$"
          />
          <input type="submit" value="Load" className="upload-button" />
        </div>
      </form>
      <div className={error.shown ? "error shown" : "error"}>{error.name} on <span className="error__asset">{error.assetName}</span></div>
      <div className="hints">
        <span>Drag assets by their name to reposition it</span>
        <span>Resize assets by dragging their bottom right corner</span>
      </div>

      <div className="canvas-container">
        {links.map((link) => (
          <Asset
            {...link}
            key={link.id}
            deleteAsset={deleteAsset}
            updateErrors={updateErrors}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
