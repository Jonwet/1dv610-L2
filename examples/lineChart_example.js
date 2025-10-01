import { LineChart } from '../index.js'

const lineChart = new LineChart('Fruit Sales Over Time')
lineChart.addLines('Apples', [5, 10, 15, 20])
lineChart.addLines('Bananas', [3, 6, 9, 12])
lineChart.addLines('Kiwis', [2, 4, 6, 8])

console.log('Line chart title: ' + lineChart.getTitle()) // Fruit Sales Over Time
console.log('Line chart data: ', lineChart.getLines()) // { Apples: [ 5, 10, 15, 20 ], Bananas: [ 3, 6, 9, 12 ], Kiwis: [ 2, 4, 6, 8 ] }
console.log('Line names: ', lineChart.getLineNames()) // [ 'Apples', 'Bananas', 'Kiwis' ]
console.log('Max value for each line: ', lineChart.getMaxValueForEachLine()) // { Apples: 20, Bananas: 12, Kiwis: 8 }
console.log('Min value for each line: ', lineChart.getMinValueForEachLine()) // { Apples: 5, Bananas: 3, Kiwis: 2 }
console.log('Global max value: ' + lineChart.getGlobalMaxValue()) // 20
console.log('Global min value: ' + lineChart.getGlobalMinValue()) // 2
console.log('Line chart data after removing Kiwis: ')
lineChart.removeLine('Kiwis')
console.log(lineChart.getLines()) // { Apples: [ 5, 10, 15, 20 ], Bananas: [ 3, 6, 9, 12 ] }
