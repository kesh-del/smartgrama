import React, { useState } from 'react';
import { GoogleMapSelector } from './GoogleMapSelector';
import { MapPin, CheckCircle } from 'lucide-react';

interface Location {
    lat: number;
    lng: number;
    address: string;
}

export const MapDemo: React.FC = () => {
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

    const handleLocationSelect = (location: Location) => {
        setSelectedLocation(location);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Google Maps Location Selector Demo
                </h1>
                <p className="text-lg text-gray-600">
                    Select a location on the map to report an infrastructure issue
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Map Selector */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <MapPin className="h-5 w-5 mr-2 text-emerald-600" />
                        Location Selection
                    </h2>
                    <GoogleMapSelector
                        onLocationSelect={handleLocationSelect}
                        className="w-full"
                    />
                </div>

                {/* Selected Location Info */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <CheckCircle className="h-5 w-5 mr-2 text-emerald-600" />
                        Selected Location
                    </h2>

                    {selectedLocation ? (
                        <div className="space-y-4">
                            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                                <h3 className="font-medium text-emerald-800 mb-2">Address:</h3>
                                <p className="text-emerald-700">{selectedLocation.address}</p>
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <h3 className="font-medium text-blue-800 mb-2">Coordinates:</h3>
                                <div className="space-y-1 text-sm">
                                    <p className="text-blue-700">
                                        <span className="font-medium">Latitude:</span> {selectedLocation.lat.toFixed(6)}
                                    </p>
                                    <p className="text-blue-700">
                                        <span className="font-medium">Longitude:</span> {selectedLocation.lng.toFixed(6)}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                <h3 className="font-medium text-gray-800 mb-2">Google Maps Link:</h3>
                                <a
                                    href={`https://www.google.com/maps?q=${selectedLocation.lat},${selectedLocation.lng}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-emerald-600 hover:text-emerald-700 underline break-all"
                                >
                                    View on Google Maps
                                </a>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600">No location selected yet</p>
                            <p className="text-sm text-gray-500 mt-2">
                                Use the map on the left to select a location
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Features List */}
            <div className="mt-12 bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Features:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                            <p className="font-medium text-gray-900">Interactive Map</p>
                            <p className="text-sm text-gray-600">Click anywhere on the map to select a location</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                            <p className="font-medium text-gray-900">Search Functionality</p>
                            <p className="text-sm text-gray-600">Search for specific addresses or places</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                            <p className="font-medium text-gray-900">Current Location</p>
                            <p className="text-sm text-gray-600">Use your device's GPS to get current location</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                            <p className="font-medium text-gray-900">Draggable Marker</p>
                            <p className="text-sm text-gray-600">Drag the marker to fine-tune the location</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                            <p className="font-medium text-gray-900">Reverse Geocoding</p>
                            <p className="text-sm text-gray-600">Automatically get address from coordinates</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                            <p className="font-medium text-gray-900">Real-time Updates</p>
                            <p className="text-sm text-gray-600">Location updates in real-time as you interact</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}; 