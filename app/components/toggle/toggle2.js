import React from 'react'

class Toggle extends React.Component {

    constructor(props) {
        super(props)
        const {defaultOption, options} = props
        if(!options.length) {
            throw { message: 'Toggle requires options' }
        }
        const index = this.getIndexOf(defaultOption, options)
        this.state = { selected: options[index] }
    }

    componentDidMount = () => {
        // set the location of the toggle once mounted
        const {defaultOption, options} = this.props
        this.reorderOptions(this.getIndexOf(defaultOption, options))
    }

    getIndexOf = (needle, haystack) => {
        return haystack.reduce((out, item, index) => {
            return item === needle ? index : out
        }, 0)
    }

    handlerCreator = (thing, index) => () => {
        if(thing !== this.state.selected) {
            this.reorderOptions(index)
            this.setState({ selected: thing })
            this.props.onChange(thing, index)
        }
    }

    reorderOptions(index) {
        const items = this.toggleElem.childNodes
        const space = 15
        let left = 0
        for(let i = -1; i < items.length; i++) {
            if(i === index) { continue }

            const item = items[i < 0 ? index : i]
            item.setAttribute('style', `left: ${left}px;`)
            left += item.getBoundingClientRect().width + space
        }
    }

    render() {
        const options = this.props.options
        const setRef = (elemName) => (elem) => this[elemName] = elem
        const getSelectedClass = (option) => option === this.state.selected ? 'toggle2__option--selected' : ''
        return <label className="toggle2" ref={setRef('toggleElem')}>
            {options.map((option, index) => (
                <span
                    key={option.label}
                    onClick={this.handlerCreator(option, index)}
                    className={`toggle2__option toggle2__option--${index} ${getSelectedClass(option)}`} >
                    {option.label}
                </span>
            ))}
        </label>
    }
}

Toggle.propTypes = {
    options: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func.isRequired,
    defaultOption: React.PropTypes.object
}

export default Toggle
