import PropTypes from 'prop-types';
import * as React from 'react';

const styles = {
    content: {
        fontSize: '15px',
        position: 'absolute',
        left: '0',
        right: '0',
        marginTop: '20px',
        textAlign: 'center'
    }
}

// showing the loading spinner
class Delayed extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false
        }
    }

    componentDidMount() {
        const { wait } = this.props
        this.timeout = window.setTimeout(() => {
            this.setState({ show: true })
        }, wait)
    }

    componentWillUnmount() {
        window.clearTimeout(this.timeout)
    }

    render() {
        return this.state.show === true ? this.props.children : null
    }
}

Delayed.propTypes = {
    wait: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired
}

Delayed.defaultProps = {
    wait: 300
}

class Loading extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            content: props.text
        }
    }

    componentDidMount() {
        const { text, speed } = this.props;

        this.interval = window.setInterval(() => {
            this.state.content === text + '...'
                ? this.setState({ content: text })
                : this.setState(({ content }) => ({ content: content + '.' }))
        }, speed)
    }

    componentWillUnmount() {
        window.clearInterval(this.interval)
    }

    render() {
        return (
            <Delayed>
                <p style={styles.content}>{this.state.content}</p>
            </Delayed>
        )
    }
}

Loading.propTypes = {
    text: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired
}

Loading.defaultProps = {
    text: "Loading",
    speed: 300
}

export default Loading
