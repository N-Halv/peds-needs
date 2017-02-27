import React from 'react'
import {jStat} from 'jStat'
import Chart from 'chart.js'

class GrowthCalculation extends React.Component {

    componentDidMount() {
        const elem = document.getElementById('myChart')
        this.createChart(elem)
    }

    getRecord = (config, age) => {
        const records = config.lmsValues

        if(age < records[0].age || age > records[records.length - 1]) {
            throw 'age is out of range'
        }

        // get closest record to given age
        // TODO: binary search
        let closestDistance = Infinity
        let closestRecord
        for(let i = 0; i < records.length; i++) {
            const dist = Math.abs(age - records[i].age)
            if(dist < closestDistance) {
                closestDistance = dist
                closestRecord = records[i]
            }
            else {
                break
            }
        }

        return closestRecord
    }

    getZScore = (record, value) => {
        const {l, m, s} = record
        return (Math.pow(value / m, l) - 1) / (l * s)
    }

    normsdist = (z) => {
        const mean = 0,
            sd = 1
        return jStat.normal.cdf(z, mean, sd)
    }

    createChart = (elem) => {
        const {config, age, value} = this.props

        const plot = {
            label: 'plot',
            pointRadius: 5,
            borderColor: 'black',
            pointBackgroundColor: 'green',
            data: [{x: age, y: value}]
        }
        const chartSeries = [plot, ...config.series]

        const colors = [
            'rgba(250,0,0,1)',
            'rgba(200,50,0,1)',
            'rgba(200,100,0,1)',
            'rgba(100,150,0,1)',
            'rgba(50,150,0,1)',
            'rgba(50,200,0,1)',
            'rgba(0,250,0,1)'
        ]
        config.series.forEach((s, index) => {
            s.pointRadius = 0
            s.borderColor = colors[index]
        })

        const ctx = document.getElementById('myChart')
        const scatterChart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: chartSeries
            },
            options: {
                scales: {
                    xAxes: [{
                        type: 'linear',
                        position: 'bottom'
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

            <div className="growth-chart" ref={ref('chart-div')}></div>
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
