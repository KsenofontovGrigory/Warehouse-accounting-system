import React, { useEffect } from 'react';
import {
    Box,
    Button,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { RowTable } from './RowTable';
import { SelectWrapper } from '../ModalWindow/SelectWrapper/SelectWrapper';
import { AddedProductsList } from '../ModalWindow/AddedProductsList';

import { useContainerTableData } from './ContainerTable.utils';
import { useSystemData } from '../../hooks/useSystemData';

import * as S from './ContainerTable.styles'
import { style } from '../ModalWindow/constants';

export const ContainerTable = ({handleDelete, data}) => {
    const { products, addedProductsArr } = useSystemData()

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

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box sx={style}>
                    {addedProductsArr.map((item, index) => (
                        <AddedProductsList
                            key={index}
                            item={item}
                            setUnallocatedProducts={setUnallocatedProducts}
                            unallocatedProducts={unallocatedProducts}
                        />
                    ))}
                    {addUnallocatedProducts ? (
                        <SelectWrapper
                            setProductQuantity={setProductQuantity}
                            productName={productName}
                            handleChangeProductName={handleChangeProductName}
                            unallocatedProducts={unallocatedProducts}
                            findProductName={findProductName}
                        />
                    ) : null}
                    <Button
                        onClick={selectProduct}
                        disabled={!unallocatedProducts.length || (!productQuantity.length || !productName.length)}
                    >
                        Add unallocated products
                    </Button>
                    <Button onClick={addProducts}>
                        Add
                    </Button>
                </Box>
            </Modal>
        </>
    );
};
