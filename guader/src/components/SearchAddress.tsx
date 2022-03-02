import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
width: 40%;
`

const Input = styled.input`

`
interface IProps {
    id: string;
}

export const SearchAddress:React.FC<IProps> = ({id}) => {
    return(
        <Container>
            <Input id={id}/>
        </Container>
    )
}