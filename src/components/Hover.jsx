import PropTypes from 'prop-types';
import * as React from 'react';

export default class Hover extends React.Component {
    static propTypes = {
        children: PropTypes.func.isRequired,
        element: PropTypes.node.isRequired,
    }

    state = {
        hovering: false
    }

    mouseOver = () => {
        this.setState({
            hovering: true
        })
    }

    mouseOut = () => {
        this.setState({
            hovering: false
        })
    };

    render() {
            return (
                <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
                    {this.props.children(this.state.hovering)}
                </div>
            )
    }
}
