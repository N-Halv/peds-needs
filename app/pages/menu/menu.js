import React from 'react'
import {Button} from 'react-bootstrap'
import pages from '../page-config.js'

const menuItem = (item, onSelect) => {
    const onClick = () => onSelect(item)
    return <div key={item.title} className="span6">
        <a onClick={onClick}>
            {item.title}
        </a>
    </div>
}

class Menu extends React.Component {
    // TODO: pull this in here
    // static propTypes = {
    //     onSelect: React.PropTypes.func
    // }

    render() {
        return <div>
            <div className="jumbotron">
                Hello test!!!
            </div>
            <Button>Hey</Button>
            <div className="row show-grid">
                {pages.map((item) => menuItem(item, this.props.onSelect))}
            </div>
        </div>
    }
}

Menu.propTypes = {
    onSelect: React.PropTypes.func
}

export default Menu
