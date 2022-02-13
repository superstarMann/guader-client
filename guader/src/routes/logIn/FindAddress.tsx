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
height: 92vh;
`;

const Pin = styled.span`
font-size: 1.875rem;
line-height: 2.25rem; 
`

interface ICoords{
    lat: number;
    lng: number;
}

export const FindAddress = ()  => {
    const [nowCoords, setNowCoords] = useState<ICoords>({lat: 49.488412991023466, lng: 8.47566118278736})
    const onSuccess = ({coords:{latitude, longitude}}: GeolocationPosition) => {
        console.log(latitude, longitude);
    }
    const onError = (error: GeolocationPositionError) => {
        console.log(error);
    }
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(onSuccess, onError, {
            enableHighAccuracy: true
        })
    }, [])
    const onApiLoad = ({map, maps}: {map: any, maps: any}) => {
        map.panTo(new maps)
    }
    return(
        <MContainer>
            <Search>Search Zone</Search>
        <MapContainer>
            <Helmet><title>find-address | Guader</title></Helmet>
            <GoogleMapReact
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={onApiLoad}
            defaultZoom={17}
            defaultCenter = {{
                lat: nowCoords.lat,
                lng: nowCoords.lng
            }}
            bootstrapURLKeys={{key: "AIzaSyBh1qIrmU2aAMIUSd5e2aKhfqYwDRj-ukM"}}
            >
                <Pin>📍</Pin>
            </GoogleMapReact>
        </MapContainer>
        </MContainer>
    )
}