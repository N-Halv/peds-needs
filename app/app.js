import React from 'react'
import {render} from 'react-dom'
import Main from './main.js'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'


require('./main.scss')

class App extends React.Component {
    render() {
        return <Main />
    }
}


render(<App />, document.getElementById('app'))
