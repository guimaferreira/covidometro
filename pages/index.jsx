import Head from "next/head";
import Layout, { appTitle } from "../components/Layout/Layout";
import TextField from "@material-ui/core/TextField";
import Diagnosis from "../components/Diagnosis/Diagnosis";
import styles from "../styles/Home.module.sass";

export default function Home({}) {
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
                <Diagnosis city={city} />
            </section>
        </Layout>
    );
}
