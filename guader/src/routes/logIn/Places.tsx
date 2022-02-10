import React, { useEffect, useState } from 'react';
import { gql, useApolloClient, useMutation, useQuery } from '@apollo/client';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { DashBoard } from '../../components/Dashboard';
import { GetMyPlaces } from '../../__generated__/GetMyPlaces';
import { Container} from '../logOut/OutHome';
import { Place } from '../../components/Place';
import { DeletePlace, DeletePlaceVariables } from '../../__generated__/DeletePlace';

const Main = styled.div`
display: flex;
justify-content: center;
align-items: center;
padding-top: 40px;
flex-direction: column;
`

const Title = styled.h1`
font-size: 1.875rem;
line-height: 2.25rem; 
margin-bottom: 20px;
@media screen and (max-width: 32rem) {
  font-size: 1.5rem;
  line-height: 2rem;
  margin-bottom: 30px;
 }
`
const ToggleBox = styled.div`
display: flex;
padding: 7px 20px;
width: 50%;
flex-direction: row;
justify-content: right;
gap: 10px;
color: black;
`
const ChangeFav = styled.div`
background-color: #ffeaa7;
padding: 5px;
cursor: pointer;
border-radius: 5px;
`

const ToggleDelete = styled.div`
background-color: #ff7675;
padding: 5px;
cursor: pointer;
border-radius: 5px;
`

const Ul = styled.div`
width: 50%;
padding: 20px;
font-size: 1.125rem;
line-height: 1.75rem;
display: grid;
grid-template-columns: repeat(2, 1fr);
grid-column-gap: 2em;
grid-row-gap: 1em;
`
const Items = styled(Link)`
cursor: pointer;
border: 1px solid white;
padding: 13px 12px;
&:hover{
    border: 1px solid #1abc9c;
    opacity: 0.7;
}
border-radius: 5px;
`

const AddItems = styled(Link)`
padding-top: 40px;
color: #f1c40f;
&:hover{
    opacity: 0.7;
}
`

export const GET_MY_PLACES = gql`
query GetMyPlaces{
    GetMyPlaces {
      ok
      places {
        id
        name
        userId
        address
        isFav
      }
      error
    }
}
`
export const DELETE_PLACE = gql`
mutation DeletePlace($placeId: Int!) {
    DeletePlace(placeId: $placeId) {
      ok
      error
    }
  }
`

export const Places = () => {
    const {data}= useQuery<GetMyPlaces>(GET_MY_PLACES);
    const [dltStart, setDltStart] = useState(false);
    const triggerBtn = () => {
        setDltStart(!dltStart);
    }

    return(
        <Container>
            <Helmet><title>{`places | Guader`}</title></Helmet>
            <DashBoard/>
            <Main>
                <Title>Favorite Places</Title>
                   <ToggleBox>
                       {dltStart ? (
                       <ToggleDelete onClick={triggerBtn}>Done</ToggleDelete>) : (
                        <ToggleDelete onClick={triggerBtn}>Delete</ToggleDelete>
                       )}
                   </ToggleBox>
                <Ul>
                {data?.GetMyPlaces.places?.map((place) => (        
                    <Items to=''>
                      <Place
                      dltStart={dltStart}
                      id={place?.id}
                      address={place?.address}
                      name={place?.name}
                      isFav={place?.isFav}
                      />
                    </Items>
                ))}
                </Ul>
                <AddItems to='/add-place'>Please Add your Place! &rarr;</AddItems>
            </Main>
        </Container>
    )
}