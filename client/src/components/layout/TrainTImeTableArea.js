import TrainTimeTable from "../modules/TrainTImeTable";

function TrainTimeTableArea({ time }) {
  return (
    <div className="container-flex">
      <TrainTimeTable time={time} />
    </div>
  );
}

export default TrainTimeTableArea;
