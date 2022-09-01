import Header from "./components/layout/Header";
import InputArea from "./components/layout/InputArea";
import StationTimeTableArea from "./components/layout/StationTimeTableArea";
import TrainTimeTableArea from "./components/layout/TrainTImeTableArea";

function App() {
  return (
    <div>
      <Header />
      <InputArea />
      <StationTimeTableArea />
      <TrainTimeTableArea />
    </div>
  );
}

export default App;
