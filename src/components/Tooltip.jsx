import PropTypes from 'prop-types'
// import withHover from './withHover'
import Hover from './Hover'

const styles = {
    container: {
        position: 'relative',
        display: 'flex'
    },
}

export default function Tooltip({ element, children }) {
    return (
        <Hover>
            {(hovering) => (
                <div style={styles.container}>
                    {hovering === true && <div className="tooltip">{element}</div>}
                    {children}
                </div>
            )}
        </Hover>
    )
}

// class Tooltip extends React.Component {

//     render() {
//         const { children, element, hovering } = this.props
//         return (
//             <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} style={styles.container}>
//                 {hovering === true && element}
//                 {children}
//             </div>
//         )
//     }
// }


Tooltip.propTypes = {
    children: PropTypes.node.isRequired,
    element: PropTypes.node.isRequired,
    hovering: PropTypes.bool.isRequired,
}

// export default withHover(Tooltip)
