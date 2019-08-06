import React, {Component, useState} from "react";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'

import "./AddAuthorForm.less"

const AuthorForm = props => {
    const [state, setState] = useState({name: '', image: '', books: [], bookTemp: ''});


    const handleSubmit = event => {
        event.preventDefault();
        props.onAddAuthor(state);
    };

    const handleAddBook = event => {
        setState({...state, books: state.books.concat([state.bookTemp]), bookTemp: ''})
    };

    const onFieldChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setState({...state, [name]: value});
    };

    return <form onSubmit={handleSubmit}>
        <div className="AddAuthorForm__input">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={state.name} onChange={onFieldChange}/>
        </div>
        <div className="AddAuthorForm__input">
            <label htmlFor="image">Image Url</label>
            <input type="text" name="image" value={state.image} onChange={onFieldChange}/>
        </div>
        <div className="AddAuthorForm__input">
            <label htmlFor="bookTemp">Book list</label>
            <input type="text" name="bookTemp" value={state.bookTemp} onChange={onFieldChange}/>
            <input type="button" value="add book" onClick={handleAddBook}/>
            {state.books.map((book) => <p key={book}>{book}</p>)}

        </div>

        <input type="submit" value="submit "/>
    </form>

};

const AddAuthorForm = ({match, onAddAuthor}) => {
    return <div className="AddAuthorForm">
        <h1>Add Author</h1>
        <AuthorForm onAddAuthor={onAddAuthor}/>
    </div>

};
const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddAuthor: (author) => {
            dispatch({type: 'ADD_AUTHOR', author});
            props.history.push('/')
        }
    };
};


export default withRouter(connect(() => {
    return {}
}, mapDispatchToProps)(AddAuthorForm))