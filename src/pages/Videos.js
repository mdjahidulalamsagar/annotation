import React, { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import AnnotationActions from "../actions/AnnotationActions";
import Nav from "../components/Nav";
import AnnotationReducers from "../reducers/AnnotationReducer";
import video from "../utilities/demoVideoItem";
import axios from 'axios'
import { AppConfig } from "../config/AppConfig";

const BASE_API_URL = AppConfig.baseApiURL;

const Videos = () => {
    const [GetVideos, setGetVideos] = useState([]);
    // const [state, dispatch] = useReducer(AnnotationReducers, GetVideos);

    useEffect(() => {
        axios
            .get(`${BASE_API_URL}/videos`)
            .then((res) => {
                setGetVideos([...res.data.json])
                console.log(process.env.PUBLIC_URL+"/videos/SD17DSAT12S1.mp4");
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        console.log("state", GetVideos);
    }, [GetVideos]);

    const allVideo = GetVideos.map((v, i) => (
        <Link
            to={"/videos/" + i}
            className="list-group-item list-group-item-action flex-column align-items-start " 
            key={i}
        >
            <div className="d-flex w-100 justify-content-between">
                <h2 className="fs-6 fw-bold my-2">{v.bangla }</h2>
                <small>{v.timestamp}</small>
            </div>
            <p className="mb-0">Gloss: {v.gloss}</p>
            <p className="mb-1">Topic: {v.Topic}</p>
        </Link>
    ));
    return (
        <>
            <Nav />
            <div className="container py-3">
                <div className="row">
                    <div className="col-md-12 mx-auto">
                        <h1 className="my-2 fs-5">All Videos</h1>
                        <div className="list-group">{allVideo}</div>
                        {/* <button className="btn btn-info my-2">Load more</button> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Videos;
