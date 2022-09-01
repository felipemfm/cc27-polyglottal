import StationTimeTable from "../modules/StationTimeTable";

function StationTimeTableArea({time}) {
  return (
    <div className="container-flex">
      <StationTimeTable time={time}/>
    </div>
  );
}

export default StationTimeTableArea;
