import { BarChart, LineChart, PieChart } from './index.js'

const barChart = new BarChart('Fruit Stand')
barChart.addData({ Apples: 2, Bananas: 4, Kiwis: 6 })
console.log(barChart.getTitle())
console.log(barChart.getData())
