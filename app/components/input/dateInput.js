import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

class DateInput extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            date: props.value ? moment(props.value) : null
        }
    }

    onChange = (val) => {
        this.props.onChange(val || null)
    }

    render() {
        const { onChange } = this
        const { placeholder, value } = this.props
        console.log('date render', value)
        return <DatePicker selected={value} onChange={onChange} placeholderText={placeholder} />
    }
}

DateInput.propTypes = {
    onChange: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    value: React.PropTypes.instanceOf(moment)
}

export default DateInput
