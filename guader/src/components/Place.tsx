import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import styled from 'styled-components';
import { DELETE_PLACE } from '../routes/logIn/Places';
import { DeletePlace, DeletePlaceVariables } from '../__generated__/DeletePlace';

const Item = styled.div`
display: flex;
justify-content: space-between;
margin-bottom: 5px;
`

interface IPlace{
address: string | undefined; 
name: string | undefined;
id?: number | undefined;
isFav?: boolean;
dltStart: boolean;
}

export const Place:React.FC<IPlace> = ({
    address,
    name, 
    id, 
    dltStart
}) => {
    const [deletePlaceMutation] = useMutation<DeletePlace, DeletePlaceVariables>(DELETE_PLACE);
    const onClick = (id: any) => {
           
    }
    return(
        <>
        {dltStart ? (
        <Item>
            <div onClick={() => onClick(id)}>
            <Item>
             Name: {name}
            <span>{""}</span>
            </Item>
            <div>Adderss: {address}</div>
            </div>
        </Item>
            
        ): (
            <div onClick={() => onClick(id)}>
            <Item>
             Name: {name}
            <span>{""}</span>
            </Item>
            <div>Adderss: {address}</div>
            </div>
        )}
        </>
    )
}