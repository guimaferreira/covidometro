import _ from "lodash";
import { format } from "date-fns";
import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import DiagnosisDate from "../DiagnosisDate/DiagnosisDate";
import DiagnosisDescription from "../DiagnosisDescription/DiagnosisDescription";
import Slider from "@material-ui/core/Slider";
import GaugeChart from "react-gauge-chart-nextjs-support";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
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
import { Typography } from "@material-ui/core";

const data = require("../../public/data/mg-claudio.json");

export default function Diagnosis({}) {
    const startIndex = _.findIndex(data, { deaths_cum: 1 }) - 1;
    const diagnosisData = data.slice(startIndex);

    const currentIndex = _.findLastIndex(diagnosisData, { type: "Real" });

    const [epoch, setEpoch] = useState(currentIndex);

    const current = diagnosisData[epoch];

    const chartData = data.slice(0, startIndex + epoch);

    const situations = ["Normal", "Controlada", "Grave", "Crítica", "Trágica"];
    const colorIndex = situations.indexOf(current.deaths_situation);
    const colors = ["#02bbd4", "#ffc009", "#ff5723", "#e91e63", "#9b27af"];
    const needleColor = colors[colorIndex];

    const stylesColors = [
        "normal",
        "controlled",
        "serious",
        "critical",
        "tragic"
    ];
    const styleColor = styles[stylesColors[colorIndex]];

    const sliderLabelFormat = (value) => {
        // TODO: Usar timezone
        return format(current.date + 3 * 60 * 60 * 1000, "dd/MM");
    };

    const chartXTickFormat = (date) => {
        return format(date, "dd/MM");
    };

    return (
        <div className={`${styles.container} ${styleColor}`}>
            <div className={styles.text}>
                <DiagnosisDate
                    className={styles.text}
                    date={current.date}
                    type={current.type}
                />
            </div>
            <h1>Mortalidade {current.deaths_situation}</h1>
            <GaugeChart
                id="gauge-chart1"
                animDelay={100}
                nrOfLevels={5}
                marginInPercent={0.06}
                arcPadding={0.02}
                colors={colors}
                textColor="#000000"
                arcWidth={0.4}
                cornerRadius={4}
                percent={current.deaths_gauge}
                hideText={true}
                needleColor={needleColor}
                needleBaseColor={needleColor}
            />
            <div className={styles.text}>
                <DiagnosisDescription deltas={current.deaths_index_delta} />
            </div>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Kpi type={current.type} value={current.cases_time}>
                        1 caso a cada
                    </Kpi>
                </Grid>
                <Grid item xs={6}>
                    <Kpi type={current.type} value={current.deaths_time}>
                        1 óbito a cada
                    </Kpi>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Kpi
                        type={current.type}
                        value={current.cases_cum}
                        rount={true}
                    >
                        Casos
                    </Kpi>
                </Grid>
                <Grid item xs={6}>
                    <Kpi
                        type={current.type}
                        value={current.deaths_cum}
                        rount={true}
                    >
                        Óbitos
                    </Kpi>
                </Grid>
            </Grid>
            <Card raised={true} className={styles.slider}>
                <Slider
                    classes={{
                        valueLabel: styles.MuiSliderValueLabel,
                        thumb: styles.MuiSliderThumb
                    }}
                    value={epoch}
                    min={0}
                    max={diagnosisData.length - 1}
                    valueLabelDisplay="on"
                    valueLabelFormat={sliderLabelFormat}
                    onChange={(ev, value) => setEpoch(value)}
                />
            </Card>
            <div>
                <h2>Evolução dos Casos</h2>
                <Typography>
                    <div
                        className={styles.chart}
                        style={{ width: "100%", height: 200 }}
                    >
                        <ResponsiveContainer>
                            <AreaChart
                                data={chartData}
                                margin={{
                                    top: 0,
                                    right: 0,
                                    left: 0,
                                    bottom: 0
                                }}
                            >
                                <defs>
                                    <linearGradient
                                        id="colorUv"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor={needleColor}
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor={needleColor}
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="date"
                                    type="number"
                                    domain={["dataMin", "dataMax"]}
                                    tickFormatter={chartXTickFormat}
                                />
                                <YAxis
                                    hide={true}
                                    domain={["dataMin", "dataMax"]}
                                />
                                <Tooltip />
                                <Area
                                    data={chartData.filter(
                                        (d) => d.type == "Real"
                                    )}
                                    type="monotone"
                                    dataKey="cases_cum"
                                    stroke={needleColor}
                                    activeDot={{ r: 1 }}
                                    fill="url(#colorUv)"
                                />
                                <Area
                                    data={chartData.filter(
                                        (d, key, arr) =>
                                            d.type == "Previsão" ||
                                            _.get(arr[key + 1], "type") ==
                                                "Previsão"
                                    )}
                                    type="monotone"
                                    dataKey="cases_cum"
                                    stroke={needleColor}
                                    activeDot={{ r: 1 }}
                                    fill="url(#colorUv)"
                                    strokeDasharray="4 4"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Typography>
            </div>
        </div>
    );
}
