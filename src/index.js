import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import AuthorQuiz from "./AuthorQuiz.js";
import AddAuthorForm from "./AddAuthorForm.js";
import {shuffle, sample} from "underscore";
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';

let authors = [
    {
        name: 'Author nr1',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Nietzsche1882.jpg/220px-Nietzsche1882.jpg',
        books: ['Book nr 1.1', 'Book nr 1.2', 'Book nr 1.3']
    },
    {
        name: 'Author nr2',
        image: 'https://ichef.bbci.co.uk/images/ic/960x540/p01bqfb5.jpg',
        books: ['Book nr 2.1', 'Book nr 2.2', 'Book nr 2.3']
    },
    {
        name: 'Author nr3',
        image: 'http://www.respublika.lt/uploads/img/catalog/1/photo_for_gallery_1_32203946.jpg',
        books: ['Book nr 3.1', 'Book nr 3.2', 'Book nr 3.3']
    },
    {
        name: 'Author nr4',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Kafka.jpg/220px-Kafka.jpg',
        books: ['Book nr 4.1', 'Book nr 4.2', 'Book nr 4.3']
    }
];

const getTurnData = (authors) => {
    const allBooks = authors.reduce((p, c, i) => {
        return p.concat(c.books);
    }, []);
    const fourRandomBooks = shuffle(allBooks).slice(0, 4);
    const answer = sample(fourRandomBooks);
    return {
        books: fourRandomBooks,
        author: authors.find((author) => author.books.some((title) => title == answer))
    }

};

function reducer(
    state = {
        authors,
        turnData: getTurnData(authors),
        highlight: ''
    },
    action) {

    switch (action.type) {
        case 'ANSWER_SELECTED':
            const isCorrect = state.turnData.author.books.some((book) => book === action.answer);
            return Object.assign({}, state, {highlight: isCorrect ? 'correct' : 'wrong'})
        case 'CONTINUE':
            return Object.assign({}, state, {
                highlight: '',
                turnData: getTurnData(state.authors)
            });
        case 'ADD_AUTHOR':
            return Object.assign({}, state, {
                authors: state.authors.concat([action.author])
            });
        default:
            return state
    }
}

let store = Redux.createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


ReactDOM.render(
    <BrowserRouter>
        <ReactRedux.Provider store={store}>
            <React.Fragment>
                <Route exact path="/" component={AuthorQuiz}/>
                <Route path='/add' component={AddAuthorForm}/>
            </React.Fragment>
        </ReactRedux.Provider>
    </BrowserRouter>,
    document.getElementById("root")
);