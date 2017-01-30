import moment from 'moment'

const FULL_TERM_WEEKS = 40
const FULL_TERM_DAYS = FULL_TERM_WEEKS * 7

const getValueFromOption = (option, sections) => {
    const inputValues = option.inputs.reduce((out, item) => {
        out[item.id] = item.value
        return out
    }, {})
    return option.getValue(inputValues, sections)
}

const changed = (newValue, oldValue) => {
    if(newValue === oldValue) {
        return false
    }
    if(moment.isMoment(newValue) && moment.isMoment(oldValue)) {
        if(newValue.diff(oldValue) === 0) {
            return false
        }
    }
    return true
}

const changeValue = (initKey, sections) => {

    const newValue = getValueFromOption(sections[initKey].selected, sections)

    const changeQueue = [{key: initKey, value: newValue}]
    const willUpdate = [initKey]

    // updates each value and dependent values
    const changeValues = (key, newValue) => {
        sections[key].value = newValue
        Object.keys(sections).forEach(sectionName => {
            const section = sections[sectionName]
            const shouldUpdate = section.dependancies.find(i => i === key)
            if(shouldUpdate) {
                const selectedOption = section.selected
                const value = getValueFromOption(selectedOption, sections)
                willUpdate.push(sectionName)
                if(changed(value, section.value)) {
                    changeQueue.push({
                        key: sectionName,
                        value
                    })
                }
            }
        })
    }

    // Loop untill all changes are complete
    while(changeQueue.length) {
        const {key, value} = changeQueue.shift()
        changeValues(key, value)
    }


    // After all changes are made, update the inputs of the changed sections
    Object.keys(sections).forEach(sectionName => {
        const section = sections[sectionName]
        const shouldUpdate = willUpdate.find(i => i === sectionName)
        if(shouldUpdate) {
            section.options.forEach(option => {
                if(option !== section.selected) {
                    const obj = option.getInputValues(sections)
                    option.inputs.forEach(i => i.value = obj[i.id])
                }
            })
        }
    })

    const dueDate = sections.dueDate.value
    const gestationAtBirth = sections.gestationAtBirth.value
    const age = sections.age.value

    if(dueDate && gestationAtBirth && !isNaN(age)) {
        const gestationalAgeDays = gestationAtBirth + age
        const gestationalAge = {
            weeks: Math.floor(gestationalAgeDays / 7),
            days: gestationalAgeDays % 7,
            totalDays: gestationalAgeDays
        }
        return {
            gestationalAge
        }
    }
    return false

}

const getSections = () => {


    const sections = {
        dueDate: {
            dependancies: ['dueDate'],
            options: [
                {
                    label: 'Due Date',
                    inputs: [
                        {
                            type: 'date',
                            placeholder: 'hey',
                            value: moment().startOf('day'),
                            id: 'due_date'
                        }
                    ],
                    getValue: (vals) => vals.due_date,
                    getInputValues: (sections) => ({ due_date: sections.dueDate.value })
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
                    getValue: (vals) => {
                        const val = vals.last_menstural_period_date
                        return val ? moment(val).add(FULL_TERM_WEEKS, 'weeks') : null
                    },
                    getInputValues: (sections) => {
                        let val = sections.dueDate.value
                        val = val ? moment(val).add(-FULL_TERM_WEEKS, 'weeks') : null
                        return { last_menstural_period_date: val }
                    }
                }
            ]
        },
        gestationAtBirth: {
            dependancies: ['dueDate', 'gestationAtBirth'],
            options: [
                {
                    label: 'Date of Birth',
                    inputs: [
                        {
                            type: 'date',
                            placeholder: 'Date Of Birth',
                            id: 'dob'
                        }
                    ],
                    getValue: (vals, sections) => {
                        const dueDate = sections.dueDate.value
                        const birthdate = vals.dob
                        if(!birthdate || !dueDate) {
                            // dueDate and birthdate must exist
                            return null
                        }
                        return FULL_TERM_DAYS - moment.duration(dueDate.diff(birthdate)).get('days')
                    },
                    getInputValues: (sections) => {
                        const dueDate = sections.dueDate.value
                        const gestationAtBirth = sections.gestationAtBirth.value
                        if(!gestationAtBirth || !dueDate) {
                            return null
                        }
                        const birthdate = dueDate.clone().add(gestationAtBirth - FULL_TERM_DAYS, 'days')
                        return { dob: birthdate }
                    }
                },
                {
                    label: 'Gestation at Birth',
                    inputs: [
                        {
                            type: 'number',
                            placeholder: 'Days',
                            id: 'gestation_at_birth'
                        }
                    ],
                    getValue: (vals) => vals.gestation_at_birth,
                    getInputValues: (sections) => ({ gestation_at_birth: sections.gestationAtBirth.value })
                }
            ]
        },
        age: {
            dependancies: ['dueDate', 'gestationAtBirth', 'age'],
            options: [
                {
                    label: 'Date Of Interest',
                    inputs: [
                        {
                            type: 'date',
                            placeholder: 'Date Of Interest',
                            value: moment().startOf('day'),
                            id: 'date'
                        }
                    ],
                    getValue: (vals, sections) => {
                        const dueDate = sections.dueDate.value
                        const gestationAtBirth = sections.gestationAtBirth.value
                        const date = vals.date
                        if(!dueDate || !gestationAtBirth || !date) {
                            // date, dueDate and birthdate must exist
                            return null
                        }
                        const dateOfBirth = dueDate.clone().add(-FULL_TERM_WEEKS, 'weeks').add(gestationAtBirth, 'days')
                        return moment.duration(date.diff(dateOfBirth)).get('days')
                    },
                    getInputValues: (sections) => {
                        const dueDate = sections.dueDate.value
                        const gestationAtBirth = sections.gestationAtBirth.value
                        const age = sections.age.value
                        if(!age || !gestationAtBirth || !dueDate) {
                            return null
                        }
                        const dateOfBirth = dueDate.clone().add(-FULL_TERM_WEEKS, 'weeks').add(gestationAtBirth, 'days')
                        const date = dateOfBirth.add(age, 'days')
                        return { date }
                    }
                },
                {
                    label: 'Age',
                    inputs: [
                        {
                            type: 'number',
                            placeholder: 'Days',
                            id: 'age'
                        }
                    ],
                    getValue: (vals) => vals.age,
                    getInputValues: (sections) => ({ age: sections.age.value })
                }
            ]
        }
    }

    Object.keys(sections).forEach((key) => {
        sections[key].selected = sections[key].options[0]
        sections[key].value = null
    })
    changeValue('dueDate', sections)
    return sections
}

export { getSections, changeValue }
