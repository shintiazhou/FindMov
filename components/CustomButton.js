import { useState } from "react"
import { makeStyles, } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
    button: {
        margin: "5px 5px",
    },
    selected: {
        margin: "5px 5px",
        backgroundColor: "#DA0037",
        color: "white",
        '&:hover': {
            backgroundColor: "rgba(218, 0, 55,.8)"
        }
    },
    buttonSecondary: {
        margin: "2px 5px",
        width: "100%",
        justifyContent: "flex-start",
        textTransform: "capitalize"
    },
}))


function CustomButton(props) {
    const classes = useStyles()
    const [selected, setSelected] = useState(false);

    const handleClick = () => {
        setSelected(!selected)
    }

    const [selected2, setSelected2] = useState(false);

    const handleClick2 = () => {
        setSelected2(!selected2)
    }

    return (
        <div>
            {props.secondary ?
                <Button
                    id={props.id}
                    className={classes.buttonSecondary}
                    onClick={handleClick}
                    variant="text" color="secondary">
                    {props.value}
                </Button>
                :
                <Button
                    id={props.id}
                    className={selected2 ? classes.selected : classes.button}
                    onClick={handleClick2}
                    variant="outlined" color="secondary">
                    {props.value}

                </Button>}
        </div >
    )
}

export default CustomButton
