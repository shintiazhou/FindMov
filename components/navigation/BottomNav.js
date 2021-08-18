import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import TheatersIcon from '@material-ui/icons/Theaters';
import Link from "next/link"


export default function BottomNav() {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [clicked, setClicked] = useState({ b1: false, b2: true, b3: false })

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            className={classes.root}>

            <Link href="/movies/1" passHref={true}>
                <BottomNavigationAction
                    onClick={() => setClicked({ b1: true, b2: false, b3: false })}
                    showLabel={true}
                    className={clicked.b1 ? classes.clickedColor : classes.action}
                    label="Movies" icon={<TheatersIcon />} />
            </Link>

            <Link href="/trending/1" passHref={true}>
                <BottomNavigationAction
                    onClick={() => setClicked({ b1: false, b2: true, b3: false })}
                    className={clicked.b2 ? classes.clickedColor : classes.action}
                    showLabel={true}
                    label="Trending" icon={<WhatshotIcon />} />
            </Link>

            <Link href="/tv/1" passHref={true}>
                <BottomNavigationAction
                    onClick={() => setClicked({ b1: false, b2: false, b3: true })}
                    className={clicked.b3 ? classes.clickedColor : classes.action}
                    showLabel={true}
                    label="Tv Series" icon={<LiveTvIcon />} />
            </Link>
        </BottomNavigation>
    );
}
const useStyles = makeStyles({
    root: {
        width: "100%",
        position: "fixed",
        zIndex: 99,
        bottom: 0,
        backgroundColor: "#171717",

    },
    action: {
        color: "white",
    },
    clickedColor: {
        color: "#DA0037",
        paddingBottom: "6px"
    }

}, { index: 1 });
