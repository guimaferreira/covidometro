import Head from "next/head";
import Layout, { appTitle } from "../components/Layout/Layout";
import TextField from "@material-ui/core/TextField";
import Diagnosis from "../components/Diagnosis/Diagnosis";
import styles from "../styles/Home.module.sass";
import { getCityDiagnosis } from "../lib/cityDiagnosis";

export async function getStaticProps() {
    const diagnosis = await getCityDiagnosis();

    return {
        props: {
            diagnosis
        }
    };
}

export default function Home({ diagnosis }) {
    const city = "Cláudio, MG";
    return (
        <Layout>
            <Head>
                <title>{appTitle}</title>
            </Head>
            <header className={styles.header}>
                <TextField
                    variant="outlined"
                    label="Qual sua cidade?"
                    size="small"
                    fullWidth
                    defaultValue={city}
                />
            </header>
            <section>
                <Diagnosis city={city} diagnosis={diagnosis} />
            </section>
        </Layout>
    );
}
