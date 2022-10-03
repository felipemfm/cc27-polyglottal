import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStationTimeTable } from "../../store/slices/railwaySlice";

function OptionSelect() {
  const railwayData = useSelector((state) => state.railway.data);
  const dispatch = useDispatch();

  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    selectedData && dispatch(fetchStationTimeTable(selectedData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedData]);

  return (
    <div>
      <select
        className="form-control"
        onChange={(e) => setSelectedData(e.target.value)}
      >
        <option key={0} defaultValue=""></option>
        {railwayData.map((element, i) => (
          <>
            <option
              key={`${i + 1}${element.ascending}`}
              value={`${element.operator}/${element.station}/${element.line}/${element.ascending}`}
            >
              {element.station_en}→{element.line_en}→
              {element.ascending
                .replace("odpt.RailDirection:", "")
                .replace(`${element.operator}.`, "")}
            </option>
            <option
              key={`${i + 1}${element.descending}`}
              value={`${element.operator}/${element.station}/${element.line}/${element.descending}`}
            >
              {element.station_en}→{element.line_en}→
              {element.descending
                .replace("odpt.RailDirection:", "")
                .replace(`${element.operator}.`, "")}
            </option>
          </>
        ))}
      </select>
    </div>
  );
}

export default OptionSelect;
