import { BarChart, LineChart, PieChart } from './index.js'

const barChart = new BarChart('Fruit Stand')
barChart.addData({ Apples: 2, Bananas: 4, Kiwis: 8 })
console.log('Bar Chart Title: ' + barChart.getTitle())
console.log('Bar Chart Data: ', barChart.getData())
console.log('Largest Value in BarChart: ', barChart.getLargestBar())
console.log('Smallest Value in BarChart: ', barChart.getSmallestBar())
console.log('Sorted BarChart Data: ', barChart.sortBarsByValue(true))
console.log('Sorted BarChart Data Ascending: ', barChart.sortBarsByValue(false))
console.log('Total Sales: ' + barChart.getTotal())
