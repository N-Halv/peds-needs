import React from 'react'
import Input from '../../components/input/input.js'
import GrowthCalculation from './growth.calculation.js'
import FentonWeightBoy from '../../data/growth.fenton.weight.boy.json'
import WeightGirl from '../../data/fenton2013/weight.girl.json'
import WeightBoy from '../../data/fenton2013/weight.boy.json'
import LengthGirl from '../../data/fenton2013/length.girl.json'
import LengthBoy from '../../data/fenton2013/length.boy.json'
import HeadCircumferenceGirl from '../../data/fenton2013/head-circumference.girl.json'
import HeadCircumferenceBoy from '../../data/fenton2013/head-circumference.boy.json'


class Growth extends React.Component {

    constructor() {
        super()
        this.state = {
            client: -1
        }
    }

    state = {
        length: null,
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
                    config: FentonWeightBoy,
                    value: state.weight,
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
        const {length, weight, age, results} = state
        const canSubmit = age && (length || weight)

        return <div>
            <p>Growth Calculator!</p>

            <div className="form-group">
                <label className="inputlabel">Gestational Age</label>
                <Input value={age} type="number" placeholder="Gestational Age (days)" onChange={onChange('age')} />
            </div>

            <div className="form-group">
                <label className="inputlabel">Length</label>
                <Input value={length} type="number" placeholder="Length (cm)" suffix="cm" onChange={onChange('length')} />
            </div>

            <div className="form-group">
                <label className="inputlabel">Weight</label>
                <Input value={weight} type="number" placeholder="Weight (cm)" suffix="cm" onChange={onChange('weight')} />
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
