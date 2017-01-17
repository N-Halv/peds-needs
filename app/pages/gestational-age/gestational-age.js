import React from 'react'
import GrowthCalculator from '../../components/gestational-age-calculator/gestational-age-calculator.js'

class GestationalAge extends React.Component {
    render() {
        const onChange = item => console.log('item: ', item)

        return <div>
            <p>Gestational Age Calculator</p>
            <GrowthCalculator onChange={onChange} />
        </div>
    }
}

export default GestationalAge
