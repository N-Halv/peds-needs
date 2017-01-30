import React from 'react'
import GestationalAgeCalculator from '../../components/gestational-age-calculator/gestational-age-calculator.js'

class GestationalAge extends React.Component {
    state = { gestationalAge: null }

    onChange = item => {
        this.setState({
            gestationalAge: item.gestationalAge
        })
    }

    render() {
        const {gestationalAge} = this.state
        const {onChange} = this


        return <div>
            <p>Gestational Age Calculator</p>
            <GestationalAgeCalculator onChange={onChange} />

            <br /><br />

            {gestationalAge &&
                <div> {gestationalAge.weeks} weeks and {gestationalAge.days} days </div>
            }
        </div>
    }
}

export default GestationalAge
