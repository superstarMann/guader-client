import { GoogleApiWrapper } from "google-maps-react";
import FindAddressContainer from './FindAddressContainer'
export default GoogleApiWrapper({
  apiKey: "AIzaSyBbRtmQhCFlTdRBjJduovbO0qgdXAfbCNg"
})(FindAddressContainer);