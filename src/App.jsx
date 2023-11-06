import { useEffect, useRef, useState } from "react";
import "./App.scss";

function App() {
  const upload = (e) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <div className="main">
      <form className="upload" onSubmit={upload}>
        <strong>Upload files to add on canvas:</strong>
        <div className="upload-url__wrapper">
          <input
            className="upload-url"
            type="url"
            placeholder="Pleas provide direct link to an asset"
          />
          <input type="submit" value="Load" className="upload-button"/>
        </div>
      </form>

      <div className="canvas-container"></div>
    </div>
  );
}

export default App;
