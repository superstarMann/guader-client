import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
text-align: left;
padding: 5px 0px;
`

interface IProps {
    errorMessage: string | undefined;
}

export const ErrorComment: React.FC<IProps> = ({errorMessage}) => {
    return(
        <Container>{errorMessage}</Container>
    )
}