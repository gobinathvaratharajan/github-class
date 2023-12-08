// https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories
/*
const id = 'YOUR_CLIENT_ID'
const secret = 'YOUR_SECRET_ID'
const params = `?client_id=${id}&client_secret=${secret}`
*/

export function fetchPopularRepos(language) {
    const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);
    return fetch(endpoint)
        .then((res) => res.json())
        .then((data) => {
            if (!data.items) {
                throw new Error(data.message)
            }
            return data.items
        })
}


// getting the profile
// ? https://api.github.com/users/${username}
function getProfile(username) {
    const endpoint = `https://api.github.com/users/${username}`
    return fetch(endpoint)
        .then((res) => res.json())
        .then((profile) => {
            if (profile.message) {
                throw new Error(getErrorMessage(profile.message, username))
            }
            return profile
        })
}

// getting the repos
// ? https://api.github.com/users/${username}/repos?per_page=100
function getRepos(username) {
    const endpoint = `https://api.github.com/users/${username}/repos?per_page=100`
    return fetch(endpoint)
        .then((res) => res.json())
        .then((repos) => {
            if (repos.message) {
                throw new Error(getErrorMessage(repos.message, username))
            }
            return repos
        })
}

// Error message
function getErrorMessage(message, username) {
    if (message === 'Not Found') {
        return `${username} doesn't exist`
    }
    return message
}

// combine both function into single function in array
function getUserData(player) {
    return Promise.all([getProfile(player), getRepos(player)])
        .then(([profile, repos]) => ({
            profile,
            score: calculateScore(profile.followers, repos)
        }))
}

// calculate score function
function calculateScore(followers, repos) {
    return followers * 3 + getStarCount(repos);
}

// get star count in one value
function getStarCount(repos) {
    return repos?.reduce(({count, stargazers_count}) => {
        return count + stargazers_count
    }, 0)
}


export function battle(players) {
    return Promise.all([
        getUserData(players[0]),
        getUserData(players[1])
    ]).then(sortPlayer)
}

// based on winner sort it
function sortPlayer(players) {
    return players.sort((a, b) => b.score - a.score)
}
