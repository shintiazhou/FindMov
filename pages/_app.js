import '../styles/globals.css'
import Layout from "../components/Layout"
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#DA0037",
      light: "#444444"
    },
    secondary: {
      main: "#171717",
      light: "#EDEDED"
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp
