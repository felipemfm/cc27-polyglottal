import { useState, useEffect } from "react";

import Header from "./components/layout/Header";
import InputArea from "./components/layout/InputArea";
import StationTimeTableArea from "./components/layout/StationTimeTableArea";
import TrainTimeTableArea from "./components/layout/TrainTImeTableArea";

function App() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setTime(`${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  console.log(time);

  return (
    <div className="container">
      <Header time={time} />
      <InputArea />
      <StationTimeTableArea time={time} />
      <TrainTimeTableArea time={time} />
    </div>
  );
}

export default App;
