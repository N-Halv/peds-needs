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
        this.setToggleLocation(this.getIndexOf(defaultOption, options))
    }

    getIndexOf = (needle, haystack) => {
        return haystack.reduce((out, item, index) => {
            return item === needle ? index : out
        }, 0)
    }

    handlerCreator = (thing, index) => () => {
        if(thing !== this.state.selected) {
            this.setToggleLocation(index)
            this.setState({ selected: thing })
            this.props.onChange(thing, index)
        }
    }

    setToggleLocation(index) {
        const parentDim = this.toggleElem.getBoundingClientRect()
        const childDim = this.toggleElem.childNodes[index + 1].getBoundingClientRect()
        const left = childDim.left - parentDim.left
        const width = childDim.width
        this.sliderElem.setAttribute('style', `left: ${left}px; width: ${width}px;`)
    }

    render() {
        const options = this.props.options
        const setRef = (elemName) => (elem) => this[elemName] = elem
        const getSelectedClass = (option) => option === this.state.selected ? 'toggle__option--selected' : ''
        return <div className="toggle" ref={setRef('toggleElem')}>
            <div className="toggle__slidder" ref={setRef('sliderElem')}></div>
            {options.map((option, index) => (
                <div
                    key={option.label}
                    onClick={this.handlerCreator(option, index)}
                    className={`toggle__option toggle__option--${index} ${getSelectedClass(option)}`} >
                    {option.label}
                </div>
            ))}
        </div>
    }
}

Toggle.propTypes = {
    options: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func.isRequired,
    defaultOption: React.PropTypes.object
}

export default Toggle
