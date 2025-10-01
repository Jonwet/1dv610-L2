import { PieChart } from '../index.js'

const pieChart = new PieChart('Fruit Stand')
pieChart.addData({ Apples: 2, Bananas: 4, Kiwis: 8 })
console.log('Pie Chart Title: ' + pieChart.getTitle())
console.log('Pie Chart Data: ', pieChart.getData())
console.log('Largest Slice in PieChart: ', pieChart.getLargestSlice())
console.log('Smallest Slice in PieChart: ', pieChart.getSmallestSlice())
console.log('Sorted PieChart Data: ', pieChart.sortSlicesByValue(true))
console.log(
    'Sorted PieChart Data Ascending: ',
    pieChart.sortSlicesByValue(false),
)
console.log('Total Votes: ' + pieChart.getTotal())
console.log('Percentage of Votes: ', pieChart.getPercentage())
