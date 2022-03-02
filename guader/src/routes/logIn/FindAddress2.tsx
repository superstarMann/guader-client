import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import styled from 'styled-components';
import { SearchAddress } from '../../components/SearchAddress';

const Container = styled.div`
width: 100%;
height: 93vh;
display: flex;
`


interface ICoords {
    lat: number;
    lng: number;
}

interface ILocation {
    location: string;
}

export const FindAddress2 = () => {
    const [location, setLocation] = useState("");
    const [map, setMap] = useState<google.maps.Map>();
    const [maps, setMaps] = useState<any>();
    const [userCoords, setUserCoords] = useState<ICoords>({lat: 37.2200679, lng: 126.9494875})
    const onWatchSuccess = (crood: GeolocationPosition) => {
        console.log(crood);
    }
    useEffect(() => {
       if(map && maps){
        map.panTo(new google.maps.LatLng(userCoords.lat, userCoords.lng));
       }
    }, [userCoords.lat, userCoords.lng])

    const onApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
        
    };


    const initBox = ({ map, maps }: { map: any; maps: any }) => {
        const input = document.getElementById("pac-input") as HTMLInputElement;
        const searchBox = new google.maps.places.SearchBox(input);
        searchBox.addListener("places_changed", () => {
            const places = searchBox.getPlaces();
            if (places.length == 0) {
              return;
            }
        })
    }
    return(
        <div>
            <Container>
                <SearchAddress id={'pac-input'}/>
                <GoogleMapReact
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={onApiLoaded}
                draggable={false}
                defaultZoom={15}
                defaultCenter={userCoords}
                bootstrapURLKeys={{key: "AIzaSyBbRtmQhCFlTdRBjJduovbO0qgdXAfbCNg"}}>
                </GoogleMapReact>
            </Container>
        </div>
    )
}