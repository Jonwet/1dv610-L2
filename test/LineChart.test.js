import LineChar from '../src/LineChart'

class TestLineChart extends LineChar {}

test('LineChart title can be set and retrieved', () => {
    const lineChart = new TestLineChart('Test Line Chart')
    expect(lineChart.getTitle()).toBe('Test Line Chart')
    console.log(lineChart.getTitle())
})

test('LineChart lines can be added and retrieved', () => {
    const lineChart = new TestLineChart('Test Line Chart')
    lineChart.addLines('Line A', [1, 2, 3, 4, 5])
    expect(lineChart.getLines()).toEqual({
        'Line A': [1, 2, 3, 4, 5],
    })
    console.log(lineChart.getLines())
})

test('LineChart can retrieve line names', () => {
    const lineChart = new TestLineChart('Test Line Chart')
    lineChart.addLines('Line A', [1, 2, 3])
    lineChart.addLines('Line B', [4, 5, 6])
    expect(lineChart.getLineNames()).toEqual(['Line A', 'Line B'])
    console.log(lineChart.getLineNames())
})

test('LineChart can remove a line', () => {
    const lineChart = new TestLineChart('Test Line Chart')
    lineChart.addLines('Line A', [1, 2, 3])
    lineChart.addLines('Line B', [4, 5, 6])
    lineChart.removeLine('Line A')
    expect(lineChart.getLines()).toEqual({
        'Line B': [4, 5, 6],
    })
    console.log(lineChart.getLines())
})

test('LineChart can get max value for each line', () => {
    const lineChart = new TestLineChart('Test Line Chart')
    lineChart.addLines('Line A', [1, 2, 3])
    lineChart.addLines('Line B', [1, 1, 2])
    expect(lineChart.getMaxValueForEachLine()).toEqual({
        'Line A': 3,
        'Line B': 2,
    })
    console.log(lineChart.getMaxValueForEachLine())
})

test('LineChart can get min value for each line', () => {
    const lineChart = new TestLineChart('Test Line Chart')
    lineChart.addLines('Line A', [1, 2, 3])
    lineChart.addLines('Line B', [0, 1, 2])
    expect(lineChart.getMinValueForEachLine()).toEqual({
        'Line A': 1,
        'Line B': 0,
    })
    console.log(lineChart.getMinValueForEachLine())
})

test('LineChart can get the global max value among all lines', () => {
    const lineChart = new TestLineChart('Test Line Chart')
    lineChart.addLines('Line A', [1, 2, 3])
    lineChart.addLines('Line B', [4, 5, 6])
    expect(lineChart.getGlobalMaxValue()).toBe(6)
    console.log(lineChart.getGlobalMaxValue())
})

test('LineChart can get the global min value among all lines', () => {
    const lineChart = new TestLineChart('Test Line Chart')
    lineChart.addLines('Line A', [-1, 2, 3])
    lineChart.addLines('Line B', [4, 5, 6])
    expect(lineChart.getGlobalMinValue()).toBe(-1)
    console.log(lineChart.getGlobalMinValue())
})
