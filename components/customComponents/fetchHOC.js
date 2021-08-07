import Head from 'next/head'
import { useState, useEffect } from "react"
import { makeStyles } from '@material-ui/core/styles';
import CustomDropDown from '../../components/customComponents/CustomDropDown';
import { useRouter } from "next/router"
import { secondPageMerge } from "../../utils/functions"
import { CircularProgress } from '@material-ui/core';
import MovieCollection from "../../components/movieCollection/MovieCollection"
import CustomPagination from "../../components/customComponents/CustomPagination"


const sortBy = ["popularity.desc", "release_date.desc", "vote_average.desc", "vote_count.desc"]


export default function Movies() {
    const router = useRouter()
    const classes = useStyles()
    const [filterbyGenre, setFilterByGenre] = useState([])
    const [genres, setGenres] = useState(null)
    const [sort, setSort] = useState("popularity.desc")
    const [page, setPage] = useState(null)



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
    const pages = secondPageMerge(router.query.movies)
    const [firstPage, secPage] = pages

    useEffect(() => {
        // fetch all genre available
        const getGenres = async () => {
            const req = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.apiKey}&language=en-US`)
            const genres = await req.json()
            setGenres(genres.genres)
        }
        getGenres()

        if (firstPage && secPage) {
            const fetchApi = async () => {
                const req = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.apiKey}&language=en-US&sort_by=${sort}&include_adult=false&include_video=false&page=${firstPage}&${filterbyGenre && "with_genres=" + filterbyGenre.map(v => v.id).toString()}`)
                const page1 = await req.json()

                const req2 = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.apiKey}&language=en-US&sort_by=${sort}&include_adult=false&include_video=false&page=${secPage}&${filterbyGenre && "with_genres=" + filterbyGenre.map(v => v.id).toString()}`)
                const page2 = await req2.json()

                req && setPage(page1.results.concat(page2.results))
            }

            fetchApi()
        }



    }, [filterbyGenre, sort, router.query.movies])

    return (
        <div
            className={classes.root}>
            <Head>
                <title>Browse Movies - MovFind</title>
                <meta name="description" content=" filter by genre, watch trailers, Find films you didn't know you were looking for." />
            </Head>

            <header>
                <h1>Browse Movies</h1>
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
            </header>

            <main
                style={{ margin: "30px -30px" }}
            >
                {page ? <MovieCollection
                    routeName="movie"
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
                <CustomPagination categories="movies" />
            </nav>

        </div>
    )
}
