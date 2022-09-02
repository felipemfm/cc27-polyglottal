import { useState, useEffect } from "react";

import Header from "./components/layout/Header";
import InputArea from "./components/layout/InputArea";
import Grid from "./components/layout/grid";

function App() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setTime(`${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <Header time={time} />
      <InputArea />
      <Grid time={time} />
    </div>
  );
}

export default App;
