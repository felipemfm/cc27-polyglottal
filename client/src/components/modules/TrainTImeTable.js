import { useSelector } from "react-redux";

function TrainTimeTable() {
  const trainTimeTable = useSelector((state) => state.railway.trainTimeTable);

  return (
    <div className="overflow-auto table-hover" style={{ maxHeight: "500px" }}>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Time</th>
            <th scope="col">Station</th>
          </tr>
        </thead>
        <tbody>
          {trainTimeTable.map((element, i) => (
            <tr key={i}>
              <th scope="row">{i}</th>
              <td>{element.time}</td>
              <td>{element.station}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TrainTimeTable;
