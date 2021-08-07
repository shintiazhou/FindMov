import React from 'react'
import MovieItem from "../movieCollection/movieItem/MovieItem"
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


function MovieCollection(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid justifyContent="flex-start"
                container >
                {props.collection && props.collection.map((item) => <MovieItem
                    routeName={props.routeName}
                    item={item} key={item.id} />)}
            </Grid>


        </div>
    )
}
const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        width: "98%",
        marginLeft: "10px"
    },
    loading: {
        backgroundColor: "gray"
    }
}));

export default MovieCollection
