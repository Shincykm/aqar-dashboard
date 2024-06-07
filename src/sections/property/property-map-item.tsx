"use client";
import React, { useCallback, useRef, useEffect } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '800px'
};

const center = {
  lat: 24.49116,
  lng: 54.3835
};

interface Location {
  lat: number | any;
  lng: number | any;
}

interface PropertyMapItemProps {
  location: Location | null;
  handleLocation: (newValue: Location) => void;
}

const apiKey: string = import.meta.env.VITE_GOOGLE_MAPS_API; // Replace with your Google Maps API key
const libraries: ('places' | 'drawing' | 'geometry' | 'visualization' | 'marker')[] = ['marker'];

const PropertyMapItem: React.FC<PropertyMapItemProps> = ({ location, handleLocation }) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  const onClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      handleLocation({ lat, lng });
    }
  }, [handleLocation]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    libraries: libraries // Ensure the marker library is loaded
  });

  useEffect(() => {
    if (isLoaded && location && mapRef.current) {
      if (!markerRef.current) {
        markerRef.current = new google.maps.Marker({
          position: location,
          map: mapRef.current,
        });
      } else {
        markerRef.current.setPosition(location);
      }
      mapRef.current.setCenter(location); 
    }
  }, [isLoaded, location]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onClick={onClick}
      onLoad={(map: google.maps.Map):any => (mapRef.current = map)}
    />
  ) : <></>;
};

export default React.memo(PropertyMapItem);
