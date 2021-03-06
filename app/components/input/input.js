import React from 'react'
import moment from 'moment'
import DateInput from './date-input'

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
        let {value} = this.props

        if(type === types.text || type === types.number) {
            value = value || ''
            return <input type={type} placeholder={placeholder}
                        onChange={onChange} ref={setRef('input')} value={value} />
        }
        else if(type === types.date) {
            return <DateInput placeholder={placeholder} onChange={onDateChange} value={value} />
        }
    }

    getSuffix = () => {
        const {suffix, value} = this.props

        if(!value || !suffix) {
            return <div></div>
        }

        return <div className="suffix">
            <div className="suffix__spacer">{value}</div>
            <div className="suffix__text">{suffix}</div>
        </div>
    }

    render() {
        const {getInput, getSuffix} = this
        const style = { width: this.props.width }
        return <div className="input form-control" style={style}>
            { getInput() }
            <div className="input__underline"></div>
            { getSuffix() }
        </div>
    }
}

Input.propTypes = {
    type: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    width: React.PropTypes.string,
    suffix: React.PropTypes.string,
    value: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
        React.PropTypes.instanceOf(moment)
    ])
}

export default Input
