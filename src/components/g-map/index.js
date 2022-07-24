import { useRef, useEffect, useState, useMemo } from 'react';


function GMap(props) {

    const mapRef = useRef();

    const initPosition = useMemo(() => ({ lat: 3.1193573, lng: 101.6694215 }), []);

    const [position, setPosition] = useState(initPosition);

    useEffect(() => {
        new window.google.maps.Map(mapRef.current, {
            center: position,
            zoom: 15,
        });
    }, [position]);

    useEffect(() => {

        if (props.autoCompleteRef) {
            const autocomplete = new window.google.maps.places.Autocomplete(props.autoCompleteRef.current, {
                center: initPosition,
                zoom: 15,
            });

            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();

                const placeId = place.place_id;
                const name = place.name;

                const lat = place.geometry.location.lat();
                const lng = place.geometry.location.lng();

                setPosition({
                    lat: lat,
                    lng: lng
                });

                props.startedRef.current = true;

                props.setPlace({
                    placeId,
                    name,
                    lat,
                    lng,
                })
            });
        }

        if (props.latitude && props.longitude) {
            setPosition({
                lat: props.latitude,
                lng: props.longitude
            })
        }

    }, [initPosition, props]);

    return (
        <>
            <div ref={mapRef} id="map" style={{
                width: '100%',
                height: '100%'
            }} />
        </>
    )
}

export default GMap;
