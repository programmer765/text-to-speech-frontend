import { useState } from "react";
import "./App.css";
import play from "./play.png";

function App() {
  const [text, setText] = useState("");
  const speech = new SpeechSynthesisUtterance();
  speech.voice = speechSynthesis.getVoices()[156];
  speech.lang = "hi-IN";

  const fetchData = async () => {
    let data = new URLSearchParams();
    data.append("text", text);

    console.log(data);
    const res = await fetch("http://localhost:8000/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data,
    });
    return res.json();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`form submitted: ${text}`);
    fetchData().then((data) => {
      speech.text = data.result;
    });
  };

  const handleClick = () => {
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="App">
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <p className="head_text">Input your text here</p>
          <label>
            <div className="label_text">Text Input</div>
            <input
              type="text"
              placeholder=""
              title=""
              className="input"
              onChange={(e) => setText(e.target.value)}
            />
          </label>
          <button type="submit" className="button">
            Translate to Hindi
          </button>
          <button type="button" className="play" onClick={handleClick}>
            <img src={play} alt="" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
