import Chart from '../src/Chart.js'

class TestChart extends Chart {}

test('Chart title can be set and retrieved', () => {
    const chart = new TestChart('Test Chart')

    expect(chart.getTitle()).toBe('Test Chart')

    chart.setChartTitle('Updated Chart')

    expect(chart.getTitle()).toBe('Updated Chart')
})

test('Chart title must be a string', () => {
    const chart = new TestChart('Test Chart')
    expect(() => chart.setChartTitle(123)).toThrow(
        "Title can't be empty and must be a string",
    )
})

test('Chart data can be added and retrieved', () => {
    const chart = new TestChart('Test Chart')

    chart.addData({ Apples: 10, Bananas: 7 })

    expect(chart.getData()).toEqual([
        { label: 'Apples', value: 10 },
        { label: 'Bananas', value: 7 },
    ])
    console.log(chart.getData())
})

test('Chart data must be numbers', () => {
    const chart = new TestChart('Test Chart')
    expect(() => chart.addData({ Apples: '10', Bananas: 7 })).toThrow(
        'Data values must be numbers',
    )
})

test('Chart data must be a non-null object', () => {
    const chart = new TestChart('Test Chart')

    expect(() => chart.addData(null)).toThrow(
        "Data can't be null and must be an object",
    )

    expect(() => chart.addData(42)).toThrow(
        "Data can't be null and must be an object",
    )

    expect(() => chart.addData([1, 2, 3])).toThrow(
        "Data can't be null and must be an object",
    )
})

test('Data label must be a non-empty string', () => {
    const chart = new TestChart('Test Chart')
    expect(() => chart.addData({ '': 10 })).toThrow(
        "Data labels can't be empty and must be strings",
    )
})

test('Chart data can be updated', () => {
    const chart = new TestChart('Test Chart')
    chart.addData({ Apples: 10, Bananas: 7 })
    chart.updateData('Apples', 15)
    expect(chart.getData()).toEqual([
        { label: 'Apples', value: 15 },
        { label: 'Bananas', value: 7 },
    ])
    console.log(chart.getData())
})

test('Chart can handle adding data with existing labels', () => {
    const chart = new TestChart('Test Chart')
    chart.addData({ Apples: 10, Bananas: 7 })

    expect(() => chart.addData({ Apples: 5 })).toThrow(
        'Data with label "Apples" already exists',
    )
})

test('Chart can handle updating non-existing data labels', () => {
    const chart = new TestChart('Test Chart')
    chart.addData({ Apples: 10, Bananas: 7 })

    expect(() => chart.updateData('Cherries', 5)).toThrow(
        'Data with label "Cherries" not found',
    )
})
