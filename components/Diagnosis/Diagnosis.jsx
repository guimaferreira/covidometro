import _ from "lodash";
import React, { useState } from "react";
import DiagnosisDate from "../DiagnosisDate/DiagnosisDate";
import Slider from "@material-ui/core/Slider";
import GaugeChart from "react-gauge-chart-nextjs-support";

const data = require("../../public/data/mg-claudio.json");

export default function Diagnosis({}) {
    const [epoch, setEpoch] = useState(0);

    const index = _.findLastIndex(data, { type: "Real" }) + epoch;
    const current = data[index];

    return (
        <div>
            <DiagnosisDate date={current.date} type={current.type} />
            <h1>Mortalidade {current.deaths_situation}</h1>
            <GaugeChart
                id="gauge-chart1"
                animDelay={0}
                nrOfLevels={5}
                marginInPercent={0.04}
                colors={["#02bbd4", "#ffc009", "#ff5723", "#e91e63", "#9b27af"]}
                textColor="#000000"
                arcWidth={0.3}
                cornerRadius={12}
                percent={current.deaths_gauge}
                hideText={true}
            />
            <Slider
                value={epoch}
                min={-15}
                max={15}
                marks={true}
                onChange={(ev, value) => setEpoch(value)}
            />
        </div>
    );
}
