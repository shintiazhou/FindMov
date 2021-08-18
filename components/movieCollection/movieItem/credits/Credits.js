import { useState, useEffect } from 'react'
import CastCarousel from "./CastCarousel"
import { makeStyles } from '@material-ui/core/styles';


function Credit({ media_type, id }) {
    const classes = useStyles()
    const [credits, setCredits] = useState(null)

    //slide for carousel (pass in to props)
    const SLIDE_COUNT = 10;
    const slides = Array.from(Array(SLIDE_COUNT).keys());

    useEffect(() => {
        if (media_type) {
            const fetchApi = async () => {
                const req = await fetch(`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.apiKey}&language=en-US`)
                const data = await req.json()
                setCredits(data)
            }
            fetchApi()
        }
        return () => setCredits(null)
    }, [id, media_type]);

    //filter writer from crew array
    const writerArr = credits && credits.crew.filter(v => v.department === "Writing")

    //filter director
    const director = credits && credits.crew.filter(v => v.job === "Director")

    //filter creator (tv series)
    const creator = credits && credits.crew.filter(v => v.job === "Executive Producer" && v.known_for_department === "Writing")

    //remove duplicates of writers name
    const writers = writerArr && writerArr.filter((v, i, self) =>
        i === self.findIndex((t) => (
            t.name === v.name
        ))
    )

    //get the writers jobs
    const filterJob = (name) => {
        const filterJob = writerArr && writerArr.filter(v => v.name == name)
        return filterJob && filterJob.map((v, i) => {
            return (
                <span key={i}>
                    {v.job}{i !== filterJob.length - 1 && ", "}
                </span>
            )
        })
    }
    const setCreator = creator && creator.length !== 0 ? creator[0].name : "-"
    const setDirector = director && director.length !== 0 ? director[0].name : "-"

    return (
        <div className={classes.root}>
            <div style={{ paddingLeft: "10px" }}>
                <h3
                    style={{
                        padding: "10px 0",
                        borderBottom: "1px solid gray",
                        borderTop: "1px solid gray"
                    }}
                >
                    {setCreator !== "-" ? "Creator:" : "Director:"}
                    <span className={classes.director}>
                        {setCreator !== "-" ? setCreator : setDirector}
                    </span>

                </h3>
                <div className={classes.writers}>
                    {writers && writers.map((v, i) => {
                        return <div key={i} className={classes.writer}>
                            {v.name && v.name}
                            <div className={classes.jobs}>
                                {v.name && filterJob(v.name)}
                            </div>

                        </div>

                    })}
                </div>
            </div>

            {credits &&
                (credits.cast && <div>
                    <h2 className={classes.h2}>cast</h2>
                    <CastCarousel
                        slides={slides}
                        castData={credits.cast.filter((v, i) => i < 10)} />
                </div>)}

        </div>

    )
}
const useStyles = makeStyles((theme) => ({
    h2: {
        marginBottom: "-25px",
        marginLeft: "8px",
        fontWeight: "400"
    },
    root: {
        backgroundColor: "#171717",
        [theme.breakpoints.up('md')]: {
            margin: "20px -30px",
            padding: "0 30px",
        },
    },
    writers: {
        display: "flex",
        flexWrap: " wrap"
    },
    writer: {
        margin: "0 15px 15px 0",
        width: "200px",
        fontWeight: "500"
    },
    jobs: {
        fontWeight: "200",
        opacity: ".8"
    },
    director: {
        fontWeight: "400",
        marginLeft: "30px"
    }
}), { index: 1 })


export default Credit
