import PropTypes from 'prop-types';
import * as React from 'react';
import { fetchPopularRepos } from '../utlis/api';
import Table from './Table';

function LanguageNav({ onupdateLanguage, selected }) {
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']
    return (
        <>
            <select onClick={(event) => onupdateLanguage(event.target.value)} selected={selected}>
                {/* //!  value need to pass in option then only it will trigger the value to the field  */}
                {languages.map((language) => <option key={language} value={language}>{language}</option>)}
            </select>
        </>
    )
}

LanguageNav.propTypes = {
    onupdateLanguage: PropTypes.func.isRequired,
    selected: PropTypes.string.isRequired
}

function SearchRepos() {
    return (
        <div className='input-repos'>
            <input placeholder='Search the repo' />
            <button>Search</button>
        </div>
    )
}

class Popular extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedlanguage: 'All',
            repos: null,
            errors: null
        }
    }

    // * this is the method to update the state of the component you can reference this method in the select with void as it does not have any return
    updateLanguage = (selectedlanguage) => {
        this.setState({
            selectedlanguage
        })

        fetchPopularRepos(selectedlanguage)
            .then((repos) => {
                this.setState({
                    repos,
                    errors: null
                })
            })
            .catch((errors) => {
                console.warn('Error fetching repos: ', errors)
                this.setState({
                    errors: 'There was an error fetching the repositories'
                })
            })
    }

    componentDidMount() {
        // * this is the lifecycle method which will be called once the component is mounted to the DOM
        this.updateLanguage(this.state.selectedlanguage)
    }
    render() {
        const { selectedlanguage, repos, errors } = this.state
        return (
            <main className="stack main-stack animate-in">
                <div className='split'>
                    <h1>Most Popular Github Repos</h1>
                    <SearchRepos />
                    <LanguageNav onupdateLanguage={this.updateLanguage} selected={selectedlanguage} />
                </div>
                {errors && <p className='text-center error'>{errors}</p>}
                {/* {repos && <pre>{JSON.stringify(this.state, null, 2)}</pre>} */}
                {repos && <Table repos={repos} />}
            </main>
        )
    }
}

export default Popular;


// * Using component
/*
    1. manage the state
    2. receiving data via props
    3. describing UI
    4. AJAX requests
    5. Upadating the state
    6. Updating the props
*/


// * component lifecycle
/*
    1. componentDidMount
        - Invoked once the component is mounted to the DOM
        - Good place to make AJAX requests to fetch data
    2. compnenetDidUpdate
        - Invoked immediately after updating occurs
        - Good place to do more AJAX requests when state/props change
    3. componentWillUnmount
        - Invoked immediately before a component is unmounted
        - Good place to clean up any event listeners
*/
