import React from 'react'
import Toggle from '../toggle/toggle.js'
import Input from '../input/input.js'
import {getSections, changeValue} from './gestational-age-calculator.service.js'

class GestationalAgeCalculator extends React.Component {

    constructor() {
        super()
        const sections = getSections()
        this.state = {sections}
    }

    toggle = (sectionName) => (option, index) => {
        const sections = this.state.sections
        sections[sectionName].selected = option
        this.setState({ sections })
    }

    changeValue = (key, newValue) => {
        const sections = this.state.sections
        sections[key].value = newValue
        Object.keys(sections).forEach(sectionName => {
            sections[sectionName].valueChanged(key, newValue)
        })
    }

    onChange = (sectionName, option, input) => (value) => {
        input.value = value
        const {onChange} = this.props
        const sections = this.state.sections
        const result = changeValue(sectionName, sections)
        this.setState({ sections })

        if(result && onChange) {
            onChange(result)
        }
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
        return <Input key={input.id} value={input.value} width={input.width} type={input.type} placeholder={input.placeholder} suffix={input.suffix} onChange={onChange(sectionName, option, input)} />
    }

    render() {
        const {sections} = this.state
        const {toggle, renderOption} = this

        // for test
        const dueDate = sections.dueDate.value ? sections.dueDate.value.format('YYYY-MM-DD') : 'nothing'
        const gestationAtBirth = sections.gestationAtBirth.value ? sections.gestationAtBirth.value : 'nothing'
        const age = sections.age.value ? sections.age.value : 'nothing'

        return <div>
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

            <br /><br />
            <div>Due Date: {dueDate}</div>
            <div>Gestation At Birth: {gestationAtBirth}</div>
            <div>Age: {age}</div>

        </div>
    }
}

GestationalAgeCalculator.propTypes = {
    onChange: React.PropTypes.func
}

export default GestationalAgeCalculator
