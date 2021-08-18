import styles from "../styles/layout.module.css"
import Nav from "./navigation/Nav"
import BottomNav from "./navigation/BottomNav"
import Footer from "./Footer"
const Layout = ({ children }) => {
    return (
        <>
            <nav>
                <Nav />
            </nav>
            <div className={styles.container}>
                {children}
            </div>
            <nav>
                <BottomNav />
            </nav>
            <footer>
                <Footer />
            </footer>

        </>
    )
}

export default Layout
