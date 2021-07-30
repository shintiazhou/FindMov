import React from 'react'
import MovieItem from "./MovieItem"
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "99%"
    },
    loading: {
        backgroundColor: "gray"
    }
}));

function MovieCollection(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid justifyContent="flex-start"
                container >
                {props.collection && props.collection.map(item => <MovieItem item={item} key={item.id} />)}
            </Grid>


        </div>
    )
}

export default MovieCollection
