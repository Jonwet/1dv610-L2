import Chart from '../src/Chart.js';

class TestChart extends Chart {}

const chart = new TestChart("Test Chart");

console.log(chart.getTitle()) // Should print "Test Chart"

chart.setTitle("Updated Chart");

console.log(chart.getTitle()) // Should print "Updated Chart"
