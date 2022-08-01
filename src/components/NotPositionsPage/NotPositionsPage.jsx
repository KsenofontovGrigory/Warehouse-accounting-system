import {useState} from 'react';
import {Button} from "@mui/material";

import { ModalWindow } from "../ModalWindow";

import * as S from './NotPositionsPage.styles'

export const NotPositionsPage = () => {
    const [openProduct, setOpenProduct] = useState(false);
    const handleOpenProduct = () => setOpenProduct(true);
    const handleCloseProduct = () => setOpenProduct(false);

    return (
        <div>
            <S.Container>
                <S.Title>
                    Nothing here yet
                </S.Title>
            </S.Container>
            <S.ContainerButton>
                <Button
                    onClick={handleOpenProduct}
                >
                    Add warehouse
                </Button>
                <Button>
                    Add product
                </Button>
            </S.ContainerButton>

            <ModalWindow
                open={openProduct}
                handleClose={handleCloseProduct}
                title='Add product'
            />
        </div>
    );
};
