import styles from "../styles/layout.module.css"
import Nav from "./navigation/Nav"
import BottomNav from "./navigation/BottomNav"

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

        </>
    )
}

export default Layout
