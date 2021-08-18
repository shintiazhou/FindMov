import React from 'react'
import { useRouter } from "next/router"
import CreatePage from "../../components/customComponents/CreatePage"

function Tv() {
    const router = useRouter()

    return (
        <div>
            <CreatePage type="movie" route={router.query.tv} title="Discover Tv Series" />
        </div>
    )
}

export default Tv