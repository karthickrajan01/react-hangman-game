import React, { Component } from 'react';
import randomWord from './Words';
import './Hangman.css'
import step0 from './images/0.jpg';
import step1 from './images/1.jpg';
import step2 from './images/2.jpg';
import step3 from './images/3.jpg';
import step4 from './images/4.jpg';
import step5 from './images/5.jpg';
import step6 from './images/6.jpg';

class Hangman extends Component {
    static defaultProps = {
        maxWrong: 6,
        images: [step0, step1, step2, step3, step4, step5, step6]
    }

    constructor(props) {
        super(props)
        this.state = {
            mistake: 0,
            guessed: new Set([]),
            answer: randomWord()
        }
    }

    guessedWord() {
        return this.state.answer.split('').map(letter => this.state.guessed.has(letter) ? letter : " - ");
    }

    generateButtons() {
        return "abcdefghijklmnopqrstuvwxyz".split("").map(letter => (
            <button
                class='btn btn-lg btn-primary m-2'
                key={letter}
                value={letter}
                onClick={this.handleGuess}
                disabled={this.state.guessed.has(letter)}
            >
                {letter}
            </button>
        ));
    }

    handleGuess = e => {
        let letter = e.target.value;
        this.setState(st => ({
            guessed: st.guessed.add(letter),
            mistake: st.mistake + (st.answer.includes(letter) ? 0 : 1)
        }))
    }

    resetButton = () => {
        this.setState({
            mistake: 0,
            guessed: new Set([]),
            answer: randomWord()
        })
    }
    render() {
        const gameOver = this.state.mistake >= this.props.maxWrong;
        let gameStat = this.generateButtons();
        let isWinner = this.guessedWord().join("") === this.state.answer

        if (isWinner) {
            gameStat = "You Won";
        }

        if (gameOver) {
            gameStat = "You Lost";
        }

        return (
            <div className='Hangman Container'>
                <h1 className='text-center'>Hangman</h1>
                <div className='float-right'>Wrong Guesses: {this.state.mistake} of {this.props.maxWrong}</div>
                <div className='text-center'>
                    <img src={this.props.images[this.state.mistake]} alt="" />
                </div>
                <p>Guess the Programming Language</p>
                <p>
                    {!gameOver ? this.guessedWord() : `The answer is: ${this.state.answer}`}
                </p>
                <p>{gameStat}</p>
                <button className='btn btn-info' onClick={this.resetButton}>RESET</button>
            </div>
        )
    }
}

export default Hangman;