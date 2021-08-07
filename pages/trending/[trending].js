import React from 'react'
import { useRouter } from "next/router"
import CreatePage from "../../components/customComponents/CreatePage"

function trending() {
    const router = useRouter()

    return (
        <div>
            <CreatePage type="trending" route={router.query.trending} title="Trending" />
        </div>
    )
}

export default trending
