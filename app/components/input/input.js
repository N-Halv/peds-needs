import React from 'react'
import DateInput from './dateInput.js'

class Input extends React.Component {

    constructor(props) {
        super(props)
        if(!this.types[props.type]) {
            throw { message: `Input requires type that is one of the following: ${Object.keys(this.types).join(', ')}` }
        }
    }

    types = {
        text: 'text',
        number: 'number',
        date: 'date'
    }

    setRef = (elemName) => (elem) => this[elemName] = elem

    onChange = (val) => {
        this.props.onChange(this.parseValue(this.input.value))
    }

    parseValue = (inputValue) => {
        const { types } = this
        const { type } = this.props
        switch (type) {
            case types.number:
                return isNaN(parseFloat(inputValue)) ? null : parseFloat(inputValue)
            default:
                return inputValue
        }
    }

    getInput = () => {
        const {types, onChange, setRef} = this
        const {type, placeholder, onChange: onDateChange} = this.props
        const test = 'test';
        if(type === types.text || type === types.number) {
            return <input type={type} placeholder={placeholder}
                        onChange={onChange} ref={setRef('input')} value={test} />
        }
        else if(type === types.date) {
            return <DateInput placeholder={placeholder} onChange={onDateChange} />
        }
    }

    render() {
        const {getInput} = this
        const style = { width: this.props.width }
        return <div className="input" style={style}>
            { getInput() }
        </div>
    }
}

Input.propTypes = {
    type: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    width: React.PropTypes.string
}

export default Input
