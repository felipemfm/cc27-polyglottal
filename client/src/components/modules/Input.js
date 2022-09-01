import { useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchRailwayData } from "../../store/slices/railwaySlice";

function Input() {
  const textInputRef = useRef(null);
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    let value = textInputRef.current.value;
    dispatch(fetchRailwayData(value));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter line or station"
            ref={textInputRef}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="submit">
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Input;
