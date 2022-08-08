import {styled} from '@mui/material';

export const Container = styled('div')(({theme}) => ({
  display: 'flex',
  justifyContent: 'space-around',
  width: '100%',
  height: '100px',
  backgroundColor: 'rgb(30 39 44)',

  [theme.breakpoints.down(500)]: {
    '& button': {
      fontSize: '10px',
    }
  }
}))
