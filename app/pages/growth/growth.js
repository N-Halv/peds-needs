import React from 'react'
import Input from '../../components/input/input.js'
import GrowthCalculation from './growth.calculation.js'
import WeightBoy from '../../data/cdc-2010/weight.boy.json'
import StatureBoy from '../../data/cdc-2010/stature.boy.json'


class Growth extends React.Component {

    constructor() {
        super()
        this.state = {
            client: -1
        }
    }

    state = {
        stature: null,
        weight: null,
        age: null
    }

    onChange = (type) => (value) => {
        this.setState((state) => {
            state[type] = value
            return state
        })
    }

    submit = () => {
        this.setState((state) => {
            const results = []
            const age = state.age
            if(state.weight) {
                results.push({
                    type: 'weight',
                    config: WeightBoy,
                    value: state.weight,
                    age
                })
            }
            if(state.stature) {
                results.push({
                    type: 'stature',
                    config: StatureBoy,
                    value: state.stature,
                    age
                })
            }

            state.results = results

            return state
        })
    }



    renderResult = (result) => {

    }

    render() {
        const {state, onChange, submit} = this
        const {stature, weight, age, results} = state
        const canSubmit = age && (stature || weight)

        return <div>
            <p>Growth Calculator!</p>

            <div className="form-group">
                <label className="inputlabel">Age</label>
                <Input value={age} type="number" placeholder="Age (months)" suffix="months" onChange={onChange('age')} />
            </div>

            <div className="form-group">
                <label className="inputlabel">Stature/Height</label>
                <Input value={stature} type="number" placeholder="Stature (cm)" suffix="cm" onChange={onChange('stature')} />
            </div>

            <div className="form-group">
                <label className="inputlabel">Weight</label>
                <Input value={weight} type="number" placeholder="Weight (kg)" suffix="kg" onChange={onChange('weight')} />
            </div>
            { canSubmit &&
                <button onClick={submit}>Submit</button>
            }

            {results && results.map(result => (
                <GrowthCalculation key={result.type} config={result.config} value={result.value} age={result.age} />
            ))}


        </div>
    }
}

export default Growth
