import { useState } from "react";
import ProgressBar from "./ProgressBar";

function UpdloadForm() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const types = ["image/jpeg", "image/png","image/jpg"];

  const changeHandler = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please selected img file(png or jpeg)");
    }
    e.preventDefault();
  };

  return (
    <form>
      <label>
        <input type="file" onChange={changeHandler} />
        <span>+</span>
      </label>
     
      <div className="output">
        {error && <div className="error">{error}</div>}
        {file && <div>{file.name}</div>}
        {file && <ProgressBar file={file} setFile={setFile}/>}
      </div>
    </form>
  );
}

export default UpdloadForm;
