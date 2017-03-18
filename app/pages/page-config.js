import Bilirubin from './bilirubin/bilirubin.js'
import PretermGrowth from './growth/preterm-growth.js'
import Growth from './growth/growth.js'
import GestationalAge from './gestational-age/gestational-age.js'

const config = [
    {
        title: 'Bilirubin Calculator',
        component: Bilirubin
    },
    {
        title: 'Preterm Growth Calculator',
        component: PretermGrowth
    },
    {
        title: 'Growth Calculator',
        component: Growth
    },
    {
        title: 'Gestational Age Calculator',
        component: GestationalAge
    }
]

export default config
