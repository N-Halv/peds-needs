import React from 'react'
import pages from '../page-config.js'

const menuItem = (item, onSelect) => {
    const onClick = () => onSelect(item)
    return <div key={item.title}>
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
            {pages.map((item) => menuItem(item, this.props.onSelect))}
        </div>
    }
}

Menu.propTypes = {
    onSelect: React.PropTypes.func
}

export default Menu
