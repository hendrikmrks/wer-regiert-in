// GermanyMap.jsx
import React, { useState } from "react";
import statesData from "../data/statesData.json";
import "bootstrap/dist/css/bootstrap.min.css";
import StateModal from "./StateModal.jsx";
import useLoadGeoData from "../hooks/loadGeoData.jsx";

const GermanyMap = () => {
  const [selectedState, setSelectedState] = useState(null);
  const [svgPaths, setSvgPaths] = useState({});
  const [show, setShow] = useState(false);
  const handleClosePopUp = () => {
    setShow(false);
    setSelectedState(null);
  };
  const handleShowPopUp = () => setShow(true);

  useLoadGeoData(svgPaths, setSvgPaths);

  const handleStateClick = (stateId) => {
    setSelectedState(stateId);
  };

  return (
    <>
      <div className="germany-map-container">
        <svg viewBox="0 0 800 900" className="germany-map">
          {Object.keys(svgPaths).map((stateId) => {
            const stateInfo = statesData[stateId] || { name: stateId };
            const stateName = stateInfo.name;
            const landColor = statesData["parties"][statesData[stateId]["government"][0]["party"]]["background-color"]
            const borderColor = statesData["parties"][statesData[stateId]["government"][0]["party"]]["color"]

            return (
              <path
                key={stateId}
                d={svgPaths[stateId]}
                fill={selectedState === stateId ? "#d1e0f5" : landColor}
                stroke="#505050"
                strokeWidth="2"
                onClick={() => {
                  handleStateClick(stateId);
                  handleShowPopUp();
                }}
                onMouseEnter={(event) => {
                  event.target.style.fill = borderColor;
                }}
                onMouseLeave={(event) => {
                  event.target.style.fill = landColor;
                }}
                data-state={stateId}
                className="state-path"
              >
                <title>{stateName}</title>
              </path>
            );
          })}
        </svg>
      </div>
      <StateModal selectedState={selectedState} show={show} handleClosePopUp={handleClosePopUp} statesData={statesData} />
    </>
  );
};
export default GermanyMap;
