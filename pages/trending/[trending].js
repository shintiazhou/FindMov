import CustomPagination from "../../components/CustomPagination"
import Head from 'next/head'
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import MovieCollection from "../../components/MovieCollection"

export default function Home() {
    const router = useRouter()
    const [page, setPage] = useState(null)

    useEffect(() => {

        const fetchApi = async () => {
            const req = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=b4d716b5b9583975e5b0f9f8144bbdca&page=${router.query.trending}`)
            const page = await req.json()
            setPage(page)
        }
        fetchApi()

    }, [router.query.trending])
    console.log(page)
    return (
        <div >
            <Head>
                <title>Trending Movies - MovFind </title>
                <meta name="description" content="Trending Movies Your Daily Dose Of Latest popular movies" />
            </Head>
            <header>
                <h1>Trending </h1>
            </header>
            <main>
                {page ? <MovieCollection collection={page.results} /> :
                    <h1>Loading</h1>
                }
            </main>
            <nav>
                <CustomPagination categories="trending" />
            </nav>

        </div>
    )
}