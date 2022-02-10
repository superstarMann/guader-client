import React from 'react';
import styled from 'styled-components';

const Item = styled.div`
display: flex;
justify-content: space-between;
margin-bottom: 5px;
`

interface IPlace{
address: string | undefined; 
name: string | undefined;
id?: number | undefined;
isFav?: boolean | undefined;
onClick?: (id: any, isFav: any) => void | undefined;
}

export const Place:React.FC<IPlace> = ({address,name, id, isFav, onClick}) => {
    const wow = () => {}

    return(
        <>
        <Item>
        Name: {name}
        <span>hi</span>
        </Item>
        <div>Adderss: {address}</div>
        </>
    )
}