import PieChart from "../src/PieChart"

class TestPieChart extends PieChart {}

test("PieChart title can be set and retrieved", () => {
  const pieChart = new TestPieChart("Test Pie Chart")
  expect(pieChart.getTitle()).toBe("Test Pie Chart")
  console.log(pieChart.getTitle())
})

test("PieChart data can be added and retrieved", () => {
  const pieChart = new TestPieChart("Test Pie Chart")
  pieChart.addData({ Apples: 10, Bananas: 7, Cherries: 15 })
  expect(pieChart.getData()).toEqual([
    { label: 'Apples', value: 10 },
    { label: 'Bananas', value: 7 },
    { label: 'Cherries', value: 15 }
  ])
  console.log(pieChart.getData())
})

test("PieChart can calculate total votes", () => {
  const pieChart = new TestPieChart("Test Pie Chart")
  pieChart.addData({ Apples: 10, Bananas: 7, Cherries: 15 })
  expect(pieChart.getTotalVotes()).toBe(32)
  console.log(pieChart.getTotalVotes())
})

test("PieChart can calculate vote percentages", () => {
  const pieChart = new TestPieChart("Test Pie Chart")
  pieChart.addData({ Apples: 10, Bananas: 7, Cherries: 15 })
    expect(pieChart.getVotePercentage()).toEqual([
    { label: 'Apples', percentage: '31.25%' },
    { label: 'Bananas', percentage: '21.875%' },
    { label: 'Cherries', percentage: '46.875%' }
  ])
    console.log(pieChart.getVotePercentage())
})

test("PieChart can identify slice with maximum value", () => {
  const pieChart = new TestPieChart("Test Pie Chart")
  pieChart.addData({ Apples: 10, Bananas: 15, Cherries: 7 })
  expect(pieChart.getLargestSlice()).toEqual([{ label: "Bananas", value: 15 }])
  console.log(pieChart.getLargestSlice())
})

test("PieChart can identify slice with minimum value", () => {
  const pieChart = new TestPieChart("Test Pie Chart")
  pieChart.addData({ Apples: 10, Bananas: 15, Cherries: 7 })
  expect(pieChart.getSmallestSlice()).toEqual([{ label: 'Cherries', value: 7 }])
  console.log(pieChart.getSmallestSlice())
})

test("PieChart can sort slices by value", () => {
  const pieChart = new TestPieChart("Test Pie Chart")
  pieChart.addData({ Apples: 10, Bananas: 15, Cherries: 7 })
  const sortedData = pieChart.sortSlicesByValue()
  expect(sortedData).toEqual([
    { label: 'Bananas', value: 15 },
    { label: 'Apples', value: 10 },
    { label: 'Cherries', value: 7 }
  ])
  console.log("sorted by value", sortedData)
})
