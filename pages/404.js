import styles from "../styles/404.module.css"
import Link from "next/link"

function NotFoundPage() {
    return (
        <div className={styles.root}>
            <div className={styles.header}>
                Page Not Found
            </div>
            <Link
                href="/trending/1"
                passHref={true}>
                <a className={styles.link}> Go Back</a>

            </Link>
        </div>

    )
}

export default NotFoundPage
