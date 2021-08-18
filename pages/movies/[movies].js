import React from 'react'
import { useRouter } from "next/router"
import CreatePage from "../../components/customComponents/CreatePage"

function Movies() {
    const router = useRouter()

    return (
        <div>
            <CreatePage type="movie" route={router.query.movies} title="Discover Movies" />
        </div>
    )
}

export default Movies