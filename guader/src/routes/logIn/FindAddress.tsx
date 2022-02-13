import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import GoogleMapReact from 'google-map-react';
import styled from 'styled-components';


const MContainer = styled.div`
overflow: hidden;
width: 100%;
display: flex;
`

const Search = styled.div`
width: 30%;
`

const MapContainer = styled.div`
width: 70%;
height: 95vh;
`;

const Pin = styled.span`
font-size: 1.875rem;
line-height: 2.25rem; 
`

export const FindAddress = ()  => {
    const onSuccess = (crood: GeolocationPosition) => {
        console.log(crood);
    }
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(onSuccess);
    })
    return(
        <MContainer>
            <Search>Search Zone</Search>
        <MapContainer>
            <Helmet><title>find-address | Guader</title></Helmet>
            <GoogleMapReact
            defaultZoom={17}
            defaultCenter = {{
                lat: 49.488412991023466, 
                lng: 8.47566118278736
            }}
            bootstrapURLKeys={{key: "AIzaSyBh1qIrmU2aAMIUSd5e2aKhfqYwDRj-ukM"}}
            >
                <Pin>📍</Pin>
            </GoogleMapReact>
        </MapContainer>
        </MContainer>
    )
}