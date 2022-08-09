import { useEffect } from 'react';

import {Header} from '../../components/Header';
import {NotPositionsPage} from '../../components/NotPositionsPage';
import { ContainerTable } from '../../components/ContainerTable';
import { Notification } from '../../components/Notification';

import { useProducts } from '../../redux/products/hooks';
import { useWarehouses } from '../../redux/warehouses/hooks';

import { useMainPageData } from './mainPage.utils';

import * as S from './mainPage.styles'

export const MainPage = () => {
    const { products } = useProducts()
    const { warehouses } = useWarehouses()

    const {
        openWarehouses,
        openProducts,
        openDeleteProductNotification,
        handleCloseNotification,
        showWarehouses,
        showProducts,
        handleDeleteProduct,
        handleDeleteWarehouse,
    } = useMainPageData()

    useEffect(() => {
        showProducts()
    }, [products])

    useEffect(() => {
        showWarehouses()
    }, [warehouses])

    return (
        <S.Container>
            <Header
                showWarehouses={showWarehouses}
                showProducts={showProducts}
                openWarehouses={openWarehouses}
                openProducts={openProducts}
            />
                {products?.length === 0 && warehouses?.length === 0 ? (
                    <NotPositionsPage />
                ) : (
                    <>
                        <S.ContainerTable>
                            {openProducts ? (
                                <ContainerTable
                                    handleDelete={handleDeleteProduct}
                                    data={products}
                                />
                            ) : null}
                            {openWarehouses && (
                                <ContainerTable
                                    handleDelete={handleDeleteWarehouse}
                                    data={warehouses}
                                />
                            )}
                        </S.ContainerTable>
                    </>
                )}

            <Notification
                open={openDeleteProductNotification}
                handleCloseNotification={handleCloseNotification}
                text='All items have been removed from all warehouses'
            />
        </S.Container>
    );
};
