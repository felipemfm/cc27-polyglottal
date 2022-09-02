import StationTimeTable from "../modules/StationTimeTable";
import TrainTimeTable from "../modules/TrainTImeTable";

function Grid({ time }) {
  return (
    <div className="row">
      <div className="col">
        <StationTimeTable time={time} />
      </div>
      <div className="col">
        <TrainTimeTable time={time} />
      </div>
    </div>
  );
}

export default Grid;
