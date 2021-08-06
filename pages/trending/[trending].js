import CustomPagination from "../../components/CustomPagination"
import Head from 'next/head'
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import MovieCollection from "../../components/MovieCollection"
import styles from "../../styles/trending.module.css"
import { CircularProgress } from '@material-ui/core';
import { secondPageMerge } from "../../utils/functions"

export default function Trending() {
    const router = useRouter()
    const [page, setPage] = useState(null)
    const [timeWindow, setTimeWindow] = useState("day")


    const pages = secondPageMerge(router.query.trending)
    const [firstPage, secPage] = pages

    useEffect(() => {
        if (firstPage && secPage) {
            const fetchApi = async () => {
                // fetch first page to merge
                const req = await fetch(`https://api.themoviedb.org/3/trending/all/${timeWindow}?api_key=${process.env.apiKey}&page=${firstPage}`)
                const page1 = await req.json()
                // fetch second page to merge
                const req2 = await fetch(`https://api.themoviedb.org/3/trending/all/${timeWindow}?api_key=${process.env.apiKey}&page=${secPage}`)
                const page2 = await req2.json()
                // merge both page

                req && setPage(page1.results.concat(page2.results))

            }
            fetchApi()
        }

        return () => setPage(null) // when unmount
    }, [router.query.trending, timeWindow])

    return (
        <div >
            <Head>
                <title>Trending Movies - MovFind </title>
                <meta name="description" content="Trending Movies Your Daily Dose Of Latest popular movies" />
            </Head>
            <header>
                <h1 className={styles.title}>Trending </h1>
                <ul className={styles.toggleContainer}>
                    <li className={timeWindow === "day" ? styles.selected : styles.toggle}
                        onClick={() => setTimeWindow("day")}>Today</li>
                    <li className={timeWindow === "week" ? styles.selected : styles.toggle}
                        onClick={() => setTimeWindow("week")}>This week</li>
                </ul>
            </header>
            <main>
                {page ? <MovieCollection collection={page} /> :
                    <div style={{
                        height: "110vw",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <CircularProgress color="secondary" />
                    </div>
                }
            </main>
            <nav>
                <CustomPagination categories="trending" />
            </nav>

        </div>
    )
}