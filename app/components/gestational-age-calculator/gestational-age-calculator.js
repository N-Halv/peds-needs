import React from 'react'
import Toggle from '../toggle/toggle.js'
import Input from '../input/input.js'
import config from './gestational-age-calculator.config.js'

//TODO: this is all broken: fix it!
class GestationalAgeCalculator extends React.Component {

    constructor() {
        super()
        const sections = config()
        Object.keys(sections).forEach((key) => {
            sections[key].selected = sections[key].options[0]
        })
        this.state = {sections}
    }

    toggle = (sectionName) => (option, index) => {
        const sections = this.state.sections
        sections[sectionName].selected = option
        this.setState({ sections })
    }

    onChange = (sectionName, option, input) => (value) => {
        const sections = this.state.sections
        const section = sections[sectionName]
        input.value = value

        const inputValues = option.inputs.reduce((out, item) => {
            out[item.id] = item.value
            return out
        }, {})

        const convertedValue = option.toValue(inputValues, sections)
        section.value = convertedValue
        const func = (sec) => {
            sec.options.forEach(item => {
                const obj = item.fromValue(convertedValue, sections)
                item.inputs.forEach(i => i.value = obj[i.id])
            })
        }

        if(section.isDependancy) {
            Object.keys(sections).map((sectionName) => func(sections[sectionName]))
        }
        else{
            func(section)
        }

        this.setState({ sections })
    }

    renderOption = (sectionName) => (option) => {
        const {sections} = this.state
        const {renderInput} = this
        const selectedOption = sections[sectionName].selected
        return <div key={option.label} className={option === selectedOption ? 'visible' : 'hidden'}>
            {option.inputs.map(renderInput(option, sectionName))}
        </div>
    }

    renderInput = (option, sectionName) => (input) => {
        const {onChange} = this
        return <Input key={input.id} value={input.value} type={input.type} placeholder={input.placeholder} onChange={onChange(sectionName, option, input)} />
    }

    render() {
        const {sections} = this.state
        const {toggle, renderOption} = this

        // for test
        const dueDate = sections.dueDate.value ? sections.dueDate.value.format('YYYY-MM-DD') : 'nothing'
        const gestationAtBirth = sections.gestationAtBirth.value ? sections.gestationAtBirth.value : 'nothing'

        return <div>
            <div>Due Date: {dueDate}</div>
            <div>Gestation At Birth: {gestationAtBirth}</div>
            <br /><br />
            {
                Object.keys(sections).map((sectionName) => {
                    const section = sections[sectionName]
                    return <div key={sectionName}>
                        <div>
                            <Toggle options={section.options} onChange={toggle(sectionName)} />
                        </div>
                        {section.options.map(renderOption(sectionName)) }
                    </div>
                })
            }
        </div>
    }
}

GestationalAgeCalculator.propTypes = {
    onChange: React.PropTypes.func
}

export default GestationalAgeCalculator
