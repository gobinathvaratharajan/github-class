import PropTypes from 'prop-types';
import { hashtag } from './Icons';
import Tooltip from './Tooltip';

function TableHead() {
    return (
        <thead>
            <tr>
                <th style={{ width: '5%' }}>{hashtag}</th>
                <th style={{ width: '50%' }}>Repository</th>
                <th style={{ width: '15%' }}>Stars</th>
                <th style={{ width: '15%' }}>Forks</th>
                <th style={{ width: '15%' }}>Open Issues</th>
            </tr>
        </thead>
    )
}

function MoreInfo({ created_at, forked_count, updated_at, watchers, login, language }) {
    return (
        <ul className="tooltip  ">
            <li className="split">
                <span>By:</span><span>{login}</span>
            </li>
            {language && <li className="split">
                <span>Language:</span><span>{language}</span>
            </li>}
            <li className="split">
                <span>Created:</span>
                <span>{new Date(created_at).toLocaleString()}</span>
            </li>
            <li className="split">
                <span>Updated:</span>
                <span>{new Date(updated_at).toLocaleString()}</span>
            </li>
            <li className="split">
                <span>Watchers:</span>
                <span>{new Date(watchers).toLocaleString()}</span>
            </li>
            {forked_count &&
                <li className="split">
                    <span>Forked:</span>
                    <span>{new Date(forked_count).toLocaleString()}</span>
                </li>}
        </ul>
    )
}

MoreInfo.propTypes = {
    created_at: PropTypes.string.isRequired,
    forked_count: PropTypes.number,
    updated_at: PropTypes.string.isRequired,
    watchers: PropTypes.number.isRequired,
    login: PropTypes.string.isRequired,
    language: PropTypes.string,
    type: PropTypes.string.isRequired
}

function TableRow({ index, owner, stargazers_count, forks, open_issues, name, created_at, language, updated_at, watchers }) {
    const { login, avatar_url, type } = owner;
    return (
        <tr>
            <td>{index + 1}</td>
            <td>
                <Tooltip element={ <MoreInfo created_at={created_at} language={language} updated_at={updated_at} watchers={watchers} login={login} type={type} /> }>
                    <div className='row gap-md'>
                        <img width={32} height={32} className="avatar" src={avatar_url} alt={`Avatar for ${login}`} />
                        <a href={`https://github.com/${login}/${name}`}>{name}</a>
                    </div>
                </Tooltip>
            </td>
            <td>{stargazers_count}</td>
            <td>{forks}</td>
            <td>{open_issues}</td>
        </tr>
    )
}

TableRow.propTypes = {
    index: PropTypes.number.isRequired,
    owner: PropTypes.object.isRequired,
    stargazers_count: PropTypes.number.isRequired,
    forks: PropTypes.number.isRequired,
    open_issues: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
    watchers: PropTypes.number.isRequired,
    language: PropTypes.string,
}

export default function Table({ repos }) {
    return (
        <table>
            <TableHead />
            <tbody>
                {repos.map((repo, index) => {
                    return <TableRow key={index} index={index} { ...repo } />
                })}
                {console.log(repos, 'repos')}
            </tbody>
        </table>
    )
}

Table.propTypes = {
    repos: PropTypes.array.isRequired
}
