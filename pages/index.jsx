import Head from "next/head";
import Layout, { appTitle } from "../components/Layout/Layout";
import TextField from "@material-ui/core/TextField";
import Diagnosis from "../components/Diagnosis/Diagnosis";
import styles from "../styles/Home.module.sass";
import utilsStyles from "../styles/utils.module.sass";

export default function Home({ allPostsData }) {
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
                    defaultValue="Cláudio, MG"
                />
            </header>
            <section>
                <Diagnosis />
            </section>
        </Layout>
    );
}
