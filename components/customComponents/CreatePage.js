import Head from 'next/head'
import { useState, useEffect } from "react"
import CustomDropDown from './CustomDropDown';
import { CircularProgress } from '@material-ui/core';
import MovieCollection from "../movieCollection/MovieCollection"
import CustomPagination from "./CustomPagination"
import styles from "../../styles/trending.module.css"



const sortBy = ["popularity.desc", "release_date.desc", "vote_average.desc", "vote_count.desc"]

export default function CreatePage({ type, route, title }) {

    const [filterbyGenre, setFilterByGenre] = useState([])
    const [genres, setGenres] = useState(null)
    const [sort, setSort] = useState("popularity.desc")
    const [page, setPage] = useState(null)
    const [timeWindow, setTimeWindow] = useState("day")

    //genre
    const setGenreName = (e) => {
        //find component or parents component with an id of genre name
        let id = e.target.id ? e.target.id : e.target.parentElement.id
        let arr = filterbyGenre.map(v => v.name)

        id && (id.includes(".") ?
            setSort(id) :
            (arr.includes(id) ? setFilterByGenre(filterbyGenre.filter(v => v.name !== id)) : setFilterByGenre([...filterbyGenre, ...genres.filter(v => v.name == id)
            ])))

    }

    //merge page
    const secondPageMerge = (x) => {
        const value = parseInt(x)
        const firstPage = (value - 1) + value
        const secondPage = value * 2
        return [firstPage, secondPage]
    }
    const pages = secondPageMerge(route)
    const [firstPage, secPage] = pages

    // url
    let getUrl = (page) => {
        if (type !== "trending") {
            return `https://api.themoviedb.org/3/discover/${type}?api_key=${process.env.apiKey}&language=en-US&sort_by=${sort}&include_adult=false&include_video=false&page=${page}&${filterbyGenre && "with_genres=" + filterbyGenre.map(v => v.id).toString()}`

        }
        return `https://api.themoviedb.org/3/trending/all/${timeWindow}?api_key=${process.env.apiKey}&page=${page}`

    }

    useEffect(() => {
        // fetch all genre available for tv and movies
        if (type !== "trending") {
            const getGenres = async () => {
                const req = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.apiKey}&language=en-US`)
                const genres = await req.json()
                setGenres(genres.genres)
            }
            getGenres()
        }
        //fetch start
        if (firstPage && secPage) {
            const fetchApi = async () => {
                const req = await fetch(getUrl(firstPage))
                const page1 = await req.json()

                const req2 = await fetch(getUrl(secPage))
                const page2 = await req2.json()
                console.log(page1, page2)
                //merge page
                req2 && setPage(page1.results.concat(page2.results))
            }

            fetchApi()
        }
        //when unmount
        return () => setPage(null)

    }, [filterbyGenre, sort, timeWindow, route])

    return (
        <div style={{ padding: "30px" }}>
            <Head>
                <title>{title} - MovFind</title>
                <meta name="description" content=" filter by genre, watch trailers, Find films you didn't know you were looking for." />
            </Head>

            {/* for trending */}
            {type === "trending" ? <header>
                <h1 className={styles.title}>Trending </h1>

                <ul className={styles.toggleContainer}>
                    <li className={timeWindow === "day" ? styles.selected : styles.toggle}
                        onClick={() => setTimeWindow("day")}>Today</li>
                    <li className={timeWindow === "week" ? styles.selected : styles.toggle}
                        onClick={() => setTimeWindow("week")}>This week</li>
                </ul>
            </header>
                :

                // for movie and tv
                <header>
                    <h1>{title}</h1>
                    <div
                        onClick={setGenreName}
                        style={{ display: "flex", justifyContent: "space-between" }}>

                        <CustomDropDown
                            array={genres && genres.map(v => v.name)}
                            placeholder="Genre" />

                        <CustomDropDown
                            secondary
                            array={sortBy}
                            placeholder="Sort By" />
                    </div>
                </header>}

            {/* collections */}
            <main style={{ margin: "30px -30px" }} >
                {page ? <MovieCollection
                    routeName={type}
                    collection={page} /> :
                    <div
                        style={{
                            height: "110vw",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <CircularProgress color="secondary" />
                    </div>
                }
            </main>
            <nav>
                <CustomPagination categories={type} />
            </nav>

        </div>
    )
}
