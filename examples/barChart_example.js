import { BarChart } from '../superChart.js'

const barChart = new BarChart('Fruit Stand')
barChart.addData({ Apples: 2, Bananas: 4, Kiwis: 8 })

console.log('Bar chart title: ' + barChart.getTitle()) // Fruit Stand
console.log('Bar Chart Data: ', barChart.getData()) // [ { label: 'Apples', value: 2 }, { label: 'Bananas', value: 4 }, { label: 'Kiwis', value: 8 } ]
console.log('Largest Value in BarChart: ', barChart.getLargestBar()) // [ { label: 'Kiwis', value: 8 } ]
console.log('Smallest Value in BarChart: ', barChart.getSmallestBar()) // [ { label: 'Apples', value: 2 } ]
console.log('Sorted BarChart Data: ', barChart.sortBarsByValue(true)) // [ { label: 'Kiwis', value: 8 }, { label: 'Bananas', value: 4 }, { label: 'Apples', value: 2 } ]
console.log('Sorted BarChart Data Ascending: ', barChart.sortBarsByValue(false)) // [ { label: 'Apples', value: 2 }, { label: 'Bananas', value: 4 }, { label: 'Kiwis', value: 8 } ]
console.log('Total Sales: ' + barChart.getTotal()) // 14
console.log('Bar Chart Rendered:\n' + barChart.render())
