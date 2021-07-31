import { useEffect, useState } from "react"
import { img_300, img_780, loadingImg, unavailable } from "../config/imgConfig"
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles((theme) => ({
    loading: {
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        backgroundColor: "#171717",
        height: "80%",
        width: "80%",
        position: "relative",
        [theme.breakpoints.up('lg')]: {
            width: "60%",
        },
        overflowY: "scroll",
        overflowX: "hidden",

    },
    content: {
        textAlign: "center",
        width: "100%",
        height: "100%",
        padding: "30px",
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        [theme.breakpoints.up('md')]: {
            flexDirection: "row",
            alignItems: "flex-start",
            textAlign: "left"
        },
    },
    background: {
        opacity: ".05",
        backgroundRepeat: "no-repeat",
        position: "absolute",
        backgroundPosition: "center",
        backgroundSize: "cover",
        width: "100%",
        height: "100%"
    },
    imgContainer: {
        width: "30%",
        [theme.breakpoints.down('xs')]: {
            width: "60%",
        },
        [theme.breakpoints.up('md')]: {
            marginRight: "30px"
        },
    },
    overlay: {
        backgroundImage: "linear-gradient(rgba(23,23,23,0) , rgba(23,23,23,1))",
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
    },
    img: {
        border: "3px solid white",
        boxShadow: " 0px 10px 18px #000000",
    },
    title: {
        fontSize: "28px",
        marginBottom: "5px"

    },
    year: {
        fontWeight: "400",
        opacity: ".8"
    },
    genres: {
        opacity: ".8",
        fontSize: "15px",
        marginTop: "5px",
    },
    info: {
        display: "flex",
        flexDirection: "column"
    },
    rating: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: "10px",
        marginTop: "10px",
        borderBottom: "1px solid gray",
        "& > *": {
            margin: "2px"
        }
    }

}));

function SingleMovieContent(props) {
    const classes = useStyles()
    const [content, setContent] = useState({})
    const [image, setImage] = useState(loadingImg)

    setTimeout(() => { setImage(content.id ? `${img_300 + content.poster_path}` : unavailable) }, 500)

    useEffect(() => {
        if (props.arr) {
            const fetchApi = async () => {
                const req = await fetch(`https://api.themoviedb.org/3/${props.arr[1]}/${props.arr[0]}?api_key=${process.env.apiKey}&language=en-US`)
                const data = await req.json()
                setContent(data)
            }
            fetchApi()
        }
        return () => setContent({})
    }, [])
    console.log(content)

    const year = content.id && (content.release_date ? content.release_date.slice(0, 4) : content.first_air_date.slice(0, 4))

    const duration = () => {
        const runtime = content.runtime;
        let hour = Math.round(runtime / 60);
        let minutes = Math.round((runtime / 60 - hour) * 60);

        return hour + "h " + minutes + "m"
    }
    return (
        <div className={classes.container}>
            {content.id ? (
                <>
                    <div style={{ backgroundImage: `url(${img_780 + content.backdrop_path})` }}
                        className={classes.background}></div>

                    <div className={classes.content}>

                        <div className={classes.imgContainer}>
                            <img
                                className={classes.img}
                                width="100%"
                                src={`${image}`}
                                alt={`${content.title}`} />
                        </div>

                        <div className={classes.info} >
                            <h1 className={classes.title}>
                                {content.title ? content.title : content.name}

                                <span className={classes.year}>
                                    {" "}({year})
                                </span>
                            </h1>
                            <span>{duration()}</span>
                            <div className={classes.genres}>
                                {content.genres.map((genre, i) => i == content.genres.length - 1 ? genre.name :
                                    genre.name + " , ")}
                            </div>
                            <div className={classes.rating}>
                                <StarIcon />
                                <span>{content.vote_average}</span>

                                <span style={{ opacity: ".5" }}>/10</span>

                            </div>
                            <div >
                                <h2>Overview</h2>
                                <p>{content.overview}</p>
                            </div>
                        </div>



                    </div>
                </>) :
                <div className={classes.loading}>
                    <CircularProgress color="secondary" />
                </div>

            }
        </div>
    )
}

export default SingleMovieContent
