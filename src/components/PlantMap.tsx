import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MapPin } from 'lucide-react';

// Координаты регионов Казахстана
const regionCoordinates: Record<string, [number, number]> = {
  'Северный Казахстан': [69.3406, 53.2138],
  'Центральный Казахстан': [68.9510, 48.0196],
  'Восточный Казахстан': [82.6176, 49.9553],
  'Западный Казахстан': [51.6371, 47.1164],
  'Южный Казахстан': [68.7870, 43.2220],
  'Мангистау': [53.3606, 44.5983],
  'Атырау': [47.1164, 47.1164],
  'Актобе': [57.1873, 50.2839],
  'Костанай': [63.6307, 53.2138],
  'Акмолинская область': [71.4460, 51.1694],
  'Алматинская область': [78.3092, 43.8041],
  'Жамбылская область': [75.3088, 44.2142]
};

interface PlantMapProps {
  regions: string[];
}

const PlantMap = ({ regions }: PlantMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  const initializeMap = (token: string) => {
    if (!mapContainer.current || !token) return;

    mapboxgl.accessToken = token;
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/outdoors-v12',
        center: [66.9237, 48.0196], // Центр Казахстана
        zoom: 4.5
      });

      // Добавляем элементы управления
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Добавляем маркеры для каждого региона
      map.current.on('load', () => {
        regions.forEach(region => {
          const coordinates = regionCoordinates[region];
          if (coordinates && map.current) {
            // Создаем маркер
            const marker = new mapboxgl.Marker({
              color: 'hsl(var(--primary))',
              scale: 0.8
            })
              .setLngLat(coordinates)
              .setPopup(
                new mapboxgl.Popup({ offset: 25 })
                  .setHTML(`<div class="font-medium">${region}</div>`)
              )
              .addTo(map.current);
          }
        });
      });

      setShowTokenInput(false);
    } catch (error) {
      console.error('Ошибка инициализации карты:', error);
      setShowTokenInput(true);
    }
  };

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapboxToken.trim()) {
      initializeMap(mapboxToken.trim());
    }
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  if (showTokenInput) {
    return (
      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Карта произрастания
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Для отображения карты необходим Mapbox токен. 
              Получите его на <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mapbox.com</a>
            </p>
            <form onSubmit={handleTokenSubmit} className="space-y-3">
              <Input
                type="text"
                placeholder="Введите ваш Mapbox Public Token"
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="font-mono text-sm"
              />
              <button 
                type="submit"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Загрузить карту
              </button>
            </form>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-card border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          Карта произрастания
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div 
          ref={mapContainer} 
          className="w-full h-64 rounded-b-lg" 
          style={{ minHeight: '300px' }}
        />
      </CardContent>
    </Card>
  );
};

export default PlantMap;