'use client';

import { useEffect, useRef, } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import RidePin from '../common/RidePin';





type Coord = { lng: number; lat: number };

type Props = {
    from?: Coord;
    to?: Coord;
    heightClass?: string;
    fromText?: string;
    toText?: string;
};

const ROUTE_SOURCE_ID = 'route';
const ROUTE_LAYER_ID = 'route-line';


export default function RideMap({
    from = { lat: 28.410484, lng: 77.31821 },
    to = { lat: 28.9, lng: 76.9 },
    heightClass = 'h-96',
    fromText,
    toText,
}: Props) {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const fromMarkerRef = useRef<mapboxgl.Marker | null>(null);
    const toMarkerRef = useRef<mapboxgl.Marker | null>(null);



    // Check expiry once on mount/when startsAt changes


    const fetchRouteAndDisplay = async () => {
        if (!mapRef.current) return;

        const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
        if (!token) {
            console.error('Missing NEXT_PUBLIC_MAPBOX_TOKEN');
            return;
        }

        const query = await fetch(
            `https://api.mapbox.com/directions/v5/mapbox/driving/${from.lng},${from.lat};${to.lng},${to.lat}?geometries=geojson&access_token=${token}`,
            { method: 'GET' }
        );
        const json = await query.json();
        const routeData = json?.routes?.[0];
        if (!routeData) {
            console.error('No route found');
            return;
        }


        // add/update source
        const source = mapRef.current.getSource(ROUTE_SOURCE_ID) as mapboxgl.GeoJSONSource | undefined;
        const data = {
            type: 'Feature' as const,
            properties: {},
            geometry: routeData.geometry,
        };

        if (source) {
            source.setData(data);
        } else {
            mapRef.current.addSource(ROUTE_SOURCE_ID, { type: 'geojson', data });
            mapRef.current.addLayer({
                id: ROUTE_LAYER_ID,
                type: 'line',
                source: ROUTE_SOURCE_ID,
                layout: { 'line-join': 'round', 'line-cap': 'round' },
                paint: { 'line-color': '#2563eb', 'line-width': 5 },
            });
        }

        // from marker
        if (!toMarkerRef.current) {
            toMarkerRef.current = new mapboxgl.Marker({ color: '#FDD518' })
                .setLngLat([to.lng, to.lat])
                .addTo(mapRef.current);
        } else {
            toMarkerRef.current.setLngLat([to.lng, to.lat]);
        }

        // to marker
        if (!fromMarkerRef.current) {
            const toEl = document.createElement('div');
            toEl.className = 'h-3 w-3 bg-white rounded-full border-2 shadow';
            fromMarkerRef.current = new mapboxgl.Marker({ element: toEl })
                .setLngLat([from.lng, from.lat])
                .addTo(mapRef.current);
        } else {
            fromMarkerRef.current.setLngLat([from.lng, from.lat]);
        }


        // fit bounds
        const bounds = new mapboxgl.LngLatBounds();
        routeData.geometry.coordinates.forEach((c: [number, number]) => bounds.extend(c));
        mapRef.current.fitBounds(bounds, { padding: 60, maxZoom: 14, duration: 600 });

    };

    // init map
    useEffect(() => {
        const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
        if (!token) {
            console.error('Missing NEXT_PUBLIC_MAPBOX_TOKEN');
            return;
        }
        mapboxgl.accessToken = token;

        if (mapContainerRef.current && !mapRef.current) {
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [from.lng, from.lat],
                zoom: 12,
            });

            mapRef.current.on('load', () => {
                fetchRouteAndDisplay();
            });
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // update when coords change
    useEffect(() => {
        if (!mapRef.current) return;
        if (
            Number.isFinite(from.lng) &&
            Number.isFinite(from.lat) &&
            Number.isFinite(to.lng) &&
            Number.isFinite(to.lat)
        ) {
            if (mapRef.current.isStyleLoaded()) {
                fetchRouteAndDisplay();
            } else {
                mapRef.current.once('load', fetchRouteAndDisplay);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [from.lng, from.lat, to.lng, to.lat]);






    return (
        <div className="realtive">
            <div ref={mapContainerRef} className={`relative w-full h- ${heightClass} overflow-hidden`} >

                <div className='absolute top-2 left-2  w-[90vw] z-10 bg-muted/80 p-2 rounded-lg'>

                    <RidePin fromText={fromText || ''} toText={toText || ''} lineClampClass='line-clamp-1' />
                </div>
            </div>



        </div>
    );
}
