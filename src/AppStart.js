import React, {Component} from "react";
import regeneratorRuntime from "regenerator-runtime";
import {hot} from "react-hot-loader";
import "./App.less";

const axios = require('axios');

class Card extends Component {
    render() {
        const profile = this.props;
        return (
            <div className="github-profile ">
                <img src={profile.avatar_url}/>
                <div className="info">
                    <div className="name">{profile.name}</div>
                    <div className="company">{profile.company}</div>
                </div>
            </div>
        )
    }

}

const CardList = (props) => {
    return (
        <div>
            {props.profiles.map(profile => <Card key={profile.id} {...profile}/>)}
        </div>
    )
};

class Form extends Component {
    state = {
        userName: ''
    };
    //  userInput = React.createRef();


    handleSubmit = async (e) => {
        e.preventDefault();
        const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
        this.props.onSubmit(resp.data);
        this.setState({userName: ''});
        //console.log(this.state.userName);
        //console.log(this.userInput.current.value);
    };


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    value={this.state.userName}
                    onChange={event => this.setState({userName: event.target.value})}
                    //ref={this.userInput}
                    type="text"
                    placeholder="GitHub username"
                    required
                />
                <button>Add card</button>
            </form>
        )
    }
}

class App extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         profiles: testData
    //     };
    // }
    state = {
        profiles: [],
    };

    addNewProfile = (profileData) => {
        this.setState(prevState => ({
            profiles: [...prevState.profiles, profileData]
        }))
    };

    render() {
        return (
            <div>
                <div className="header">{this.props.title}</div>
                <Form onSubmit={this.addNewProfile}/>
                <CardList profiles={this.state.profiles}/>
            </div>
        );
    }
}

export default hot(module)(App);