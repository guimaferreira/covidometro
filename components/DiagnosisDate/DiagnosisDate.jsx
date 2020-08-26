import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import Typography from "@material-ui/core/Typography";

export default function DiagnosisDate({ date, type }) {
    const typeValue = type == "Real" ? "Dados Reais" : "Previsão";

    // TODO: Correct timezone
    const dateFormatted = format(date + 3 * 60 * 60 * 1000, "PPP", {
        locale: ptBR
    });

    // TODO: Style {typeValue}
    return (
        <Typography>
            <span>{typeValue}</span>, {dateFormatted}{" "}
        </Typography>
    );
}
