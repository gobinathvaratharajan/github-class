import * as React from 'react';
import { close } from './Icons';
import PropTypes from 'prop-types'
import Result from './Result';

function Instructions() {
    return (
        <section className='instructions-container'>
            <h2>Instructions</h2>
            <ol>
                <li>Enter 2 github user</li>
                <li>Battle</li>
                <li>Announce the winner</li>
            </ol>
        </section>
    )
}

function PlayerPreview({ username, label, onReset }) {
    return (
        <article className='card'>
            <h2 className="player-label">{label}</h2>
            <div className="split">
                <div className="row gap-md">
                    <img width={32} height={32} src={`https://github.com/${username}.png?size=200`} alt={`Avatar of ${username}`} className='avatar' />
                    <a href={`https://github.com/${username}`} className='link'>{username}</a>
                </div>
            </div>
            <button onClick={onReset} className='btn secondary icon'>
                { close }
            </button>
        </article>
    )
}

PlayerPreview.propTypes = {
    username: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired
}

class PlayerInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: ''
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.username)
    }

    handleChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    render() {
        return (
            <form className='card light' onSubmit={this.handleSubmit}>
                <label htmlFor='username' className='player-label'>
                    {this.props.label}
                </label>
                <div className="input-row">
                    <input
                        type='text'
                        id='username'
                        className='input-light'
                        placeholder='github username'
                        autoComplete='off'
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    <button
                        className="btn link"
                        type="submit"
                        disabled={!this.state.username}
                    >
                        Submit
                    </button>
                </div>
            </form>
        )
    }
}

PlayerInput.propTypes = {
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
}

class Battle extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            playerOne: null,
            playerTwo: null,
            battle: false
        }
    }

    handleSubmit = (id, player) => {
        this.setState({
            [id]: player
        })
    }

    handleReset = (id) => {
        this.setState({
            [id]: null
        })
    }

    handleBattle = () => {
        this.setState({
            battle: true
        })
    }

    render() {
        const { playerOne, playerTwo, battle } = this.state
        const disabled = !playerOne | !playerTwo

        if (battle === true) {
            return <Result playerOne={playerOne} playerTwo={playerTwo} />
        }
        return (
            <main className="stack main-stack animate-in">
                <div className="split">
                    <h1>Player</h1>
                    <button className={`btn primary ${ disabled ? 'disabled' : '' }`} onClick={() => this.handleBattle()}>
                        Battle
                    </button>
                </div>
                <section className='grid'>
                    {playerOne === null ? <PlayerInput label="player One" onSubmit={(player) => this.handleSubmit('playerOne', player)} /> : <PlayerPreview label="Player One" username={this.state.playerOne} onReset={() => this.handleReset('playerOne')} />}
                    {playerTwo === null ? <PlayerInput label="player Two" onSubmit={(player) => this.handleSubmit('playerTwo', player)} /> : <PlayerPreview label="Player Two" username={this.state.playerTwo} onReset={() => this.handleReset('playerTwo')} />}
                </section>
                    <Instructions />
            </main>
        )
    }
}


export default Battle;
