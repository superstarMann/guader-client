import React from 'react';
import { gql, useApolloClient, useMutation } from '@apollo/client';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { DashBoard } from '../../components/Dashboard';
import { Container, LogInBtn } from '../logOut/OutHome';
import { PhoneForm, PhoneMain, PhoneTitle } from '../logOut/PhoneLogin';
import { EditInput } from './EditAccount';
import { AddPlace, AddPlaceVariables } from '../../__generated__/AddPlace';
import { useForm } from 'react-hook-form';
import { ErrorComment } from '../../components/ErrorComment';
import { useNavigate } from 'react-router';
import { GET_MY_PLACES } from './Places';
import { useMe } from '../../components/useMe';

const ADD_PLACE = gql`
mutation AddPlace($name: String!, $lat: Float!, $lng: Float!, $address: String!, $isFav: Boolean!) {
    AddPlace(name: $name, lat: $lat, lng: $lng, address: $address, isFav: $isFav) {
      ok
      error
      placeId
    }
  }
  
`

const Contents = styled.div`
  padding: 40px;
  width: 100%;
  margin: auto;
  @media screen and (max-width: 32rem) {
      width: 100%;
      padding: none;
      margin-top: 0px;
  }
`

interface IProps{
    name: string;
    lat: number;
    lng: number;
    address: string;
    isFav: boolean;
}

export const AddPlaces = () => {
    const client = useApolloClient()
    const history = useNavigate();
    const {data: userData} = useMe()
    const {register,getValues, handleSubmit, formState:{errors}} = useForm<IProps>()
    const onCompleted = (data: AddPlace) => {
        const {AddPlace: {ok, error, placeId}} = data;
        if(ok){
            const {name, address} = getValues();
            const queryResult = client.readQuery({ query: GET_MY_PLACES });
            console.log(queryResult);
            client.writeQuery({
                query: GET_MY_PLACES,
                data:{
                    GetMyPlaces:{
                        ...queryResult.GetMyPlaces,
                        places:[{
                        address,
                        id: placeId,
                        isFav: true,
                        name,
                        userId: userData?.GetMyProfile.user?.id,
                        __typename: "Place"},
                        ...queryResult.GetMyPlaces.places
                    ]}
                }
            })
            alert("Sucess!")
            history("/places")
        }else{
            console.log(error)
        }

    }
    const [addPlaceMutation, {data: addPlaceResult, loading}] = useMutation<AddPlace, AddPlaceVariables>(ADD_PLACE,
        {onCompleted});
    const onSubmit = () => {
        const {name, address} = getValues()
        addPlaceMutation({
            variables:{
                name,
                address,
                lat: 123,
                lng: 123,
                isFav: true
            }
        })
    }
    return(
        <Container>
            <Helmet><title>add-place | Guader</title></Helmet>
            <DashBoard/>
            <Contents>
                <PhoneMain>
                    <PhoneTitle>Add Your Place</PhoneTitle>
                    <PhoneForm onSubmit={handleSubmit(onSubmit)}>
                        <EditInput type="text" 
                        placeholder='Name'
                        {...register("name")} 
                        />
                        <ErrorComment errorMessage={errors.name?.message}/>
                        <EditInput type="text"
                        placeholder='Address'
                        {...register("address")}
                        />
                        <ErrorComment errorMessage={errors.address?.message}/>
                        <LogInBtn>{loading ? "Loading" : "Add Your Place"}</LogInBtn>
                        {addPlaceResult?.AddPlace.error && (
                            <ErrorComment errorMessage={addPlaceResult.AddPlace.error}/>
                        )}
                    </PhoneForm>
                </PhoneMain>
            </Contents>
        </Container>
    )
}