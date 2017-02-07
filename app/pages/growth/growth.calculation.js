import React from 'react'
import {jStat} from 'jStat'
import Chart from 'chart.js'

class GrowthCalculation extends React.Component {

    componentDidMount() {

        const elem = document.getElementById("myChart")
        this.createChart(elem)
    }

    getRecord = (config, age) => {
        console.log('config', config, age)
        return config.items[age]
    }

    getZScore = (record, value) => {
        const {l, m, s} = record
        return (Math.pow(value / m, l) - 1) / (l * s)
    }

    normsdist = (z) => {
        const mean = 0, sd = 1
        return jStat.normal.cdf(z, mean, sd)
    }

    // constructor() {
    //     super()
    //     this.state = {
    //         client: -1
    //     }
    // }

    // componentDidMount() {
    //     console.log('test')
    // }

    createChart = (elem)  => {

        const ctx = document.getElementById('myChart')
        console.log('creatingChart', elem)
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [[12, 19, 3, 5, 2, 3], [12,3,4,5,6,6]],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        })
    }

    ref = (name) => (element) => {
        this[name] = element
    }

    render() {
        const {getRecord, getZScore, normsdist, ref} = this
        const {config, age, value} = this.props
        const record = getRecord(config, age)
        const zScore = getZScore(record, value)
        const percentile = normsdist(zScore)

        return <div>
            Answer: {value}
            <br />
            Z-Score: {zScore}
            <br />
            percentile: {percentile}

            <canvas id="myChart" ref={ref('chart')}></canvas>
        </div>
    }
}


GrowthCalculation.propTypes = {
    config: React.PropTypes.object,
    age: React.PropTypes.number,
    value: React.PropTypes.number
}
export default GrowthCalculation
