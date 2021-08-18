import React from 'react'
import { useRouter } from "next/router"
import CreatePage from "../../components/customComponents/CreatePage"

function Movie() {
    const router = useRouter()

    return (
        <div>
            <CreatePage type="movie" route={router.query.movie} title="Discover Movies" />
        </div>
    )
}

export default Movie