# GramaConnect - Rural Infrastructure Issue Tracking

A comprehensive platform for citizens to report and track infrastructure issues in rural communities, with integrated Google Maps location selection.

## Features

### 🗺️ Google Maps Integration
- **Interactive Location Selection**: Click anywhere on the map to select a location
- **Search Functionality**: Search for specific addresses or places
- **Current Location**: Use device GPS to get current location
- **Draggable Marker**: Fine-tune location by dragging the marker
- **Reverse Geocoding**: Automatically get address from coordinates
- **Real-time Updates**: Location updates as you interact with the map

### 📱 Issue Reporting
- **Photo Upload**: Upload up to 5 photos per issue
- **Camera Capture**: Take photos directly from the device camera
- **Category Selection**: Choose from predefined issue categories
- **Priority Levels**: Set issue priority (Low, Medium, High, Critical)
- **Location Tracking**: Precise location selection with Google Maps
- **Status Tracking**: Monitor issue progress from reported to resolved

### 👥 User Management
- **Citizen Dashboard**: Report and track personal issues
- **Volunteer Dashboard**: Manage and respond to community issues
- **Education Hub**: Access educational resources

## Google Maps API Integration

### API Key Configuration
The application uses the Google Maps JavaScript API with the following key:
```
AIzaSyDWeYaXijoWdc7SrfWuMfQktyw5W7NdB3
```

### Features Implemented
1. **Map Loading**: Uses `@googlemaps/js-api-loader` for efficient API loading
2. **Search Box**: Integrated Google Places SearchBox for address search
3. **Geocoding**: Reverse geocoding to get addresses from coordinates
4. **Current Location**: Browser geolocation API integration
5. **Interactive Markers**: Draggable markers for precise location selection

### Components
- `GoogleMapSelector`: Main map component with all location selection features
- `MapDemo`: Demo page showcasing all map functionality
- `ReportIssueForm`: Enhanced with Google Maps integration

## Getting Started

### Prerequisites
- Node.js (v18.17.1 or higher)
- npm or yarn

### Installation
```bash
# Navigate to project directory
cd project

# Install dependencies
npm install

# Start development server
npm run dev
```

### Dependencies
```json
{
  "@googlemaps/js-api-loader": "^1.16.2",
  "@types/google.maps": "^3.54.10",
  "lucide-react": "^0.344.0",
  "react": "^18.3.1",
  "react-dom": "^18.3.1"
}
```

## Usage

### Reporting an Issue
1. Navigate to the Citizen Dashboard
2. Click "Report New Issue"
3. Fill in issue details (title, description, category, priority)
4. **Select Location**:
   - Enter address manually, OR
   - Click "Use Current Location" for GPS location, OR
   - Click "Select on Map" to open Google Maps selector
5. Upload photos (optional)
6. Submit the report

### Map Demo
1. Navigate to "Map Demo" in the sidebar
2. Explore the interactive map features:
   - Search for locations
   - Click to select locations
   - Drag the marker
   - Use current location
3. View selected location details and coordinates

## Technical Implementation

### Google Maps Component (`GoogleMapSelector`)
```typescript
interface GoogleMapSelectorProps {
  onLocationSelect: (location: Location) => void;
  initialLocation?: Location;
  className?: string;
}
```

### Location Interface
```typescript
interface Location {
  lat: number;
  lng: number;
  address: string;
}
```

### Key Features
- **Lazy Loading**: Maps API loads only when needed
- **Error Handling**: Comprehensive error handling for API failures
- **Responsive Design**: Works on desktop and mobile devices
- **Accessibility**: Keyboard navigation and screen reader support
- **Performance**: Optimized for smooth interactions

## API Services Used

### Google Maps JavaScript API
- **Maps**: Interactive map display
- **Places**: Location search functionality
- **Geocoding**: Address lookup and reverse geocoding

### Browser APIs
- **Geolocation API**: Current location detection
- **File API**: Photo upload and preview

## Security Considerations

### API Key Security
- The API key is configured for web applications
- Domain restrictions should be applied in production
- Usage quotas should be monitored

### Data Privacy
- Location data is only stored when explicitly submitted
- User consent is required for location access
- Photos are processed locally before upload

## Development

### Project Structure
```
src/
├── components/
│   ├── common/
│   │   ├── GoogleMapSelector.tsx    # Main map component
│   │   └── MapDemo.tsx              # Demo page
│   └── citizen/
│       └── ReportIssueForm.tsx      # Enhanced with maps
├── contexts/
├── pages/
└── types/
```

### Adding New Map Features
1. Extend the `GoogleMapSelector` component
2. Add new props to the interface
3. Implement the feature using Google Maps API
4. Update the demo page to showcase new functionality

## Troubleshooting

### Common Issues
1. **Map not loading**: Check API key and internet connection
2. **Location not working**: Ensure HTTPS and location permissions
3. **Search not working**: Verify Places API is enabled
4. **Performance issues**: Check for excessive API calls

### Debug Mode
Enable console logging for debugging:
```typescript
const loader = new Loader({
  apiKey: GOOGLE_MAPS_API_KEY,
  version: 'weekly',
  libraries: ['places'],
  // Add for debugging
  // apiKey: process.env.NODE_ENV === 'development' ? 'debug' : GOOGLE_MAPS_API_KEY
});
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Implement your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues related to:
- **Google Maps API**: Check [Google Maps Platform documentation](https://developers.google.com/maps)
- **Application**: Create an issue in the repository
- **Location Services**: Ensure browser permissions are enabled 