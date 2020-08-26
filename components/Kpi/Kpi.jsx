import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import styles from "./Kpi.module.sass";

export default function Kpi({ children, round, type, value }) {
    const valueLabel = round ? Math.round(value) : value;

    return (
        <Card className={styles.root} variant="outlined">
            <CardContent>
                <Typography className={styles.title} color="textSecondary">
                    {children}
                </Typography>
                <Typography variant="h5" component="h2">
                    {valueLabel}
                </Typography>
            </CardContent>
        </Card>
    );
}
