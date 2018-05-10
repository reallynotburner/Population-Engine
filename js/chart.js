
var population = 1000000;
var testGroup = []; // a variable to hold my fake population of numbers
var groups = 1000; // note that the more groups you have, the more accumulated error you get!
// TODO: add the accumulated +/- error for a given chart

// stuffing an array with numbers, just mvp of using the flotr library
// this algorithm of generation of numbers is simply using Math.random
for (var i = 0; i < population; i++) {
    testGroup.push(Math.random());
}

// give an array of numbers, and the number of bars to represent them, 
// return array of [ barIndex, qty ] where the barIndex is the 
// value of the sub population by bracket, and the qty, the number of 
// members that are in that population.

// checkout https://stackoverflow.com/questions/8435183/generate-a-weighted-random-number

function makeRangedChartArrayBar(population, number) {
    // don't mess with the original array, map it, then sort it to new variable
    var sortedPop = population.map((elem)=>elem).sort((a, b)=>a - b);
    var range = sortedPop[sortedPop.length - 1] - sortedPop[0];
    var total = sortedPop.length;
    var i;
    var result = [];
    var increment = range / number;
    var currentEnd = increment;
    var currentSubPop = 0;
    
    for (i = 0; i < number; i++) {
        result.push([i, 0]);
    }
    
    for (i = 0; i < total - 1 && currentSubPop < result.length; i++) {
        if (sortedPop[i] < currentEnd) {
            result[currentSubPop][1]++;
        } else {
            currentSubPop++;
            currentEnd += increment;
            i--; // try that one again next loop, find a home for that element.
        }
    }
    return [result];
}

window.onload = function drawChart() {
    Flotr.draw(
        document.getElementById('chart'),
        makeRangedChartArrayBar(testGroup, groups),
        {
            title: 'Distribution of population of ' + testGroup.length + ' numbers into ' + groups + ' groups',
            bars: {
                show: true,
                barWidth: 1.0,
                shadowSize: 0,
                fillOpacity: 1.0,
                lineWidth: 0
            },
            yaxis: {
                min: 0,
                tickDecimals: 0
            },
            xaxis: {
                tickDecimals: 0
            },
            grid: {
                verticalLines: false
            }
        }
    );
}