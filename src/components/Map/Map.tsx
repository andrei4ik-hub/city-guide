
// import React, { useRef, useState } from 'react';
// import { Box, Button, MenuItem, Select, SelectChangeEvent } from '@mui/material';
// import { landmarks } from '../landmarks';
// import useYandexMap from '../../hooks/useYandexMap';

// declare const ymaps: any;

// const Map: React.FC = () => {
//   const mapRef = useRef<HTMLDivElement | null>(null);
//   const [selectedLandmark, setSelectedLandmark] = useState<number | null>(null);
//   const [userLocation, setUserLocation] = useState<number[] | null>(null);
//   const [mapInstance, route, clearRoute] = useYandexMap(mapRef, landmarks, setUserLocation);

//   const handleLandmarkChange = (event: SelectChangeEvent<number>) => {
//     console.log("Landmark changed:", event.target.value);
//     setSelectedLandmark(Number(event.target.value));
//   };

//   const handleBuildRoute = () => {
//     console.log("Build route clicked");
//     if (userLocation && selectedLandmark !== null && mapInstance) {
//       const destination = landmarks.find(landmark => landmark.id === selectedLandmark);
//       console.log("User location:", userLocation);
//       console.log("Selected landmark:", destination);
//       if (destination) {
//         ymaps.route([userLocation, destination.coordinates]).then((routeInstance: any) => {
//           console.log("Route created:", routeInstance);
//           mapInstance.geoObjects.add(routeInstance);
//           route.current = routeInstance;
//         }).catch((error: any) => {
//           console.error('Ошибка построения маршрута', error);
//         });
//       }
//     }
//   };

//   const handleClearRoute = () => {
//     console.log("Clear route clicked");
//     if (route.current && mapInstance) {
//       mapInstance.geoObjects.remove(route.current);
//       route.current = null;
//     }
//   };

//   return (
//     <Box display="flex" flexDirection="column" alignItems="center" height="100vh">
//       <Select
//         value={selectedLandmark ?? ''}
//         onChange={handleLandmarkChange}
//         displayEmpty
//         variant="outlined"
//         style={{ marginBottom: '1rem' }}
//       >
//         <MenuItem value="" disabled>Выберите достопримечательность</MenuItem>
//         {landmarks.map(landmark => (
//           <MenuItem key={landmark.id} value={landmark.id}>
//             {landmark.name}
//           </MenuItem>
//         ))}
//       </Select>
//       <Box display="flex" gap={2} mb={2}>
//         <Button variant="contained" color="primary" onClick={handleBuildRoute} disabled={!selectedLandmark}>
//           Построить маршрут
//         </Button>
//         <Button variant="outlined" color="secondary" onClick={handleClearRoute}>
//           Сбросить маршрут
//         </Button>
//       </Box>
//       <Box display="flex" justifyContent="center" alignItems="center" height="100%" width="100%">
//         <div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>
//       </Box>
//     </Box>
//   );
// };

// export default Map;

import React, { useRef, useState } from 'react';
import { Box, Button, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { landmarks } from '../landmarks';
import useYandexMap from '../../hooks/useYandexMap';

declare const ymaps: any;

const Map: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [selectedLandmark, setSelectedLandmark] = useState<number | null>(null);
  const [userLocation, setUserLocation] = useState<number[] | null>(null);
  const [mapInstance, route, clearRoute] = useYandexMap(mapRef, landmarks, setUserLocation);
  const navigate = useNavigate();

  const handleLandmarkChange = (event: SelectChangeEvent<number>) => {
    console.log("Landmark changed:", event.target.value);
    setSelectedLandmark(Number(event.target.value));
  };

  const handleBuildRoute = () => {
    console.log("Build route clicked");
    if (userLocation && selectedLandmark !== null && mapInstance) {
      const destination = landmarks.find(landmark => landmark.id === selectedLandmark);
      console.log("User location:", userLocation);
      console.log("Selected landmark:", destination);
      if (destination) {
        ymaps.route([userLocation, destination.coordinates]).then((routeInstance: any) => {
          console.log("Route created:", routeInstance);
          mapInstance.geoObjects.add(routeInstance);
          route.current = routeInstance;
        }).catch((error: any) => {
          console.error('Ошибка построения маршрута', error);
        });
      }
    }
  };

  const handleClearRoute = () => {
    console.log("Clear route clicked");
    if (route.current && mapInstance) {
      mapInstance.geoObjects.remove(route.current);
      route.current = null;
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" height="100vh">
      <Button variant="outlined" color="secondary" onClick={handleSignOut} style={{ marginBottom: '1rem' }}>
        Sign Out
      </Button>
      <Select
        value={selectedLandmark ?? ''}
        onChange={handleLandmarkChange}
        displayEmpty
        variant="outlined"
        style={{ marginBottom: '1rem' }}
      >
        <MenuItem value="" disabled>Выберите достопримечательность</MenuItem>
        {landmarks.map(landmark => (
          <MenuItem key={landmark.id} value={landmark.id}>
            {landmark.name}
          </MenuItem>
        ))}
      </Select>
      <Box display="flex" gap={2} mb={2}>
        <Button variant="contained" color="primary" onClick={handleBuildRoute} disabled={!selectedLandmark}>
          Построить маршрут
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleClearRoute}>
          Сбросить маршрут
        </Button>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" height="100%" width="100%">
        <div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>
      </Box>
    </Box>
  );
};

export default Map;
