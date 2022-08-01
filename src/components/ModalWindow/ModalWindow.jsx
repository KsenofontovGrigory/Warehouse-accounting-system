import {useState} from 'react';
import {Modal, Box, Button, TextField, Select, MenuItem} from "@mui/material";

import {style, textFieldStyle} from "./constants";

import * as S from './ModalWindow.styles'

export const ModalWindow = ({open, handleClose, title}) => {
    const [warehouse, setWarehouse] = useState('');

    const handleChange = (event) => {
        setWarehouse(event.target.value);
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <S.Title>
                    {title}
                </S.Title>
                <S.ContainerInput>
                    <S.ProductTitle>Name</S.ProductTitle>
                    <TextField
                        sx={textFieldStyle}
                        required
                        type='text'
                        inputProps={{maxLength: 20}}
                    />
                </S.ContainerInput>
                <S.ContainerInput>
                    <S.ProductTitle>Quantity</S.ProductTitle>
                    <TextField
                        sx={textFieldStyle}
                        InputProps={{ inputProps: { min: 0, max: 20 } }}
                        required
                        type='number'
                    />
                </S.ContainerInput>
                <S.ContainerInput>
                    <S.ProductTitle>Warehouse</S.ProductTitle>
                    <Select
                        sx={textFieldStyle}
                        value={warehouse}
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </S.ContainerInput>
                <Button>Add</Button>
            </Box>
        </Modal>
    );
};
