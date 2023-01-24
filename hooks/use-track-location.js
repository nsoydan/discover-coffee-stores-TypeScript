import { useContext, useState } from "react";
import { StoreContext } from "../store/store-context";

const useTrackLocation = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isFindingLocation, setIsFindingLocation] = useState(false);
  const { setLatLong } = useContext(StoreContext);

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setLatLong(`${latitude},${longitude}`);

    setErrorMessage("");
    setIsFindingLocation(false);
  }

  function error() {
    setErrorMessage("Unable to retrieve your location");
    setIsFindingLocation(false);
  }

  function handleTrackLocation() {
    setIsFindingLocation(true);

    if (!navigator.geolocation) {
      setErrorMessage("Geolocation is not supported by your browser");
      setIsFindingLocation(false);
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  return {
    //latLong,
    errorMessage,
    handleTrackLocation,
    isFindingLocation,
  };
};

export default useTrackLocation;
