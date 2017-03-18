const config = {}

const lmsValues = Object.keys(config.items).map((key) => ({
    age: parseFloat(key),
    l: config.items[key].l,
    m: config.items[key].m,
    s: config.items[key].s
}))


const sort = (key) => (a, b) => {
    const keyA = a[key], keyB = b[key]
    if (keyA < keyB) return -1
    if (keyA > keyB) return 1
    return 0
}


config.series.forEach(s => {
    s.data = s.data.sort(sort('x'))
})

config.lmsValues = config.lmsValues.sort(sort('age'))

function addX(config, x) {
    config.series.forEach(s => {
        s.data.forEach(d => {
            d.x = d.x + x
        })
    })
    config.lmsValues.forEach(v => {
        v.age = v.age + x
    })
}



function transform(array, seriesKeys, seriesLabels, ageAddOn) {

    // Sort array
    array = array.sort(function(a, b) {
        if (a.age < b.age) return -1
        if (a.age > b.age) return 1
        return 0
    });

    var lmsValues = [];
    var series = {};

    for(var i = 0; i < seriesKeys.length; i++) {
        series[seriesKeys[i]] = {
            label: seriesLabels[i],
            data: []
        };
    }


    for(var i = 0; i < array.length; i++) {
        var obj = array[i];

        // add to series
        for(var j = 0; j < seriesKeys.length; j++) {
            series[seriesKeys[j]].data.push({
                x: obj.age + ageAddOn,
                y: obj[seriesKeys[j]]
            });
        }

        // add to lmsValues
        lmsValues.push({
            age: obj.age + ageAddOn,
            l: obj.L,
            m: obj.M,
            s: obj.S
        });
    }

    // build series array
    var seriesArray = [];
    for(var i = 0; i < seriesKeys.length; i++) {
        seriesArray.push(series[seriesKeys[i]]);
    }

    return {
        series: seriesArray,
        lmsValues: lmsValues
    }
}

// THIS is assuming myList is an array of object that look list this:
// {
//   "3": 389.460664775338,
//   "10": 424.363236411424,
//   "50": 509,
//   "90": 609.123023356672,
//   "97": 661.962831116875,
//   "age": 3.5,
//   "L": 0.07,
//   "M": 509,
//   "S": 0.141
// }
JSON.stringify(transform(myList, ['3', '10', '50', '90', '97'], ['3rd Percentile', '10th Percentile', '50th Percentile', '90th Percentile', '97th Percentile'], 154))
