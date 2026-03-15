import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

const Delta = () => {
    const state = useSelector((state) => state?.locations?.weather || []);
    const [deltaData, setDeltaData] = useState({});
    const calculateDelta = (locationA, locationB) => {
        if (!locationA?.weather?.length || !locationB?.weather?.length) {
            return { deltas: [], average: 0 };
        }

        const deltas = locationA.weather.map((day, index) => {
            const tempA = Math.ceil(day?.values?.temperatureAvg ?? 0);
            const tempB = Math.ceil(locationB?.weather?.[index]?.values?.temperatureAvg ?? 0);
            return {
            date: new Date(day?.time).toLocaleDateString(),
            delta: tempA - tempB
            };
        });
        const average = deltas.reduce((sum, item) => sum + item.delta, 0) / (deltas.length || 1);
        return { deltas, average };
    };
    useEffect(() => {
    if (state?.length >= 2) {
        const deltaValues = calculateDelta(state[0], state[1]);
        setDeltaData(deltaValues);
    }

    if(state?.length == 0){
        setDeltaData({});
    }
    }, [state]);

    return (
        <React.Fragment>
            {deltaData?.deltas && <div className="table-container">
                <h3>Temperature Delta Comparison</h3>
                <table className="delta-table">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Delta (°C)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {deltaData?.deltas.map((item) => (
                        <tr key={item.date}>
                            <td>{item.date}</td>
                            <td>
                                {item.delta} {"\u00B0C"}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                    <tfoot>
                    <tr>
                        <td>Average Delta</td>
                        <td className="average">{deltaData?.average.toFixed(1)} {"\u00B0C"}</td>
                    </tr>
                    </tfoot>
                </table>
            </div>}
        </React.Fragment>
    );
}

export default Delta;