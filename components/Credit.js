import { useState, useEffect } from 'react'
import CastCarousel from "./CastCarousel"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    cast: {
        marginBottom: "-25px",
        marginLeft: "8px",
        fontWeight: "400"
    }
}))



function Credit({ media_type, id }) {
    const classes = useStyles()
    const [castData, setCastData] = useState(null)

    //slide for carousel (pass in to props)
    const SLIDE_COUNT = 10;
    const slides = Array.from(Array(SLIDE_COUNT).keys());

    useEffect(() => {
        if (media_type) {
            const fetchApi = async () => {
                const req = await fetch(`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.apiKey}&language=en-US`)
                const data = await req.json()
                setCastData(data)
            }
            fetchApi()
        }
    }, []);

    return (
        <>
            <div>

            </div>
            <div>
                <h2 className={classes.cast}>cast</h2>
                <CastCarousel
                    slides={slides}
                    castData={castData && castData.cast.filter((v, i) => i < 10)} />
            </div></>

    )
}

export default Credit
