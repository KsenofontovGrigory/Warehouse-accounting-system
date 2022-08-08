import React from 'react';
import { Box, Button, MenuItem, Modal, Select, TableCell, TableRow, TextField } from '@mui/material';
import {
    EditOutlined,
    DeleteForever,
    VisibilityOutlined,
    CheckCircleOutlineOutlined,
    MoveUp
} from '@mui/icons-material';

import { Notification } from '../../Notification';

import { useRowTableData } from './RowTable.utils';

import { style } from '../../ModalWindow/constants';
import * as S from './RowTable.styles'

export const RowTable = ({
                             item,
                             handleDelete,
                             setShowProducts,
                             setCurrentWarehouse,
                             showProducts,
                             warehouseName
}) => {
    const {
        edit,
        setName,
        setQuantity,
        warehouse,
        handleChange,
        warehouses,
        findProductsOfWarehouse,
        handleOpenProducts,
        handleOpenNotification,
        handleSave,
        handleEditProducts,
        handleOpen,
        open,
        handleClose,
        newWarehouse,
        handleChangeWarehouse,
        handleMoveProduct,
        openNotification,
        handleCloseNotification,
    } = useRowTableData(item, setShowProducts, setCurrentWarehouse)

    return (
        <TableRow
            key={item.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component='th' scope='row'>
                {edit ? (
                    <TextField
                        sx={{color: 'white', width: '200px', height: '80%'}}
                        required
                        type='text'
                        inputProps={{maxLength: 20}}
                        defaultValue={item.name}
                        onChange={(e) => setName(e.target.value)}
                    />
                ) : (
                    item.name
                )}
            </TableCell>
            {item?.quantity ? (
                <>
                    <TableCell align='center'>
                        {edit ? (
                            <TextField
                                sx={{width: '200px'}}
                                required
                                type='number'
                                InputProps={{ inputProps: { min: 0 } }}
                                defaultValue={item.quantity}
                                onChange={(e) => {
                                    if (+(e.target.value) < 1) {
                                        e.target.value = '1'
                                    }
                                    setQuantity(e.target.value)
                                }}
                            />
                        ) : (
                            item.quantity
                        )}
                    </TableCell>
                    {!showProducts ? (
                        <TableCell align='center'>
                            {edit ? (
                                <Select
                                    sx={{width: '200px'}}
                                    value={warehouse}
                                    onChange={handleChange}
                                >
                                    <MenuItem value=''>
                                        <em>Unallocated</em>
                                    </MenuItem>
                                    {warehouses.map((item) => {
                                        return (
                                            <MenuItem
                                                key={item.name}
                                                value={item.name}
                                            >
                                                {item.name}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                            ) : (
                                item.warehouse === '' ? 'Unallocated' : item.warehouse
                            )}
                        </TableCell>
                    ) : null}
                </>
            ) : (
                <TableCell align='center'>
                    <VisibilityOutlined
                        onClick={findProductsOfWarehouse ? handleOpenProducts : handleOpenNotification}
                        sx={{cursor: 'pointer'}}
                    />
                </TableCell>
            )}
            {!showProducts ? (
                <>
                    <TableCell align='center'>
                        {edit ? (
                            <CheckCircleOutlineOutlined
                                onClick={handleSave}
                                sx={{cursor: 'pointer'}}
                            />
                        ) : (
                            <EditOutlined
                                onClick={handleEditProducts}
                                sx={{cursor: 'pointer'}}
                            />
                        )}
                    </TableCell>
                    <TableCell align='center'>
                        <DeleteForever
                            onClick={() => handleDelete(item.id, item.name)}
                            sx={{cursor: 'pointer'}}
                        />
                    </TableCell>
                </>
            ) : (
                <TableCell align='center'>
                    <MoveUp
                        onClick={handleOpen}
                        sx={{cursor: 'pointer'}}
                    />
                </TableCell>
            )}

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box sx={style}>
                    <S.ContainerModal>
                        <p>Move from {warehouseName} to</p>
                        <Select
                            sx={{width: '200px', color: 'white'}}
                            value={newWarehouse}
                            onChange={handleChangeWarehouse}
                        >
                            <MenuItem value=''>
                                <em>Unallocated</em>
                            </MenuItem>
                            {warehouses.filter((item) => item.name !== warehouseName).map((item) => {
                                return (
                                    <MenuItem
                                        key={item.name}
                                        value={item.name}
                                    >
                                        {item.name}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </S.ContainerModal>
                    <S.ContainerModal>
                        <p>Quantity</p>
                        <TextField
                            sx={{width: '200px'}}
                            required
                            type='number'
                            InputProps={{ inputProps: { min: 1, max: item.quantity } }}
                            defaultValue={item.quantity}
                            onChange={(e) => {
                                if (+(e.target.value) > +(item.quantity)) {
                                    e.target.value = item.quantity
                                }
                                if (+(e.target.value) < 1) {
                                    e.target.value = '1'
                                }

                                setQuantity(e.target.value)
                            }}
                        />
                    </S.ContainerModal>
                    <Button onClick={handleMoveProduct}>Move</Button>
                </Box>
            </Modal>

            <td style={{width: '0'}}>
                <Notification
                    open={openNotification}
                    handleCloseNotification={handleCloseNotification}
                    text='There are no products in this warehouse yet'
                />
            </td>
        </TableRow>
    );
};
