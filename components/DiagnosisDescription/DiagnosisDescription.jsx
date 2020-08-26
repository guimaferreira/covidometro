import { format } from "date-fns";
import Typography from "@material-ui/core/Typography";

export default function DiagnosisDescription({ deltas }) {
    // TODO: Fazer dinâmico
    const city = "Cláudio",
        delta = deltas[1] < 1 ? deltas[0] : deltas[1];

    const deltaValue = Math.round(Math.abs(delta) * 100);

    let deltaDescription = `${deltaValue}%`;
    let benchmarking =
        deltas[1] < 1
            ? "óbitos por doenças do aparelho respiratório"
            : "todas as mortes";

    if (delta == 0) deltaDescription = "igual";
    else {
        let comparation = " maior";

        if (delta < 0) {
            comparation = " menor";

            if (delta >= -0.35) deltaDescription = `apenas ${deltaDescription}`;
        }

        deltaDescription += comparation;
    }

    return (
        <Typography>
            <p>
                O índice atual de óbitos por COVID-19 está{" "}
                <strong>{deltaDescription}</strong> que o índice de{" "}
                {benchmarking} em {city} no ano de 2018.
            </p>
        </Typography>
    );
}
