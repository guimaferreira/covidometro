import _ from "lodash";
import { format, formatDistanceStrict } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import Head from "next/head";
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
    Legend,
    XAxis,
    YAxis,
    Tooltip
} from "recharts";
import styles from "./Diagnosis.module.sass";
import Grid from "@material-ui/core/Grid";
import Kpi from "../Kpi/Kpi";
import { Typography } from "@material-ui/core";
import DateLocal from "../../helpers/DateLocal.helper";

// const data = require("../../public/data/mg-claudio.json");

export default function Diagnosis({ city, diagnosis }) {
    const data = diagnosis;
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
        return format(DateLocal(current.date), "dd/MM");
    };

    const chartXTickFormat = (date) => {
        return format(date, "dd/MM");
    };

    const getTime = (time) => {
        if (!time) return null;

        return formatDistanceStrict(0, time, { locale: ptBR });
    };

    const casesTime = getTime(current.cases_time),
        deathsTime = getTime(current.deaths_time);

    const pageTitle = `COVIDOMETRO.com: ${city}`;
    const pageImage = `/images/covidometro-${current.deaths_situation.toLowerCase()}.jpg`;

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta
                    name="og:description"
                    content="Descubra qual a situação atual e o futuro da COVID-19 na sua cidade."
                />
                <meta property="og:image" content={pageImage} />
            </Head>
            <div className={`${styles.container} ${styleColor}`}>
                <h1>Mortalidade {current.deaths_situation}</h1>
                <GaugeChart
                    id="gauge-chart1"
                    animDelay={100}
                    nrOfLevels={5}
                    marginInPercent={0.06}
                    arcPadding={0.02}
                    colors={colors}
                    arcWidth={0.4}
                    cornerRadius={4}
                    percent={current.deaths_gauge}
                    hideText={true}
                    needleColor={needleColor}
                    needleBaseColor={needleColor}
                />
                <div className={styles.text}>
                    <DiagnosisDate date={current.date} type={current.type} />
                    <DiagnosisDescription deltas={current.deaths_index_delta} />
                </div>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Kpi type={current.type} value={casesTime}>
                            1 caso a cada
                        </Kpi>
                    </Grid>
                    <Grid item xs={6}>
                        <Kpi type={current.type} value={deathsTime || "."}>
                            {deathsTime ? "1 óbito a cada" : "Nenhum óbito"}
                        </Kpi>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Kpi
                            type={current.type}
                            value={current.cases_cum}
                            round={true}
                        >
                            Casos
                        </Kpi>
                    </Grid>
                    <Grid item xs={6}>
                        <Kpi
                            type={current.type}
                            value={current.deaths_cum}
                            round={true}
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
                                    <Legend
                                        verticalAlign="bottom"
                                        height={24}
                                        iconType="plainline"
                                    />
                                    <Area
                                        data={chartData.filter(
                                            (d) => d.type == "Real"
                                        )}
                                        type="monotone"
                                        dataKey="cases_cum"
                                        stroke={needleColor}
                                        activeDot={{ r: 1 }}
                                        fill="url(#colorUv)"
                                        name="Real"
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
                                        name="Previsão"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Typography>
                    <Typography>
                        <span className={styles.disclaimer}>
                            <strong>Aviso Legal</strong>
                            <br />
                            <em>
                                Esta é uma versão experimental não oficial do
                                COVIDOMETRO.com, as informações desta versão
                                podem sofrer alterações sem qualquer aviso
                                prévio.
                            </em>
                            <br />
                            Os dados reais foram extraídos dos boletins da
                            Prefeitura no Instagram, as previsões estatísticas
                            foram baseadas nestes dados.
                            <br />
                            Os dados de comparação com os óbitos de 2018 foram
                            feitos de acordo com o relatório anual de
                            mortalidade no Brasil (DataSUS, 2018).
                        </span>
                    </Typography>
                </div>
            </div>
        </>
    );
}
