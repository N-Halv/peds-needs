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

        for(let i = 0; i < records.length - 1; i++) {
            if(age >= records[i].age && age <= records[i + 1].age) {
                if(age === records[i].age) return [records[i]]
                else if(age === records[i + 1].age) return [records[i + 1]]
                return [records[i], records[i + 1]]
            }
        }

        // TODO: throw real errors
        throw 'chart configuration data is bad or not sorted correctly'
    }

    getZScore = (records, value, age) => {

        // TODO: I'm not sure if this is legit linear interpolation...
        const zScores = records.map(record => {
            const {l, m, s} = record
            return (Math.pow(value / m, l) - 1) / (l * s)
        })

        if(zScores.length === 1) {
            return zScores[0]
        }

        const ageAbove = age - records[0].age
        const ageDiff = records[1].age - records[0].age
        const percentAbove = ageAbove / ageDiff

        const zScoreDiff = zScores[1] - zScores[0]
        const zScoreAdd = zScoreDiff * percentAbove
        return zScores[0] + zScoreAdd
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
        const zScore = getZScore(record, value, age)
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
