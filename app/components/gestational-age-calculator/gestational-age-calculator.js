import React from 'react'
import Toggle from '../toggle/toggle.js'
import Input from '../input/input.js'

class GestationalAgeCalculator extends React.Component {

    constructor() {
        super()
        const sections = this.sections
        Object.keys(sections).forEach((key) => {
            sections[key].selected = sections[key].options[0]
        })
        this.state = {
            sections: this.sections
        }
    }

    values = {
        due: null,
        birth: null,
        date: null
    }

    sections = {
        due: {
            options: [
                {
                    label: 'Due Date',
                    inputs: [
                        {
                            type: 'date',
                            placeholder: 'hey',
                            defaut: new Date(),
                            id: 'due_date'
                        }
                    ],
                    convert: (val) => val
                },


                {
                    label: 'Last Menstural Period',
                    inputs: [
                        {
                            type: 'date',
                            placeholder: 'Last Menstural Period',
                            id: 'last_menstural_period_date'
                        }
                    ],
                    convert: (val) => {
                        return val ? new Date(val.getTime() + 86400000 * 7 * 30) : null
                    }
                }
            ]
        },
        // birth: {
        //
        // },
        // date: {
        //
        // }
    }

    toggle = (sectionName) => (option, index) => {
        const sections = this.state.sections
        sections[sectionName].selected = option
        this.setState({ sections })
    }

    onChange = (sectionName, option) => (value) => {
        this.values[sectionName] = option.convert(value)
        console.log('onchange', this.values)
    }

    renderOption = (sectionName) => (option) => {
        const {renderInput, sections} = this
        const selectedOption = sections[sectionName].selected
        return <div key={option.label} className={option === selectedOption ? 'visible' : 'hidden'}>
            {option.inputs.map(renderInput(option, sectionName))}
        </div>
    }

    renderInput = (option, sectionName) => (input) => {
        const {onChange} = this
        return <Input key={input.id} type={input.type} placeholder={input.placeholder} onChange={onChange(sectionName, option)} />
    }

    render() {
        const {sections} = this.state
        const {toggle, renderOption} = this

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
        </div>


        // return <div>
        //     {
        //         Object.keys(sections).map((sectionName) => {
        //             const section = sections[sectionName]
        //             const selected = section.selected
        //             return <div key={sectionName}>
        //                 <div>
        //                     <Toggle options={section.options} onChange={toggle(sectionName)} />
        //                 </div>
        //                 {section.options.map((option) => {
        //                     return <div key={option.label} className={option === selected ? 'visible' : 'hidden'}>
        //                         {option.inputs.map(input => {
        //                             return <Input key={input.id} type={input.type} placeholder={input.placeholder} onChange={onChange(sectionName, option)} />
        //                         })}
        //                     </div>
        //                 })}
        //             </div>
        //         })
        //     }
        // </div>
    }
}

GestationalAgeCalculator.propTypes = {
    options: React.PropTypes.array,
    onChange: React.PropTypes.func
}

export default GestationalAgeCalculator




















// import React from 'react'
// import Toggle from '../toggle/toggle.js'
// import Input from '../input/input.js'
//
// class GestationalAgeCalculator extends React.Component {
//
//     constructor() {
//         super()
//         const sections = this.sections
//         Object.keys(sections).forEach((key) => {
//             sections[key].selected = sections[key].options[0]
//         })
//         this.state = {
//             sections: this.sections
//         }
//     }
//
//     sections = {
//         due: {
//             options: [
//                 {
//                     label: 'Due Date',
//                     inputs: [
//                         {
//                             type: 'date',
//                             placeholder: 'hey',
//                             defaut: new Date()
//                         }
//                     ],
//                     converter: (val) => val
//                 },
//                 {
//                     label: 'Last Menstural Period',
//                     inputs: [
//                         {
//                             type: 'number',
//                             placeholder: 'Last Menstural Period'
//                         }
//                     ],
//                     converter: (val) => {
//                         return val ? new Date(val.getTime() - 86400000 * 7) : null
//                     }
//                 }
//             ],
//             onChange: (option) => {
//
//             }
//         },
//         // birth: {
//         //
//         // },
//         // date: {
//         //
//         // }
//     }
//
//     toggle = (sectionName) => (option) => {
//         const stateUpdate = { sections : {} }
//         stateUpdate.sections[sectionName] = { selected: option }
//         console.log('toggle', stateUpdate)
//         this.setState(stateUpdate)
//     }
//
//     render() {
//         const options = [
//             { label: 'Due Date' },
//             { label: 'Last Menstural Period' }
//         ]
//         const onChange = item => console.log('item: ', item)
//         const onInputChange = item => {
//             console.log('input: ', item, typeof item)
//         }
//
//         const {sections} = this.state
//         const {toggle} = this
//
//         return <div>
//             {
//                 Object.keys(sections).map((key) => {
//                     const section = sections[key]
//                     console.log('test', section);
//                     // const selected = section.selected
//                     return <div key={key}>
//                         <div>
//                             <Toggle options={section.options} onChange={toggle(key)} />
//                         </div>
//                         {section.options.map((option) => {
//                             return <div key={option.label}>
//                                 {option.inputs.map(input => {
//                                     return <Input key="" type={input.type} placeholder={input.placeholder} onChange={onInputChange} />
//                                 })}
//                             </div>
//                         })}
//                     </div>
//                 })
//             }
//         </div>
//     }
// }
//
// GestationalAgeCalculator.propTypes = {
//     options: React.PropTypes.array,
//     onChange: React.PropTypes.func
// }
//
// export default GestationalAgeCalculator
