import { useState } from 'react';

export const useHeaderData = () => {
    const [openProduct, setOpenProduct] = useState(false);
    const [openWarehouse, setOpenWarehouse] = useState(false);

    const handleOpenProduct = () => setOpenProduct(true);
    const handleCloseProduct = () => setOpenProduct(false);
    const handleOpenWarehouse = () => setOpenWarehouse(true);
    const handleCloseWarehouse = () => setOpenWarehouse(false);

    return {
        handleOpenWarehouse,
        handleOpenProduct,
        handleCloseProduct,
        handleCloseWarehouse,
        openProduct,
        openWarehouse,
    }
}