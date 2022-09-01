import { useDispatch, useSelector } from "react-redux";
import { fetchTrainTimeTable } from "../../store/slices/railwaySlice";

function StationTimeTable() {
  const stationTimeTable = useSelector(
    (state) => state.railway.stationTimeTable
  );
  const dispatch = useDispatch();

  return (
    <div className="overflow-auto table-hover" style={{ maxHeight: "500px" }}>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Time</th>
            <th scope="col">Destination</th>
            <th scope="col">Type</th>
          </tr>
        </thead>
        <tbody>
          {stationTimeTable.map((element, i) => (
            <tr
              key={i}
              onClick={() => dispatch(fetchTrainTimeTable(element.train_number))}
            >
              <th scope="row">{i}</th>
              <td>{element.departure_time}</td>
              <td>{element.destination.station}</td>
              <td>{element.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StationTimeTable;
