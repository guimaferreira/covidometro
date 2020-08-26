import Head from "next/head";
import styles from "./Layout.module.sass";
import utilsStyles from "../../styles/utils.module.sass";
import { Box, createMuiTheme, CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#0097a7"
        },
        secondary: {
            main: "#ff4081"
        }
    }
});

export const appTitle = "COVIDOMETRO.com";

export default function Layout({ children, home }) {
    return (
        <div>
            <Head>
                <title>{appTitle}</title>
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className={styles.container}>
                    <header className={styles.header}>
                        <Box className={utilsStyles.title}>{appTitle}</Box>
                    </header>
                    <main>{children}</main>
                </div>
            </ThemeProvider>
        </div>
    );
}
