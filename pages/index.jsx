import Head from "next/head";
import Layout, { appTitle } from "../components/layout";
import TextField from "@material-ui/core/TextField";
import styles from "../styles/Home.module.sass";
import utilsStyles from "../styles/utils.module.sass";

export default function Home({ allPostsData }) {
    return (
        <Layout home>
            <Head>
                <title>{appTitle}</title>
            </Head>
            <header className={utilsStyles.padding}>
                <TextField
                    variant="outlined"
                    label="Qual sua cidade?"
                    size="small"
                    fullWidth
                />
            </header>
        </Layout>
    );
}
