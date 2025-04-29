import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { HiLocationMarker } from "react-icons/hi";
import ReactDOMServer from 'react-dom/server';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const MapClickHandler = ({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) => {
    useMapEvents({
        click: (e) => {
            onMapClick(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
};

// Create a custom GPS marker icon using a React Icon
const gpsIcon = L.divIcon({
    html: ReactDOMServer.renderToString(<HiLocationMarker style={{ color: 'red', fontSize: '34px', background: 'none' }} />),
    iconAnchor: [12, 24],
});

const Map: React.FC = () => {
    const [markers, setMarkers] = useState<[number, number][]>([]);
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const center: [number, number] = [42.4647, 59.6022];

    const handleMapClick = (lat: number, lng: number) => {
        setMarkers([...markers, [lat, lng]]);
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation([position.coords.latitude, position.coords.longitude]);
                },
                (error) => {
                    console.warn('Geolocation error:', error);
                }
            );
        }
    }, []);

    return (
        <MapContainer center={center} zoom={16} style={{ height: '80vh', width: '100%' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapClickHandler onMapClick={handleMapClick} />

            {markers.map((position, index) => (
                <Marker key={index} position={position}>
                    <Popup>
                        Marker {index + 1}<br />
                        Latitude: {position[0].toFixed(6)}<br />
                        Longitude: {position[1].toFixed(6)}
                    </Popup>
                </Marker>
            ))}

            <Marker position={center}>
                <Popup>The <strong>24GO</strong> office.</Popup>
            </Marker>

            {userLocation && (
                <Marker position={userLocation} icon={gpsIcon}>
                    <Popup>
                        <strong>Your location</strong><br />
                        Latitude: {userLocation[0].toFixed(6)}<br />
                        Longitude: {userLocation[1].toFixed(6)}
                    </Popup>
                </Marker>
            )}
        </MapContainer>
    );
};

export default Map;
