import BarChart from '../src/BarChart.js'

test("BarChart title can be set and retrieved", () => {
  const barChart = new BarChart("Test Bar Chart")
  expect(barChart.getTitle()).toBe("Test Bar Chart")
})

test("BarChart data can be added and retrieved", () => {
  const barChart = new BarChart("Test Bar Chart")
  barChart.addData({ Apples: 10, Bananas: 7 })
  expect(barChart.getData()).toEqual([{ label: 'Apples', value: 10 }, { label: 'Bananas', value: 7 }])
  console.log(barChart.getData());
})
