import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { MapPin, Search, X } from 'lucide-react';

interface Location {
    lat: number;
    lng: number;
    address: string;
}

interface GoogleMapSelectorProps {
    onLocationSelect: (location: Location) => void;
    initialLocation?: Location;
    className?: string;
}

const GOOGLE_MAPS_API_KEY = 'AIzaSyDWeYaXijoWdc7SrfWuMfQktyw5W7NdB3c';

export const GoogleMapSelector: React.FC<GoogleMapSelectorProps> = ({
    onLocationSelect,
    initialLocation = { lat: 28.6139, lng: 77.2090, address: '' },
    className = ''
}) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const searchBoxRef = useRef<HTMLInputElement>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [marker, setMarker] = useState<google.maps.Marker | null>(null);
    const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const [selectedLocation, setSelectedLocation] = useState<Location>(initialLocation);

    useEffect(() => {
        const initMap = async () => {
            try {
                setIsLoading(true);
                setError('');

                const loader = new Loader({
                    apiKey: GOOGLE_MAPS_API_KEY,
                    version: 'weekly',
                    libraries: ['places']
                });

                const google = await loader.load();

                if (!mapRef.current) return;

                const mapInstance = new google.maps.Map(mapRef.current, {
                    center: { lat: initialLocation.lat, lng: initialLocation.lng },
                    zoom: 13,
                    mapTypeControl: false,
                    streetViewControl: false,
                    fullscreenControl: false,
                    styles: [
                        {
                            featureType: 'poi',
                            elementType: 'labels',
                            stylers: [{ visibility: 'off' }]
                        }
                    ]
                });

                const markerInstance = new google.maps.Marker({
                    position: { lat: initialLocation.lat, lng: initialLocation.lng },
                    map: mapInstance,
                    draggable: true,
                    title: 'Selected Location'
                });

                // Initialize search box
                if (searchBoxRef.current) {
                    const searchBoxInstance = new google.maps.places.SearchBox(searchBoxRef.current);
                    setSearchBox(searchBoxInstance);

                    // Bias search results to current map viewport
                    mapInstance.addListener('bounds_changed', () => {
                        searchBoxInstance.setBounds(mapInstance.getBounds() as google.maps.LatLngBounds);
                    });

                    // Listen for search results
                    searchBoxInstance.addListener('places_changed', () => {
                        const places = searchBoxInstance.getPlaces();
                        if (!places || places.length === 0) return;

                        const place = places[0];
                        if (!place.geometry || !place.geometry.location) return;

                        const location = {
                            lat: place.geometry.location.lat(),
                            lng: place.geometry.location.lng(),
                            address: place.formatted_address || ''
                        };

                        setSelectedLocation(location);
                        mapInstance.setCenter(place.geometry.location);
                        markerInstance.setPosition(place.geometry.location);
                        onLocationSelect(location);
                    });
                }

                // Handle map click
                mapInstance.addListener('click', (event: google.maps.MapMouseEvent) => {
                    if (!event.latLng) return;

                    const location = {
                        lat: event.latLng.lat(),
                        lng: event.latLng.lng(),
                        address: ''
                    };

                    markerInstance.setPosition(event.latLng);
                    setSelectedLocation(location);

                    // Reverse geocode to get address
                    const geocoder = new google.maps.Geocoder();
                    geocoder.geocode({ location: event.latLng }, (results, status) => {
                        if (status === 'OK' && results && results[0]) {
                            const locationWithAddress = {
                                ...location,
                                address: results[0].formatted_address
                            };
                            setSelectedLocation(locationWithAddress);
                            onLocationSelect(locationWithAddress);
                        } else {
                            onLocationSelect(location);
                        }
                    });
                });

                // Handle marker drag
                markerInstance.addListener('dragend', (event: google.maps.MapMouseEvent) => {
                    if (!event.latLng) return;

                    const location = {
                        lat: event.latLng.lat(),
                        lng: event.latLng.lng(),
                        address: ''
                    };

                    setSelectedLocation(location);

                    // Reverse geocode to get address
                    const geocoder = new google.maps.Geocoder();
                    geocoder.geocode({ location: event.latLng }, (results, status) => {
                        if (status === 'OK' && results && results[0]) {
                            const locationWithAddress = {
                                ...location,
                                address: results[0].formatted_address
                            };
                            setSelectedLocation(locationWithAddress);
                            onLocationSelect(locationWithAddress);
                        } else {
                            onLocationSelect(location);
                        }
                    });
                });

                setMap(mapInstance);
                setMarker(markerInstance);
                setIsLoading(false);
            } catch (err) {
                console.error('Error loading Google Maps:', err);
                setError('Failed to load Google Maps. Please check your internet connection.');
                setIsLoading(false);
            }
        };

        initMap();
    }, [initialLocation, onLocationSelect]);

    const handleUseCurrentLocation = () => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by this browser.');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const location = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    address: ''
                };

                if (map && marker) {
                    const latLng = new google.maps.LatLng(location.lat, location.lng);
                    map.setCenter(latLng);
                    marker.setPosition(latLng);

                    // Reverse geocode to get address
                    const geocoder = new google.maps.Geocoder();
                    geocoder.geocode({ location: latLng }, (results, status) => {
                        if (status === 'OK' && results && results[0]) {
                            const locationWithAddress = {
                                ...location,
                                address: results[0].formatted_address
                            };
                            setSelectedLocation(locationWithAddress);
                            onLocationSelect(locationWithAddress);
                        } else {
                            setSelectedLocation(location);
                            onLocationSelect(location);
                        }
                    });
                }
            },
            (error) => {
                let errorMessage = '';
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = 'Location access was denied. Please enable location services.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = 'Location information is unavailable.';
                        break;
                    case error.TIMEOUT:
                        errorMessage = 'Location request timed out.';
                        break;
                    default:
                        errorMessage = 'An error occurred while retrieving your location.';
                        break;
                }
                setError(errorMessage);
            }
        );
    };

    const clearError = () => {
        setError('');
    };

    return (
        <div className={`space-y-4 ${className}`}>
            {/* Search Box */}
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    ref={searchBoxRef}
                    type="text"
                    placeholder="Search for a location..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
            </div>

            {/* Current Location Button */}
            <button
                type="button"
                onClick={handleUseCurrentLocation}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 border border-emerald-300 rounded-lg hover:bg-emerald-50 transition-colors"
            >
                <MapPin className="h-4 w-4" />
                <span>Use Current Location</span>
            </button>

            {/* Error Display */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="flex items-start justify-between">
                        <p className="text-sm text-red-800">{error}</p>
                        <button
                            type="button"
                            onClick={clearError}
                            className="text-red-400 hover:text-red-600 ml-2"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            )}

            {/* Map Container */}
            <div className="relative">
                <div
                    ref={mapRef}
                    className="w-full h-64 rounded-lg border border-gray-300 overflow-hidden"
                />
                {isLoading && (
                    <div className="absolute inset-0 bg-gray-100 bg-opacity-75 flex items-center justify-center rounded-lg">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
                            <p className="mt-2 text-sm text-gray-600">Loading map...</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Selected Location Info */}
            {selectedLocation.address && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">Selected Location:</p>
                    <p className="text-sm text-gray-600">{selectedLocation.address}</p>
                    <p className="text-xs text-gray-500 mt-1">
                        Lat: {selectedLocation.lat.toFixed(6)}, Lng: {selectedLocation.lng.toFixed(6)}
                    </p>
                </div>
            )}

            {/* Instructions */}
            <div className="text-xs text-gray-500 text-center">
                Click on the map to select a location or drag the marker to adjust
            </div>
        </div>
    );
}; 