import React from 'react';
import { gql, useApolloClient, useMutation } from '@apollo/client';
import styled from 'styled-components';
import { DELETE_PLACE } from '../routes/logIn/Places';
import { DeletePlace, DeletePlaceVariables } from '../__generated__/DeletePlace';

const Items = styled.div`
border: 1px solid white;
padding: 13px 12px;
border-radius: 5px;
`

const Item = styled.div`
display: flex;
justify-content: space-between;
margin-bottom: 5px;
`

const DltBtn = styled.div`
border: none;
cursor: pointer;
font-size: 0.75rem;
line-height: 1rem;
`

interface IPlace{
address: string | undefined; 
name: string | undefined;
id?: number | undefined;
isFav?: boolean;
}

export const Place:React.FC<IPlace> = ({ address, name, id, isFav }) => {
    const client = useApolloClient()
    const onCompleted = (data: DeletePlace) => {
        const {DeletePlace: {ok, error}} = data;
        if(ok){
            console.log('it works')
        }else if(error){
            console.log(error)
        }
    }
    const [deletePlaceMutation] = useMutation<DeletePlace, DeletePlaceVariables>(DELETE_PLACE,
        {onCompleted});
    const onClick = (placeId: any) => {
        deletePlaceMutation({
            variables:{
                placeId
            }
        })
            client.writeFragment({
                id: `Place:${placeId}`,
                fragment: gql`
                fragment DeletePlace on Place{
                    isFav
                }
                `,
                data:{
                    isFav: false
                }
            })
    }
   
    return(
        <>
        {isFav && (
            <Items>
                <Item>
                 Name: {name}
                    <DltBtn onClick={() => onClick(id)}>
                     ❌
                    </DltBtn>
                </Item>
                <div>Adderss: {address}</div>
            </Items>
        )}
        </>
    )
}