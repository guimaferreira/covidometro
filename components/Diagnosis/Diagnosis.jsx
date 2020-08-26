import _ from "lodash";
import { format } from "date-fns";
import React, { useState } from "react";
import DiagnosisDate from "../DiagnosisDate/DiagnosisDate";
import DiagnosisDescription from "../DiagnosisDescription/DiagnosisDescription";
import Slider from "@material-ui/core/Slider";
import GaugeChart from "react-gauge-chart-nextjs-support";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";
import styles from "./Diagnosis.module.sass";
import utilsStyles from "../../styles/utils.module.sass";
import Grid from "@material-ui/core/Grid";
import Kpi from "../Kpi/Kpi";

const data = require("../../public/data/mg-claudio.json");

export default function Diagnosis({}) {
    const startIndex = _.findIndex(data, { deaths_cum: 1 }) - 1;
    const diagnosisData = data.slice(startIndex);

    const currentIndex = _.findLastIndex(diagnosisData, { type: "Real" });

    const [epoch, setEpoch] = useState(currentIndex);

    const current = diagnosisData[epoch];
    const chartData = data; //data.slice(epoch - 15, epoch + 14);

    const colors = ["#02bbd4", "#ffc009", "#ff5723", "#e91e63", "#9b27af"];
    const needleColor = colors[Math.floor(current.deaths_gauge * 5)];

    const sliderLabelFormat = (value) => {
        return format(current.date, "dd/MM");
    };

    return (
        <div className={styles.container}>
            <DiagnosisDate date={current.date} type={current.type} />
            <h1>Mortalidade {current.deaths_situation}</h1>
            <GaugeChart
                id="gauge-chart1"
                animDelay={0}
                nrOfLevels={5}
                marginInPercent={0.04}
                colors={colors}
                textColor="#000000"
                arcWidth={0.3}
                cornerRadius={4}
                percent={current.deaths_gauge}
                hideText={true}
                needleColor={needleColor}
                needleBaseColor={needleColor}
            />
            <Slider
                value={epoch}
                min={0}
                max={diagnosisData.length - 1}
                valueLabelDisplay="on"
                valueLabelFormat={sliderLabelFormat}
                onChange={(ev, value) => setEpoch(value)}
            />
            <DiagnosisDescription deltas={current.deaths_index_delta} />
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Kpi type={current.type} value={current.cases_cum}>
                        casos confirmados
                    </Kpi>
                </Grid>
                <Grid item xs={6}>
                    <Kpi type={current.type} value={current.deaths_cum}>
                        óbitos registrados
                    </Kpi>
                </Grid>
            </Grid>
            {/* <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                    <LineChart
                        width={500}
                        height={300}
                        data={chartData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="cases_cum"
                            stroke="#8884d8"
                            activeDot={{ r: 1 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div> */}
        </div>
    );
}
