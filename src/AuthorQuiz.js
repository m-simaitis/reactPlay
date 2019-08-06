import React, {Component} from "react";
import regeneratorRuntime from "regenerator-runtime";
import {hot} from "react-hot-loader";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.less";


const Hero = () => {
    return (
        <div className="row">
            <div className="jumbotron col-10 offset-1">
                <h1>Author quiz</h1>
                <p>Select the book written by the author</p>
            </div>
        </div>
    )
};

const Book = ({title, onClick}) => {
    return (
        <div className='answer' onClick={() => {
            onClick(title)
        }}>
            <h4>{title}</h4>
        </div>

    )
};

const Turn = ({author, books, highlight, onAnswerSelected}) => {

    const highlightToBgColor = (highlight) => {
        const mapping = {
            'none': '',
            'correct': 'green',
            'wrong': 'red'
        };
        return mapping[highlight]

    };

    return (
        <div className='row turn' style={{backgroundColor: highlightToBgColor(highlight)}}>
            <div className="col-4 offset-1">
                <img src={author.image} className='authorImage'/>
            </div>
            <div className="col-6">
                {books.map((title) => <Book title={title} key={title} onClick={onAnswerSelected}/>)}
            </div>
        </div>
    )

};


const Continue = ({show, onContinue}) => {
    return (
        <div className="row continue">
            {show ?
                <div className="col-11">
                    <button className="btn btn-primary btn-lg float-lg-right" onClick={onContinue}>Continue</button>
                </div>

                : null
            }
        </div>
    )

};

const Footer = () => {
    return (<div>
        <div className="col-12">
            <p>All images are from: <a href="#">here</a></p>
        </div>
    </div>)
};


function mapStateToProps(state) {
    return {
        turnData: state.turnData,
        highlight: state.highlight
    }
};

function mapDispatchToProps(dispatch) {
    return {
        onAnswerSelected: (answer) => {
            dispatch({type: 'ANSWER_SELECTED', answer})
        },
        onContinue: () => {
            dispatch({type: 'CONTINUE'})
        }
    }
}

const QuizContainer= ({turnData, highlight, onAnswerSelected, onContinue}) => {
    return (
        <div className="container-fluid">
            <Hero/>
            <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected}/>
            <Continue show={highlight === 'correct'} onContinue={onContinue}/>
            <p><Link to="/add">Add Author</Link></p>
            <Footer/>
        </div>
    );
};

const AuthorQuiz = connect(mapStateToProps, mapDispatchToProps)(QuizContainer)


export default hot(module)(AuthorQuiz);