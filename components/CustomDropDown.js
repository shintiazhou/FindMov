import { useState } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import CustomButton from "./CustomButton"
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
const useStyles = makeStyles(() => ({
    menuItems: {
        maxWidth: "400px",
        padding: "20px",
        display: "flex",
        flexWrap: "wrap",
    },
    menuItemsSecondary: {
        height: "160px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
    }
}))

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }}
        {...props}
    />
));



function CustomDropdown(props) {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                aria-haspopup="true"
                variant="contained"
                color="secondary"
                onClick={handleClick}
            >
                {props.placeholder} <ExpandMoreIcon style={{ marginLeft: "20px", marginRight: "-10px" }} />
            </Button>

            <StyledMenu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                onClick={props.secondary && handleClose}
            >
                <div className={props.placeholder === "Genre" ? classes.menuItems : classes.menuItemsSecondary}>
                    {props.array && props.array.map((v, i) => {
                        return <CustomButton
                            id={v}
                            secondary={props.secondary}
                            key={i}
                            value={v.replace("_", " ").replace(".desc", "")} />
                    })}
                </div>
            </StyledMenu>
        </div>
    )
}

export default CustomDropdown
