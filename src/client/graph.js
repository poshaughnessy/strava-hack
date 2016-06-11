import d3 from 'd3';

const timeFormat = d3.time.format('%Y-%m-%dT%H:%M:%SZ');
let totalDistanceByMonth = {};

function parseDate(date) {
  return timeFormat.parse(date);
}

function generateTotalsData() {
  const data = Object.keys(totalDistanceByMonth).map(function(k) {
    return {
      month: totalDistanceByMonth[k].month,
      distance: totalDistanceByMonth[k].distance
    };
  });
  console.log('totalsData', data);
  return data.reverse();
}

export default function(element) {

  var margin = {top: 50, right: 80, bottom: 100, left: 80},
    width = (window.innerWidth * 0.9) - margin.left - margin.right,
    height = (window.innerHeight * 0.9) - margin.top - margin.bottom;

  var x = d3.time.scale()
    .range([0, width]);

  var y = d3.scale.linear()
    .range([height, 0]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom')
    .ticks(d3.time.months)
    .tickSize(16, 0)
    .tickFormat(d3.time.format('%B'));

  var yAxis = d3.svg.axis()
    .scale(y)
    .tickFormat((d) => {return (d / 1000) + ' km';})
    .orient('left');

  var svg = d3.select(element).append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  d3.json('activities.json', function(error, data) {

    if (error) throw error;

    data.forEach(function (d) {
      d.start_date = parseDate(d.start_date);
      d.month = d3.time.month(d.start_date);
      if (!totalDistanceByMonth[d.month]) {
        totalDistanceByMonth[d.month] = {
          month: d.month,
          distance: 0
        };
      }
      totalDistanceByMonth[d.month] = {
        month: d.month,
        distance: totalDistanceByMonth[d.month].distance + d.distance
      };
    });

    const totalsData = generateTotalsData();

    const firstMonth = new Date(totalsData[0].month);
    const lastMonth = new Date(totalsData[totalsData.length - 1].month);
    const lastMonthPlusOne = new Date(lastMonth);
    lastMonthPlusOne.setMonth(lastMonth.getMonth() + 1);

    let highestMonthTotal = 0;

    totalsData.forEach(data => {
      highestMonthTotal = Math.max(highestMonthTotal, data.distance);
    });

    x.domain([firstMonth, lastMonth]);
    y.domain([0, highestMonthTotal + 1000]);

    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end');

    svg.selectAll(".bar")
      .data(totalsData)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.month); })
      .attr("width", width / (totalsData.length + 1))
      .attr("y", function(d) { return y(d.distance); })
      .attr("height", function(d) { return height - y(d.distance); });

  });

}
