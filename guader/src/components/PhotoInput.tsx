import React from'react'; 
import styled from 'styled-components';
import { useMe } from './useMe';

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

const Image = styled.label`
  cursor: pointer;
  height: 99px;
  width: 99px;
  border: 2px solid black;
  display: block;
  border-radius: 50%;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  overflow: hidden;
  & img {
    width: 110px;
    height: 110px;
  }
`
const Input = styled.input`
color: white;
opacity: 0;
height: 1px;
&:focus{
    outline: none;
}
`

interface IPhotoProps{
uploading: boolean;
fileUrl: string;
onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PhotoInput:React.FC<IPhotoProps> = ({uploading, fileUrl, onChange}) => {
  const {data} = useMe()
    return(
        <Container>
            <Input id={"photo"} type={"file"} accept='image/*' onChange={onChange}/>
            <Image htmlFor='photo'> 
            {!uploading && data?.GetMyProfile.user?.profilePhoto}
            {uploading && "⏰"}
            {!uploading && <img src={fileUrl} />}
            </Image>
        </Container>
    )
}