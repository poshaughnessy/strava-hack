import d3 from 'd3';

const timeFormat = d3.time.format('%Y-%m-%dT%H:%M:%SZ');

function parseDate(date) {
  return timeFormat.parse(date);
}

export default function(element) {

  var margin = {top: 20, right: 20, bottom: 80, left: 50},
    width = window.innerWidth - margin.left - margin.right,
    height = window.innerHeight - margin.top - margin.bottom;

  var x = d3.time.scale()
    .range([0, width]);

  var y = d3.scale.linear()
    .range([height, 0]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom');

  var yAxis = d3.svg.axis()
    .scale(y)
    .tickFormat((d) => {return (d / 1000) + ' km'})
    .orient('left');

  var line = d3.svg.line()
    .x(function(d) { return x(d.start_date); })
    .y(function(d) { return y(d.distance); });

  var svg = d3.select(element).append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  d3.json('activities.json', function(error, data) {

    if (error) throw error;

    data.forEach(function (d) {
      d.start_date = parseDate(d.start_date);
    });

    x.domain(d3.extent(data, function(d) { return d.start_date; }));
    y.domain(d3.extent(data, function(d) { return d.distance; }));

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

    svg.append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', line);

  });

}
