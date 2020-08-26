import "../styles/globals.sass";
import Router from "next/router";
import withGA from "next-ga";

function App({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

export default withGA("G-F5R9EGE19M", Router)(App);
