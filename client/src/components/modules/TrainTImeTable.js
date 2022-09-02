import { useSelector } from "react-redux";

function TrainTimeTable({ time }) {
  const trainTimeTable = useSelector((state) => state.railway.trainTimeTable);

  return (
    <div className="overflow-auto table-hover" style={{ maxHeight: "500px" }}>
      <p>Train Timetable</p>
      <table className="table-sm">
        <thead>
          <tr>
            <th scope="col">Time</th>
            <th scope="col">Station</th>
          </tr>
        </thead>
        <tbody>
          {trainTimeTable.map((element, i) => (
            <tr key={i}>
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
