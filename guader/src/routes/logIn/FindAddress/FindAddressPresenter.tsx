import React from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";

const Center = styled.div`
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
`;

const Map = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

interface IProps {
  mapRef: any;
}

class FindAddressPresenter extends React.Component<IProps> {
  public render() {
    const { mapRef } = this.props;
    return (
      <div>
        <Helmet><title>Find Address | Nuber</title></Helmet>
        <Center>❌</Center>
        <Map itemRef={mapRef} />
      </div>
    );
  }
}

export default FindAddressPresenter;