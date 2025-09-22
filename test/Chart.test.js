import Chart from '../src/Chart.js'

class TestChart extends Chart {}

test("Chart title can be set and retrieved", () => {
  const chart = new TestChart("Test Chart")

  expect(chart.getTitle()).toBe("Test Chart")

  chart.setTitle("Updated Chart")

  expect(chart.getTitle()).toBe("Updated Chart")
})

test("Chart data can be added and retrieved", () => {
const chart = new TestChart("Test Chart");

chart.addData({ Apples: 10, Bananas: 7 });

  expect(chart.getData()).toEqual([
    { label: "Apples", value: 10 },
    { label: "Bananas", value: 7 },
  ]);
  console.log(chart.getData());
});