import { useState } from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { img_300, loadingImg } from "../../../config/imgConfig"
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import SingleMovieContent from "./SingleMovieContent"


function MovieItem(props) {
    const classes = useStyles();
    const titleName = props.item.title ? props.item.title : props.item.original_name
    const [image, setImage] = useState(loadingImg)
    const [open, setOpen] = useState(false);
    const [itemInfo, setItemInfo] = useState(null)

    //fake loading 
    setTimeout(() => { setImage(props.item.poster_path ? `${img_300}${props.item.poster_path}` : loadingImg) }, 500)

    //movie or TV , id
    const typeAndId = itemInfo ? itemInfo.split(" ") : null

    return (
        <>
            <Grid item lg={2} md={3} sm={4} xs={6} className={classes.root}>

                <div
                    onClick={(e) => {
                        setItemInfo(e.target.offsetParent.id) // get the id to pass it with props
                        setOpen(true)
                    }}
                    className={classes.container}
                    // set the id to pass it with props
                    id={props.item.id + ' ' + (props.item.media_type ? props.item.media_type : props.routeName)}
                >
                    <img
                        width="100%"
                        src={image}
                        alt={`${titleName}`} />
                    <div className={classes.titleOverlay} />

                    <h1 className={classes.title}>{titleName}</h1>
                    <span className={classes.rating}>{props.item.vote_average}</span>
                </div>
            </Grid>

            <Modal
                className={classes.modal}
                open={open}
                onClose={() => {
                    setItemInfo(null)
                    setOpen(false)
                }}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <SingleMovieContent
                        arr={typeAndId} />
                </Fade>
            </Modal>
        </>
    )
}

const useStyles = makeStyles(() => ({
    root: {
        textAlign: "center",
        position: "relative",
        marginBottom: "35px"
    },
    loading: {
        width: "100%",
        height: "100%",
        backgroundColor: "gray"
    },
    title: {
        fontSize: "16px",
        position: "absolute",
        zIndex: 2,
        left: 5,
        right: 5,
        bottom: 2
    },
    titleOverlay: {
        width: "100%",
        height: 150,
        position: "absolute",
        bottom: 0,
        backgroundImage: "linear-gradient( transparent,black)"
    },
    container: {
        boxShadow: " 0px 10px 18px #000000",
        position: "relative",
        margin: "0 auto",
        width: "80%",
        cursor: "pointer"
    },
    rating: {
        position: "absolute",
        backgroundColor: "#FFC947",
        fontWeight: 700,
        color: "black",
        width: 45,
        textAlign: "center",
        top: 0,
        left: 0
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

export default MovieItem
