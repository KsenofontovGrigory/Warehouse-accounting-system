import {styled} from "@mui/material";

export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '150px',
    height: '100%',
    backgroundColor: 'rgb(30 39 44)',

    '.MuiButton-root': {
        transform: 'rotate(-90deg)',
    }
})