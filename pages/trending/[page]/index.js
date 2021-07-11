import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Trending() {
    const router = useRouter()
    const { page } = router.query
    return (
        <div >
            <Head>
                <title>Trending Movies - MovFind </title>
                <meta name="description" content="Trending Movies Your Daily Dose Of Latest popular movies" />
            </Head>
            <header>
                <h1>Trending {page}</h1>

            </header>

        </div>
    )
}
