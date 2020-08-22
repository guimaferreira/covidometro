import Head from "next/head";
import styles from "./layout.module.sass";
import utilsStyles from "../styles/utils.module.sass";
import Box from "@material-ui/core/Box";

export const appTitle = "COVIDOMETRO.com";

export default function Layout({ children, home }) {
    return (
        <div className={styles.container}>
            <Head>
                <title>{appTitle}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className={styles.header}>
                <Box className={utilsStyles.title}>{appTitle}</Box>
            </header>
            <main>{children}</main>
        </div>
    );
}
