import { PieChart } from '../index.js'

const pieChart = new PieChart('Fruit Stand')
pieChart.addData({ Apples: 2, Bananas: 4, Kiwis: 8 })

console.log('Pie Chart Title: ' + pieChart.getTitle()) // Fruit Stand
console.log('Pie Chart Data: ', pieChart.getData()) // [ { label: 'Apples', value: 2 }, { label: 'Bananas', value: 4 }, { label: 'Kiwis', value: 8 } ]
console.log('Largest Slice in PieChart: ', pieChart.getLargestSlice()) // [ { label: 'Kiwis', value: 8 } ]
console.log('Smallest Slice in PieChart: ', pieChart.getSmallestSlice()) // [ { label: 'Apples', value: 2 } ]
console.log('Sorted PieChart Data: ', pieChart.sortSlicesByValue(true)) // [ { label: 'Kiwis', value: 8 }, { label: 'Bananas', value: 4 }, { label: 'Apples', value: 2 } ]
console.log(
    'Sorted PieChart Data Ascending: ',
    pieChart.sortSlicesByValue(false),
) // [ { label: 'Apples', value: 2 }, { label: 'Bananas', value: 4 }, { label: 'Kiwis', value: 8 } ]
console.log('Total Votes: ' + pieChart.getTotal()) // 14
console.log('Percentage of Votes: ', pieChart.getPercentage()) // [ { label: 'Apples', percentage: '14.285714285714286%' }, { label: 'Bananas', percentage: '28.57142857142857%' }, { label: 'Kiwis', percentage: '57.14285714285714%' } ]
