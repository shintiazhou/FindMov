import { useEffect, useState } from "react"
import { img_300, img_780, loadingImg } from "../../../config/imgConfig"
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import StarIcon from '@material-ui/icons/Star';
import Credit from "./credits/Credits"


function SingleMovieContent(props) {
    const classes = useStyles()
    const [content, setContent] = useState({})
    const [image, setImage] = useState(loadingImg)

    //props.arr = [id,media_type]
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
    }, [props.arr])

    //fake loading
    setTimeout(() => { setImage(content.poster_path ? `${img_300 + content.poster_path}` : loadingImg) }, 500)

    // year format
    const year = (content.release_date || content.first_air_date) && (content.release_date ? content.release_date.slice(0, 4) : content.first_air_date.slice(0, 4))

    // duration format
    const duration = () => {
        const runtime = content.runtime;
        let hour = Math.floor(runtime / 60);
        let minutes = Math.round((runtime / 60 - hour) * 60);
        return (runtime ? hour + "h " + minutes + "m" : "")
    }


    return (
        <div className={classes.container}>
            {content.id ? (
                <>
                    {/* background */}
                    <div style={{ backgroundImage: `url(${img_780 + content.backdrop_path})` }}
                        className={classes.background}>
                    </div>

                    <div className={classes.main}>
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
                                <div className={classes.backgroundBreakpoint}>
                                    <h2>Overview</h2>
                                    <p >{content.overview}</p>
                                </div>
                            </div>
                        </div>


                        <Credit
                            media_type={props.arr && props.arr[1]}
                            id={props.arr && props.arr[0]} />

                    </div>

                </>) :
                <div className={classes.loading}>
                    <CircularProgress color="secondary" />
                </div>

            }
        </div>
    )
}

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
    main: {
        width: "100%",
        height: "100%",
        padding: "30px",
        display: "flex",
        flexDirection: "column",
        position: "absolute"
    },
    background: {
        opacity: ".2",
        backgroundRepeat: "no-repeat",
        position: "absolute",
        backgroundPosition: "center",
        backgroundSize: "cover",
        width: "100%",
        height: "100%",
        [theme.breakpoints.down('md')]: {
            backgroundPosition: "10% 0%",
            height: "80%",
        },
        [theme.breakpoints.down('xs')]: {
            height: "90%",
            backgroundPosition: "30% 0%",
            opacity: ".1",
        },
    },
    overlay: {
        backgroundImage: "linear-gradient(rgba(23,23,23,0) , rgba(23,23,23,1))",
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
    },

    content: {
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        [theme.breakpoints.up('md')]: {
            flexDirection: "row",
            alignItems: "flex-start",
        },
    },

    imgContainer: {
        width: "300px",
        marginRight: "30px",
        [theme.breakpoints.down('sm')]: {
            width: "250px",
            marginRight: "0",
        },
        [theme.breakpoints.down('xs')]: {
            width: "70%",
            marginRight: "0",
        },
    },

    img: {
        border: "3px solid white",
        boxShadow: " 0px 10px 18px #000000",
    },
    title: {
        fontSize: "28px",
        marginBottom: "5px",
        [theme.breakpoints.down('xs')]: {
            fontSize: "20px",
        },

    },
    year: {
        fontWeight: "400",
        opacity: ".8"
    },
    genres: {
        opacity: ".8",
        fontSize: "15px",
        marginTop: "5px",
        [theme.breakpoints.down('xs')]: {
            fontSize: "13px",
        },
    },
    rating: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: "10px",
        marginTop: "10px",
        borderBottom: "1px solid gray",
        margin: "0 -30px",
        "& > *": {
            margin: "2px"
        },
        [theme.breakpoints.up('md')]: {
            justifyContent: "flex-start",
            margin: "10px 0"
        },
    },
    info: {
        width: "70%",
        display: "flex",
        flexDirection: "column",
        [theme.breakpoints.up('md')]: {
            textAlign: "left"
        },
    },
    backgroundBreakpoint: {
        backgroundColor: "#171717",
        margin: "0 -150px 30px -150px",
        padding: "0 150px 30px 150px",
        [theme.breakpoints.up('md')]: {
            backgroundColor: "transparent",
        },
        [theme.breakpoints.down('sm')]: {
            padding: "0 110px",
        },
    },


}));
export default SingleMovieContent
