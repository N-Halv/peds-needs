import moment from 'moment'

const FULL_TERM_WEEKS = 40;
const FULL_TERM_DAYS = FULL_TERM_WEEKS * 7
const config = () => ({
    dueDate: {
        isDependancy: true,
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
                toValue: (val) => val.due_date,
                fromValue: (val) => ({ due_date: val })
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
                toValue: (val) => {
                    val = val.last_menstural_period_date
                    return val ? moment(val).add(FULL_TERM_WEEKS, 'weeks') : null
                },
                fromValue: (val) => {
                    val = val ? moment(val).add(-FULL_TERM_WEEKS, 'weeks') : null
                    return { last_menstural_period_date: val }
                }
            }
        ]
    },
    gestationAtBirth: {
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
                toValue: (val, sections) => {
                    const dueDate = sections.dueDate.value
                    const birthdate = val.dob
                    if(!val || !dueDate) {
                        // dueDate and birthdate must exist
                        return null
                    }
                    return FULL_TERM_DAYS - moment.duration(dueDate.diff(birthdate)).get('days')
                },
                fromValue: (val, sections) => {
                    const dueDate = sections.dueDate.value
                    const gestationAtBirth = val
                    if(!val || !dueDate) {
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
                toValue: (val) => val.gestation_at_birth,
                fromValue: (val) => ({ gestation_at_birth: val })
            }
        ]
    }
    // birth: {
    //     options: [
    //         {
    //             label: 'Due Date',
    //             inputs: [
    //                 {
    //                     type: 'date',
    //                     placeholder: 'hey',
    //                     value: moment(),
    //                     id: 'due_date'
    //                 }
    //             ],
    //             toValue: (val) => val.due_date,
    //             fromValue: (val, inputs) => ({ due_date: val })
    //         },
    //         {
    //             label: 'Last Menstural Period',
    //             inputs: [
    //                 {
    //                     type: 'date',
    //                     placeholder: 'Last Menstural Period',
    //                     id: 'last_menstural_period_date'
    //                 }
    //             ],
    //             toValue: (val) => {
    //                 val = val.last_menstural_period_date
    //                 return val ? moment(val).add(9, 'months') : null
    //             },
    //             fromValue: (val, inputs) => {
    //                 val = val ? moment(val).add(-9, 'months') : null
    //                 return { last_menstural_period_date: val }
    //             }
    //         }
    //     ]
    // }
})

export default config
