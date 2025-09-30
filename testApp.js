import { BarChart, LineChart, PieChart } from './index.js'

const barChart = new BarChart('Fruit Sales')
barChart.addData({ Apples: 10, Bananas: 20, Cherries: 15 })

console.log('Largest Bar:', barChart.getLargestBar())
console.log('Smallest Bar:', barChart.getSmallestBar())
console.log('Sorted Bars Descending:', barChart.sortBarsByValue())
console.log('Total of Bars:', barChart.getTotal())

const pieChart = new PieChart('Pet Popularity')
pieChart.addData({ Dogs: 42, Cats: 32, Birds: 22, Fish: 10 })

console.log('Largest Slice:', pieChart.getLargestSlice())
console.log('Smallest Slice:', pieChart.getSmallestSlice())
console.log('Sorted Slices Descending:', pieChart.sortSlicesByValue())
console.log('Percentages:', pieChart.getPercentage())

const lineChart = new LineChart('Website Traffic')
lineChart.addLines('January', [30, 40, 35, 50, 49, 60, 70, 91])
lineChart.addLines('February', [20, 30, 45, 60, 70, 80, 100, 120])

console.log('Line Chart Data:', lineChart.Lines())
console.log('Max Value for Each Line:', lineChart.getMaxValueForEachLine())
console.log('Min Value for Each Line:', lineChart.getMinValueForEachLine())
console.log('Global Max Value:', lineChart.getGlobalMaxValue())
console.log('Global Min Value:', lineChart.getGlobalMinValue())
console.log('Line Names:', lineChart.getLineNames())
console.log('All Lines:', lineChart.getLines())
console.log('Removing January line...')
lineChart.removeLine('January')
console.log('All Lines after removal:', lineChart.getLines())
console.log('Global Max Value after removal:', lineChart.getGlobalMaxValue())
console.log('Global Min Value after removal:', lineChart.getGlobalMinValue())
