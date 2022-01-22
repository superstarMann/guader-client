import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Container, Contents, Header, LogInBtn, LoginInput } from './OutHome';
import { useNavigate, useParams } from 'react-router';
import { CompletePhoneVerification, CompletePhoneVerificationVariables } from '../../__generated__/CompletePhoneVerification';
import { Logo, PhoneForm, PhoneMain, PhoneTitle } from './PhoneLogin';
import { ErrorComment } from '../../components/ErrorComment';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGg } from '@fortawesome/free-brands-svg-icons';

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
    const history = useNavigate()
    const {id} = useParams<IParams>();
    const {register, handleSubmit, getValues, formState:{errors}} = useForm<IProps>()
    const onCompleted = (data: CompletePhoneVerification) => {
        const {ok} = data.CompletePhoneVerification
        if(ok){
            alert(`${id} is Success for Verification!`)
            history('/create-account')
        }
    }
    const [completePhoneVerificationMuation, {data: VerifyCodeResult, loading}] = useMutation<
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
            <Link to="/phone-login"><Logo><FontAwesomeIcon icon={faGg}/></Logo></Link>
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
                        {errors.key?.type === "maxLength" &&(
                            <ErrorComment errorMessage='You must be less than 5 numbers'/>
                        )}
                        <LogInBtn>{loading ? "Loading" : "Submit"}</LogInBtn>
                        {VerifyCodeResult?.CompletePhoneVerification.error &&(
                            <ErrorComment errorMessage={VerifyCodeResult.CompletePhoneVerification.error}/>
                        )}
                    </PhoneForm>
                 </PhoneMain>
                </Contents>
            </Header>
        </Container>
    )
}