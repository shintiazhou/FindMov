import { useEffect, useState } from "react"
import { img_300, loadingImg, unavailable } from "../config/imgConfig"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: "#171717",
        height: "70%",
        width: "70%",
        position: "relative",
        [theme.breakpoints.up('lg')]: {
            width: "60%",
        },
    },
    imgContainer: {
        margin: "20px auto",
        width: "40%",
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
    }

}));

function SingleMovieContent(props) {
    const classes = useStyles()
    const [content, setContent] = useState({})
    const [image, setImage] = useState(loadingImg)

    setTimeout(() => { setImage(content ? `${img_300}${content.poster_path}` : unavailable) }, 500)

    useEffect(() => {
        if (props.arr) {
            const fetchApi = async () => {
                const req = await fetch(`https://api.themoviedb.org/3/${props.arr[1]}/${props.arr[0]}?api_key=${process.env.apiKey}&language=en-US`)
                const data = await req.json()
                setContent(data)
            }
            fetchApi()
        }

    }, [props])
    console.log(content)
    return (
        content &&
        <div className={classes.container}>
            <div className={classes.imgContainer}>
                <img
                    className={classes.img}
                    width="100%"
                    src={`${image}`}
                    alt={`${content.title}`} />
            </div>
            <h1></h1>
        </div>
    )
}

export default SingleMovieContent
