import React, {Component} from 'react'
import Menu from './pages/menu/menu.js'

class Main extends Component {

    constructor(props) {
        super(props)
        this.state = {
            menuOpened : true,
            pageComponent : null
        }
    }

    onPageSelect = (page) => {
        this.setState({
            menuOpened: false,
            pageComponent: page.component
        })
    }

    toMenu = () => {
        this.setState({
            menuOpened: true
        })
    }

    render() {
        const {pageComponent: PageComponent, menuOpened} = this.state
        const className = [menuOpened ? '' : 'page-opened', 'app'].join(' ')
        return <div className={className}>
            <div className="open-page">
                <div className="app-section container">
                    {PageComponent &&
                        <PageComponent />
                    }
                </div>
            </div>
            <div className="main-menu">
                <div className="app-section container">
                    <Menu onSelect={this.onPageSelect} />
                    <div className="to-menu" onClick={this.toMenu}></div>
                </div>
            </div>
        </div>
    }
}

export default Main
