import PropTypes from 'prop-types'
import * as React from 'react'
import { battle } from '../utlis/api'
import Loading from './Loading'

function Card({ profile }) {
    const { html_url, login, avatar_url, location, followers, following, public_repos, company } = profile
    return (
        <div className="card bg-light">
            <header className="split">
                <div>
                    <h4>
                        <a href={html_url}>{login}</a>
                    </h4>
                    <p>{ location || "unknown" }</p>
                </div>
                <img src={avatar_url} alt={`Avatar for ${login}`} className="avatar large" />
            </header>
            <ul className="stack">
                <li className="split">
                    <span>Name:</span>
                    <span>{ login || "n/a"  }</span>
                </li>
                <li className="split">
                    <span>Company:</span>
                    <span>{ company || "n/a"  }</span>
                </li>
                <li className="split">
                    <span>Followers:</span>
                    <span>{ followers  }</span>
                </li>
                <li className="split">
                    <span>Following:</span>
                    <span>{ following  }</span>
                </li>
                <li className="split">
                    <span>Repositories:</span>
                    <span>{ public_repos  }</span>
                </li>
            </ul>
        </div>
    )
}

Card.propTypes = {
    profile: PropTypes.object.isRequired,
    html_url: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
    public_repos: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    following: PropTypes.number.isRequired,
    followers: PropTypes.number.isRequired,
}

class Result extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            winner: null,
            loser: null,
            error: null,
            loading: true,
        }
    }

    componentDidMount() {
        const { playerOne, playerTwo } = this.props
        battle([playerOne, playerTwo])
            .then((players) => {
                this.setState({
                    winner: players[0],
                    loser: players[1],
                    error: null,
                    loading: false
                })
            }).catch(({ message }) => {
                this.setState({
                    error: message,
                    loading: false
                })
            })
    }

    render() {
        const { winner, loser, error, loading } = this.state

        if (loading === true) {
            return <Loading />
        }

        if (error) {
            return <p className='text-center error'>{ error }</p>
        }

        return (
            <main className='stack main-stack animate-in'>
                {/* <pre>{ JSON.stringify(this.props, 2, null) }</pre> */}
                <div className="split">
                    <h1>Results</h1>
                </div>
                <section className="grid">
                    <article className="results-container">
                        <Card profile={winner.profile} />
                        <p className="results">
                            <span>
                                {winner.score === loser.score ? 'Tie' : 'Winner: '}
                                {winner.score.toLocaleString()}
                            </span>
                            {winner.score !== loser.score && (
                                <img width={80} src="https://ui.dev/images/certificate.svg" alt="certificate" />
                            )}
                        </p>
                    </article>
                    <article className="results-container">
                        <Card profile={loser.profile} />
                        <p className="results">
                            <span>
                                {winner.score === loser.score ? 'Tie' : 'Loser: '}
                                {loser.score.toLocaleString()}
                            </span>
                        </p>
                    </article>
                </section>
            </main>
        )
    }
}

export default Result

Result.propTypes = {
    playerOne: PropTypes.string.isRequired,
    playerTwo: PropTypes.string.isRequired,
}
