import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';

const MContainer = styled.div`
overflow: hidden;
display: flex;
`
const MapContainer = styled.div`
width: 100%;
height: 92vh;
`;

const Pin = styled.span`
  position: absolute;
  width: 40px;
  height: 40px;
  z-index: 2;
  font-size: 30px;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

interface ICoords{
    lng: number;
    lat: number;
}
export const FindAddress = () => {
    const [nowCoords, setNowCoords] = useState<ICoords>({lat: 49.488412991023466, lng: 8.47566118278736})
    const [map, setMap] = useState<google.maps.Map>();
    const [maps, setMaps] = useState<any>();
    // @ts-ignore
    const onSucces = ({ coords: { latitude, longitude } }: Position) => {
      setNowCoords({ lat: latitude, lng: longitude });
    };
    // @ts-ignore
    const onError = (error: PositionError) => {
      console.log(error);
    };
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(onSucces, onError,{
            enableHighAccuracy: false
        })
        if(map && maps){
            map.addListener("drag", new maps.LatLng(nowCoords.lat, nowCoords.lng))
        }
    }, []);
    const onApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
      map.panTo(new maps.LatLng(nowCoords.lat, nowCoords.lng));
      setMap(map);
      setMaps(maps)
      console.log(nowCoords)
    };
    return(
        <MContainer>
            <Helmet><title>find-address | Guader</title></Helmet>
            <MapContainer>
            <Pin>📍</Pin>
            <GoogleMapReact
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={onApiLoaded}
            defaultZoom={17}
            defaultCenter = {{
                lat: nowCoords.lat,
                lng: nowCoords.lng
            }}
            bootstrapURLKeys={{key: "AIzaSyBh1qIrmU2aAMIUSd5e2aKhfqYwDRj-ukM"}}
            >
            </GoogleMapReact>
        </MapContainer>
        </MContainer>
    )
}