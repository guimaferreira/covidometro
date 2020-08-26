import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import DateLocal from "../../helpers/DateLocal.helper";
import Typography from "@material-ui/core/Typography";
import utilsStyles from "../../styles/utils.module.sass";

export default function DiagnosisDate({ date, type }) {
    const typeValue = type == "Real" ? "Dados Reais" : "Previsão";

    const dateFormatted = format(DateLocal(date), "PPP", {
        locale: ptBR
    });

    // TODO: Style {typeValue}
    return (
        <Typography>
            <strong>
                <span className={`${utilsStyles.label} label`}>
                    {typeValue}
                </span>{" "}
                {dateFormatted}
            </strong>
        </Typography>
    );
}
