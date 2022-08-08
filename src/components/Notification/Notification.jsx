import React from 'react';
import { Alert, Snackbar } from '@mui/material';

export const Notification = ({ open, handleCloseNotification, text }) => {
    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleCloseNotification}>
            <Alert onClose={handleCloseNotification} severity='info' sx={{ width: '100%' }}>
                {text}
            </Alert>
        </Snackbar>
    );
};
