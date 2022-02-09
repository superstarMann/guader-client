import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { DashBoard } from '../../components/Dashboard';
import { useMe } from '../../components/useMe';
import { GetMyPlaces } from '../../__generated__/GetMyPlaces';
import { Container} from '../logOut/OutHome';

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
const Ul = styled.div`
width: 50%;
padding: 20px;
font-size: 1.125rem;
line-height: 1.75rem;
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-column-gap: 2em;
grid-row-gap: 1em;
`
const Items = styled(Link)`
cursor: pointer;
border: 1px solid white;
padding: 10px 10px;
&:hover{
    border: 1px solid #1abc9c;
    opacity: 0.7;
}
`

const AddItems = styled(Link)`
padding-top: 40px;
color: #f1c40f;
&:hover{
    opacity: 0.7;
}
`

const GET_MY_PLACES = gql`
query GetMyPlaces{
    GetMyPlaces {
      ok
      places {
        id
        name
        userId
        address
      }
      error
    }
  }
  
`
export const Places = () => {
    const {data: userData} = useMe()
    const {data}= useQuery<GetMyPlaces>(GET_MY_PLACES)
    return(
        <Container>
            <Helmet><title>{`places | Guader`}</title></Helmet>
            <DashBoard/>
            <Main>
                <Title>Places</Title>
                <Ul>
                {data?.GetMyPlaces.places?.map((place) => (        
                        <Items to=''>
                            <div>Name: {place?.name}</div>
                            <div>Adderss: {place?.address}</div>
                        </Items>
                ))}
                </Ul>
                <AddItems to='/add-place'>Please Add your Place! &rarr;</AddItems>
            </Main>
        </Container>
    )
}