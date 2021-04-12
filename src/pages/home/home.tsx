import { LeafletMouseEvent } from 'leaflet';
import React, { useEffect, useState } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import './home.css';

const Home = () => {

    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
    const [comment, setComment] = useState<string>("");

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setInitialPosition([latitude, longitude]);
        });
    }, []);

    function insertComment(event: any) {
        setComment(event.target.value);
    }

    function insertMapPoint(event: any) {
        event.preventDefault();
        console.log(event);
    }

    function selectMapPoint(event: any) {
        let lat = event.latlng ? event.latlng.lat : event.target.id === "latitude" ? Number(event.target.value) : initialPosition[0];
        let lng = event.latlng ? event.latlng.lng : event.target.id === "longitude" ? Number(event.target.value) : initialPosition[1];
        setSelectedPosition([
            lat,
            lng
        ]);
        setInitialPosition([
            lat,
            lng
        ])
    }

    return (
        <div id="page-home">
            <main>
                <form className="landing-page-form" onSubmit={insertMapPoint}>
                    <fieldset>

                        <legend>Ponto no Mapa</legend>

                        <div className="input-block">
                            <span>Para inserir um ponto clique no mapa ou informe a latitude e longitude.</span>
                        </div>

                        <div className="input-block">
                            <label htmlFor="latitude">Latitude</label>
                            <input
                                type="number"
                                id="latitude"
                                placeholder="Digite a Latitude"
                                value={selectedPosition[0]}
                                onChange={(event) => selectMapPoint(event)}
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="longitude">Longitude</label>
                            <input
                                type="number"
                                id="longitude"
                                placeholder="Digite a Longitude"
                                value={selectedPosition[1]}
                                onChange={(event) => selectMapPoint(event)}
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="comentario">Comentário</label>
                            <input
                                id="comentario"
                                placeholder="Digite um Comentário"
                                value={comment}
                                onChange={(event) => insertComment(event)}
                            />
                        </div>

                    </fieldset>
                </form>
            </main>

            <Map center={initialPosition} zoom={15} onClick={selectMapPoint}>
                <TileLayer attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}" />

                <Marker position={selectedPosition}>
                    <Popup className="map-popup">
                        {comment !== "" ? comment : "Insira um comentário"}
                    </Popup>
                </Marker>
            </Map>
        </div>
    )
}

export default Home;