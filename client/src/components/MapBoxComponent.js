import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/formStyle.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarReg } from '@fortawesome/free-regular-svg-icons'
import { Panel, Grid, Row, Col, Button, Glyphicon } from 'reactstrap';

import { deleteLogEntry, listLogEntriesNew } from '../API';
import LogEntryForm from '../LogEntryForm';

const MapBoxComponent = ({ token }) => {
    const [loading, setLoading] = useState(false);
    const [logEntries, setLogEntries] = useState([]);
    const [showPopup, setShowPopup] = useState({});
    const [addEntryLocation, setAddEntryLocation] = useState(null);
    const [viewport, setViewport] = useState({
        width: '100vw',
        height: '100vh',
        latitude: 20.593683,
        longitude: 78.962883,
        zoom: 3.5
    });

    const getEntries = async () => {
        const logEntriesfromAPI = await listLogEntriesNew(token);
        // console.log(logEntriesfromAPI);
        if(logEntriesfromAPI !== null)
            setLogEntries(logEntriesfromAPI);
    };

    useEffect(() => {
        getEntries();
    }, []);

    const showAddMarkerPopup = (event) => {
        const [ longitude, latitude ] = event.lngLat;
        setAddEntryLocation({
            latitude,
            longitude,
        });
    };

    const deleteEntry = async (id) => {
        // alert(id);
        setLoading(true);
        const deletedLog = await deleteLogEntry(id, token);
        // console.log(deletedLog);
        // alert("before calling getEntries()");
        getEntries();
        setLoading(false);
        // alert("After calling getEntries()");
    }

    return (
        <>
            <ReactMapGL
            {...viewport}
            mapStyle="mapStyle link comes here"
            mapboxApiAccessToken="mapbox API Token comes here"
            onViewportChange={setViewport}
            onDblClick={showAddMarkerPopup}
            >
            {
                logEntries.map(entry => (
                <React.Fragment key={entry._id}>
                    <Marker
                    latitude={entry.latitude}
                    longitude={entry.longitude}
                    >
                    <div
                        onClick={() => setShowPopup({
                        // ...showPopup,
                        [entry._id]: true,
                        })}
                    >
                        <svg
                        className="marker yellow"
                        style={{
                            height: `${6 * viewport.zoom}px`,
                            width: `${6 * viewport.zoom}px`,
                        }}
                        version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512">
                        <g>
                            <g>
                            <path d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                                c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                                c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"/>
                            </g>
                        </g>
                        </svg>
                    </div>
                    </Marker>
                    {
                    showPopup[entry._id] ? (
                        <Popup
                        className="px-2 py-2"
                        latitude={entry.latitude}
                        longitude={entry.longitude}
                        closeButton={true}
                        closeOnClick={false}
                        dynamicPosition={true}
                        onClose={() => setShowPopup({})}
                        anchor="top" >
                            <div className="width-setter">
                                <div className="card">
                                    <div className="card-image">
                                        <img src={entry.image} />
                                        <a onClick={() => deleteEntry(entry._id)} className="btn-floating btn-large halfway-fab red">
                                            <FontAwesomeIcon style={{position: 'relative', top: '20%', height: '26px', width: '26px'}} className="trash" icon={faTrash} />
                                        </a>
                                    </div>
                                    <div className="card-content">
                                        <span className="card-title"><h3><b>{entry.title}</b></h3></span>
                                        {
                                            [...Array(entry.rating)].map((ele, i) => ( 
                                                    <FontAwesomeIcon key={i} icon={faStar} /> 
                                                ) 
                                            )
                                        }
                                        {
                                            [...Array(5 - entry.rating)].map((ele, i) => ( 
                                                    <FontAwesomeIcon key={i} icon={faStarReg} /> 
                                                ) 
                                            )
                                        }
                                        {/* <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStarReg} />
                                        <FontAwesomeIcon icon={faStarReg} /> */}
                                        <p className="card-description">{entry.description}</p>
                                        <p className="card-date">Visited on: {new Date(entry.visitDate).toLocaleDateString(undefined, {
                                            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                                        })}</p>
                                    </div>
                                </div>
                            </div>
                        {/* <div className="popup-map-new">
                            <h3>{entry.title}</h3>
                            <p>{entry.comments}</p>
                            <small>Visited on: {new Date(entry.visitDate).toLocaleDateString()}</small>
                            {entry.image && <img src={entry.image} alt={entry.title} />}
                        </div> */}
                        </Popup>
                    ) : null
                    }
                </React.Fragment>
                ))
            }
            {
                addEntryLocation ? (
                <>
                <Marker
                    latitude={addEntryLocation.latitude}
                    longitude={addEntryLocation.longitude}
                >
                    <div>
                    <svg
                        className="marker red"
                        style={{
                        height: `${6 * viewport.zoom}px`,
                        width: `${6 * viewport.zoom}px`,
                        }}
                        version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512">
                        <g>
                        <g>
                            <path d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                            c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                            c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"/>
                        </g>
                        </g>
                    </svg>
                    </div>
                </Marker>
                <Popup
                    latitude={addEntryLocation.latitude}
                    longitude={addEntryLocation.longitude}
                    closeButton={true}
                    closeOnClick={false}
                    dynamicPosition={true}
                    onClose={() => setAddEntryLocation(null)}
                    anchor="top" >
                    <div className="popup">
                    <LogEntryForm token={token} onClose={() => {
                        setAddEntryLocation(null);
                        getEntries();
                    }} location={addEntryLocation} />
                    </div>
                </Popup>
                </>
                ) : null
            }
            </ReactMapGL>
        </>
        );
}

export default MapBoxComponent;
