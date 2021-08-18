import React from 'react';
import { usePagination } from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import Link from "next/link"

export default function UsePagination(props) {
    const classes = useStyles();
    const { items } = usePagination({
        count: 40, //pagination max number
    });

    return (
        <ul className={classes.ul}>
            {items.map(({ page, type, selected, ...item }, index) => {
                let children = null;
                //some conditional to jump to last page or first page
                if (type === 'start-ellipsis' || type === 'end-ellipsis') {
                    children = '…';
                } else if (type === 'page') {
                    children = (
                        <Link href={`/${props.categories}/${page}`}>
                            <a className={selected ? classes.selectedLink : classes.link} {...item}>
                                {page}
                            </a>
                        </Link>

                    );
                } else {
                    // previous and next button
                    children = (
                        <Link href={`/${props.categories}/${page}`}>
                            <a className={classes.previousNext}  {...item}>
                                {type}
                            </a>
                        </Link>

                    );
                }

                return <li key={index}>{children}</li>;
            })}
        </ul>
    );
}

const useStyles = makeStyles((theme) => ({
    ul: {
        width: "80%",
        margin: "0 auto",
        listStyle: 'none',
        padding: 0,
        display: 'flex',
        justifyContent: "center",
        fontSize: "15px",
        [theme.breakpoints.down('xs')]: {
            fontSize: "12px"
        },
    },
    link: {
        margin: "0 20px",
        [theme.breakpoints.down('xs')]: {
            margin: "0 11px",
        },
        cursor: "pointer"
    },
    selectedLink: {
        margin: "0 20px",
        [theme.breakpoints.down('xs')]: {
            margin: "0 11px",
        },
        cursor: "pointer",
        color: "#DA0037",
        fontWeight: "bolder"
    },
    previousNext: {
        backgroundColor: "#DA0037",
        padding: "3px 13px 8px 13px",
        borderRadius: "15px",

    },


}));
