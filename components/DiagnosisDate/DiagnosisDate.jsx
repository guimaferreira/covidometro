import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export default function DiagnosisDate({ date, type }) {
    const typeValue = type == "Real" ? "Dados Reais" : "Previsão";

    const dateFormatted = format(date + 3 * 60 * 60 * 1000, "PPP", {
        locale: ptBR
    });
    return (
        <div>
            <span>{typeValue}</span>, {dateFormatted}{" "}
        </div>
    );
}
