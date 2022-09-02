import { useDispatch, useSelector } from "react-redux";
import { fetchTrainTimeTable } from "../../store/slices/railwaySlice";

function StationTimeTable({ time }) {
  const stationTimeTable = useSelector(
    (state) => state.railway.stationTimeTable
  );
  const dispatch = useDispatch();

  return (
    <div className="overflow-auto table-hover" style={{ maxHeight: "500px" }}>
      <p>Station Timetable</p>
      <table className="table-sm">
        <thead>
          <tr>
            <th scope="col">Time</th>
            <th scope="col">Destination</th>
            <th scope="col">Type</th>
          </tr>
        </thead>
        <tbody>
          {stationTimeTable.map((element, i) => (
            <tr
              key={i}
              onClick={() =>
                dispatch(fetchTrainTimeTable(element.train_number))
              }
            >
              <td>{element.departure_time}</td>
              <td className="text-wrap">{element.destination.station}</td>
              <td className="text-wrap">{element.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StationTimeTable;
