import * as React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Battle from './components/Battle'
import Navbar from './components/Navbar'
import Popular from './components/Popular'


class App extends React.Component {
    state = {
        theme: 'light'
    }

    toggleTheme = () => {
        this.setState(({ theme }) => (
            theme === 'light' ? 'dark' : 'light'
        ))
    }

    render() {
        return (
          <Router>
            <div className={this.state.theme}>
                <div className='container'>
                    <Navbar theme={this.state.theme} toggleTheme={() => this.toggleTheme} />
                    <Routes>
                        <Route path="/" element={<Popular />} />
                        <Route path="/battle" element={<Battle />} />
                    </Routes>
                </div>
            </div>
          </Router>
      )
}
}

export default App
