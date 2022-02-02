import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { UpdateMyProfile, UpdateMyProfileVariables } from '../../__generated__/UpdateMyProfile';
import { Container, FContents, LogInBtn } from '../logOut/OutHome';
import { PhoneForm, PhoneMain, PhoneTitle } from '../logOut/PhoneLogin';
import { ErrorComment } from '../../components/ErrorComment';
import { PhotoInput } from '../../components/PhotoInput';
import axios from 'axios';

const EditMain = styled.div`
 padding-right: 50px;
 height: 70%;
 display: flex;
 align-items: center;
 justify-content: center;
 @media screen and (max-width: 32rem) {
    align-items: flex-start;
    margin-top: 20px;
    margin: auto;
    padding-right: 0px;
    }
`

const EditInput = styled.input`
 border: none;
 margin-bottom: 10px;
 padding: 7px 10px;
 border-radius: 0.375rem;
 box-sizing: border-box;
 box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
 &:focus{
     outline:none;
     border: 1px solid ${props => props.theme.colors.blueColor};
 }
 font-size: 1rem;
 line-height: 1.5rem;
`
const UPDATE_MY_PROFILE = gql`
mutation UpdateMyProfile($firstName: String, $lastName: String, $email: String, $profilePhoto: String) {
    UpdateMyProfile(firstName: $firstName, lastName: $lastName, email: $email, profilePhoto: $profilePhoto) {
      ok
      error
    }
  }
  
`
interface IEditProps{
    firstName?: string;
    lastName?: string;
    email?: string;
    profilePhoto?: string;
}

export const EditAccount = () => {
    const [uploading, setUploading] = useState(false)
    const [profilePhoto, setProfilePhoto]= useState("")
    const onInputChange:React.ChangeEventHandler<HTMLInputElement> = async (event) => {
      const {target: {files}} = event;
      if(files){
        setUploading(true)
        const formData = new FormData();
        formData.append("file", files[0])
        formData.append("api_key", "Sb6lqXy1V3EqQ0MvpUIFFFfTAnw")
        formData.append("upload_preset", "mqltjkkb")
        formData.append("timestamp", String(Date.now() / 1000));
        const {data: {secure_url}} = await axios.post("https://api.cloudinary.com/v1_1/dujjh9xtl/image/upload", 
        formData
        )
        if(secure_url){
          setUploading(false);
          setProfilePhoto(secure_url);
        }
      }
    }
    const onCompleted = (data: UpdateMyProfile) => {
      console.log(data.UpdateMyProfile.ok)
    }
    const [updateMyProfileMutation, {data: updateMyProfileResult, loading}] = useMutation<UpdateMyProfile, UpdateMyProfileVariables>(UPDATE_MY_PROFILE, {onCompleted})
    const {register, handleSubmit, getValues} = useForm<IEditProps>()
    const onSubmit = () => {
       const {firstName, lastName, email} = getValues()
       updateMyProfileMutation({
         variables:{
           firstName,
           lastName,
           email,
           profilePhoto
         }
       })
    }
    return(
        <Container>
        <Helmet><title>edit-account | Guader</title></Helmet>
        <EditMain>
          <FContents>
            <PhoneMain>
              <PhoneTitle>Edit Your Account</PhoneTitle>
              <PhotoInput uploading={uploading} fileUrl='' onChange={onInputChange}/>
              <PhoneForm onSubmit={handleSubmit(onSubmit)}>
                <EditInput
                type="email"
                placeholder='example@example.com'
                {...register("email")}
                />
                <EditInput
                type="text"
                placeholder='firstName'
                {...register("firstName")}
                />
                <EditInput
                type="text"
                placeholder='lastName'
                {...register("lastName")}
                />
                <LogInBtn>{loading ? "Loading" : "Update Account"}</LogInBtn>
                {updateMyProfileResult?.UpdateMyProfile.error && (
                  <ErrorComment errorMessage={updateMyProfileResult.UpdateMyProfile.error}/>
                )}
              </PhoneForm>
            </PhoneMain>
          </FContents>
        </EditMain>
      </Container>
    )
}