import React, { useEffect } from 'react';
import {
    Box,
    Button,
    Modal,
    Paper,
    SwipeableDrawer,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    useMediaQuery,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { RowTable } from './RowTable';
import { DialogContent } from './DialogContent';

import { useContainerTableData } from './ContainerTable.utils';
import { useSystemData } from '../../hooks/useSystemData';

import * as S from './ContainerTable.styles'
import { style } from '../ModalWindow/constants';

export const ContainerTable = ({handleDelete, data}) => {
    const isMobile = useMediaQuery('(max-width:768px)');

    const { products } = useSystemData()

    const {
        setUnallocatedProducts,
        unallocatedProducts,
        setAddUnallocatedProducts,
        showProducts,
        closeProducts,
        warehouseName,
        handleOpen,
        currentWarehouse,
        setShowProducts,
        setCurrentWarehouse,
        open,
        handleClose,
        addUnallocatedProducts,
        setProductQuantity,
        productName,
        handleChangeProductName,
        findProductName,
        selectProduct,
        productQuantity,
        addProducts,
    } = useContainerTableData()

    useEffect(() => {
        setUnallocatedProducts(products.filter((item) => item.warehouse === ''))
    }, [products])

    useEffect(() => {
        !unallocatedProducts.length && setAddUnallocatedProducts(false)
    }, [unallocatedProducts])

    return (
        <>
            {showProducts ? (
                <>
                    <S.TitleContainer>
                        <ArrowBackIcon
                            onClick={closeProducts}
                            sx={{cursor: 'pointer', color: 'white'}}
                        />
                        <S.Title>
                            {warehouseName}
                        </S.Title>
                        <Button
                            onClick={handleOpen}
                            disabled={!unallocatedProducts.length}
                        >
                            Add unallocated products
                        </Button>
                    </S.TitleContainer>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 300 }} aria-label='simple table'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align='center'>Quantity</TableCell>
                                    {showProducts ? (
                                        <TableCell align='center'>Move</TableCell>
                                    ) : (
                                        <>
                                            <TableCell align='center'>Warehouse</TableCell>
                                            <TableCell align='center'>Edit</TableCell>
                                            <TableCell align='center'>Delete</TableCell>
                                        </>
                                    )}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentWarehouse.map((item) => (
                                    <RowTable
                                        key={item.id}
                                        item={item}
                                        handleDelete={handleDelete}
                                        showProducts={showProducts}
                                        warehouseName={warehouseName}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            ) : (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 300 }} aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                {data[0]?.quantity ? (
                                    <>
                                        <TableCell align='center'>Quantity</TableCell>
                                        <TableCell align='center'>Warehouse</TableCell>
                                    </>
                                ) : (
                                    <TableCell align='center'>
                                        Show products
                                    </TableCell>
                                )}
                                <TableCell align='center'>Edit</TableCell>
                                <TableCell align='center'>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.map((item) => (
                                <RowTable
                                    key={item.id}
                                    item={item}
                                    handleDelete={handleDelete}
                                    setShowProducts={setShowProducts}
                                    setCurrentWarehouse={setCurrentWarehouse}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {isMobile ? (
                <SwipeableDrawer
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    anchor='bottom'
                >
                    <S.ContainerDrawer>
                        <DialogContent
                            setUnallocatedProducts={setUnallocatedProducts}
                            unallocatedProducts={unallocatedProducts}
                            addUnallocatedProducts={addUnallocatedProducts}
                            setProductQuantity={setProductQuantity}
                            productName={productName}
                            handleChangeProductName={handleChangeProductName}
                            findProductName={findProductName}
                            selectProduct={selectProduct}
                            productQuantity={productQuantity}
                            addProducts={addProducts}
                        />
                    </S.ContainerDrawer>
                </SwipeableDrawer>
            ) : (
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby='modal-modal-title'
                    aria-describedby='modal-modal-description'
                >
                    <Box sx={style}>
                        <DialogContent
                            setUnallocatedProducts={setUnallocatedProducts}
                            unallocatedProducts={unallocatedProducts}
                            addUnallocatedProducts={addUnallocatedProducts}
                            setProductQuantity={setProductQuantity}
                            productName={productName}
                            handleChangeProductName={handleChangeProductName}
                            findProductName={findProductName}
                            selectProduct={selectProduct}
                            productQuantity={productQuantity}
                            addProducts={addProducts}
                        />
                    </Box>
                </Modal>
            )}
        </>
    );
};
