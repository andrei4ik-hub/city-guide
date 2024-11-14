import { useEffect, useRef, useState } from 'react';

declare const ymaps: any;

const useYandexMap = (mapRef: React.RefObject<HTMLDivElement>, landmarks: any[], setUserLocation: (coords: number[] | null) => void) => {
  const [mapInstance, setMapInstance] = useState<any>(null);
  const route = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance) return;

    const loadMap = () => {
      ymaps.ready(() => {
        if (mapRef.current) {
          const map = new ymaps.Map(mapRef.current, {
            center: [55.751574, 37.573856],
            zoom: 10,
          });

          map.controls.remove('searchControl');
          setMapInstance(map);

          if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const userLocation = [position.coords.latitude, position.coords.longitude];
                map.setCenter(userLocation, 14);
                const userPlacemark = new ymaps.Placemark(userLocation, {
                  hintContent: 'Вы здесь',
                },{  
                  iconColor: 'red',

                });
                map.geoObjects.add(userPlacemark);
                setUserLocation(userLocation);
              },
              (error) => {
                console.error('Ошибка при получении местоположения', error);
                setUserLocation(null);
              }
            );
          } else {
            console.log('Геолокация недоступна');
            setUserLocation(null);
          }

          landmarks.forEach((landmark) => {
            const placemark = new ymaps.Placemark(landmark.coordinates, {
              balloonContent: landmark.name,
            });
            map.geoObjects.add(placemark);
          });
        }
      });
    };

    if (!window.ymaps) {
      const script = document.createElement('script');
      script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=b49b3816-2f61-4a36-8345-d5a8260a76e8';
      script.onload = loadMap;
      document.body.appendChild(script);

      return () => {
        if (window.ymaps) {
          document.body.removeChild(script);
        }
      };
    } else {
      loadMap();
    }
  }, [mapRef, mapInstance, landmarks, setUserLocation]);

  return [mapInstance, route, () => { route.current = null; }];
};

export default useYandexMap;
