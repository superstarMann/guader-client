import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Container, Contents, Header, LogInBtn, LoginInput } from './OutHome';
import { useNavigate, useParams } from 'react-router';
import { CompletePhoneVerification, CompletePhoneVerificationVariables } from '../../__generated__/CompletePhoneVerification';
import { PhoneForm, PhoneMain, PhoneTitle } from './PhoneLogin';

const COMPLETE_PHONE_VERIFICATION = gql`
mutation CompletePhoneVerification($key: String!, $phoneNumber: String!) {
    CompletePhoneVerification(key: $key, phoneNumber: $phoneNumber) {
      ok
      error
    }
  }
`

interface IProps{
    key: string;
}

type IParams = {
    id: string;
}

export const VerifyPhone = () => {
    const {id} = useParams<IParams>();
    const {register, handleSubmit, getValues, formState:{errors, isValid}} = useForm<IProps>()
    const onCompleted = (data: CompletePhoneVerification) => {
        console.log(data.CompletePhoneVerification.ok)
    }
    const [completePhoneVerificationMuation, {data: VerifyCode, loading}] = useMutation<
    CompletePhoneVerification, CompletePhoneVerificationVariables>(COMPLETE_PHONE_VERIFICATION, {onCompleted});
    const onSubmit = () => {
        console.log(`VerifyCode:${getValues("key")}, PhoneNumber:${id}`);
        const {key} = getValues();
        completePhoneVerificationMuation({
            variables:{
                key,
                phoneNumber: id //CompletePhoneVerification.ts + | undefined
            }
        })
    }

    return(
        <Container>
            <Helmet><title>{id} | Guader</title></Helmet>
            <Header>
                <Contents>
                 <PhoneMain>
                    <PhoneTitle>2. Verify Your Code</PhoneTitle>
                    <PhoneForm onSubmit={handleSubmit(onSubmit)}>
                        <LoginInput
                        placeholder='1234'
                        {...register('key', 
                        {required: 'Please Enter Your Verify Code',
                        maxLength: 5
                        })}/>
                        <LogInBtn>{loading ? "Loading" : "Submit"}</LogInBtn>
                    </PhoneForm>
                 </PhoneMain>
                </Contents>
            </Header>
        </Container>
    )
}