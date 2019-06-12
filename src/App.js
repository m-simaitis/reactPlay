import React, {Component, useState} from "react";
import regeneratorRuntime from "regenerator-runtime";
import {hot} from "react-hot-loader";
import "./App.less";

const axios = require('axios');

const Card = (props) => {
    const profile = props;
    return (
        <div className="github-profile ">
            <img src={profile.avatar_url}/>
            <div className="info">
                <div className="name">{profile.name}</div>
                <div className="company">{profile.company}</div>
            </div>
        </div>
    )
};

const CardList = (props) => {
    return (
        <div>
            {props.profiles.map(profile => <Card key={profile.id} {...profile}/>)}
        </div>
    )
};

const Form = (props) => {
    const [userName, setUserName] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        let resp = await axios.get(`https://api.github.com/users/${userName}`).then((resp) => {
            props.onSubmit(resp.data);
            setUserName('');
        }).catch((e) => {
            //just to fill
            resp = {
                data: {id: Math.random(100), name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook"}
            };
            props.onSubmit(resp.data);
            setUserName('');
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={userName}
                onChange={event => setUserName(event.target.value)}
                type="text"
                placeholder="GitHub username"
                required
            />
            <button>Add card</button>
        </form>
    )
};

const App = (props) => {
    const [profiles, setProfiles] = useState([]);
    const addNewProfile = (profileData) => {
        setProfiles([...profiles, profileData]);
    };
    return (
        <div>
            <div className="header">{props.title}</div>
            <Form onSubmit={addNewProfile}/>
            <CardList profiles={profiles}/>
        </div>
    );
};

export default hot(module)(App);