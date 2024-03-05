import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import "./LocationMap.css";

const LocationMap = () => {
  const defaultLocation = {
    center: {
      lat: "your-lat-coords-here",
      lng: "your-long-coords-here",
    },
    zoom: 15.7,
  };

  const [map, setMap] = useState(null); // State to store the map instance

  const addCircleToMap = (maps) => {
    const circleMarker = new maps.Circle({
      fillColor: "#454545",
      strokeOpacity: 0.7,
      strokeWeight: 2,
      strokeColor: "#454545",
      fillOpacity: 0.3,
      map,
      center: defaultLocation.center,
      radius: 80,
    });
  };

  const onGoogleApiLoaded = ({ map, maps }) => {
    setMap(map);
  };

  useEffect(() => {
    if (map) {
      addCircleToMap(window.google.maps, map);
    }
  }, [map]);

  return (
    <div className="mapContainer" style={{}}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={defaultLocation.center}
        defaultZoom={defaultLocation.zoom}
        onGoogleApiLoaded={onGoogleApiLoaded}
        yesIWantToUseGoogleMapApiInternals // Required to access map and maps objects
      ></GoogleMapReact>
    </div>
  );
};

export default LocationMap;
