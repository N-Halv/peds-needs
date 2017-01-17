import React from 'react'
import DatePicker from 'react-datepicker'
import Moment from 'moment'

class DateInput extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            date: props.value ? moment(props.value) : null
        }
    }

    types = {
        text: 'text',
        number: 'number',
        date: 'date'
    }


    onChange = (val) => {
        this.setState({ date: val })
        this.props.onChange(val.toDate())
    }

    render() {
        const { onChange } = this
        const { placeholder } = this.props
        const { date } = this.state
        return <DatePicker selected={date} onChange={onChange} placeholderText={placeholder} />
    }
}

DateInput.propTypes = {
    onChange: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    value: React.PropTypes.instanceOf(Date)
}

export default DateInput
