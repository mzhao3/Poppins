var svg = d3.select("body").append("svg")
    .attr("width", 1000)
    .attr("height", 500)

var margin = {left:100, right:100, top: 100, bottom: 100}
var width = svg.attr("width") - margin.left - margin.right;
var height = svg.attr("height") - margin.bottom - margin.top;


var data = [
    

    {'year': '2004', 'money': '16717.15426171'}, {'year': '2005', 'money': '17441.49270092'}, {'year': '2006', 'money': '17990.85670371'}, {'year': '2007', 'money': '18073.00221438'}, {'year': '2008', 'money': '18927.64888769'}, {'year': '2009', 'money': '19170.16312815'}, {'year': '2010', 'money': '19006.92053506'}, {'year': '2011', 'money': '18332.42167695'}, {'year': '2012', 'money': '18195.40660522'}


    
]

var x = d3.scaleTime()
    .rangeRound([0, width]);
var x_axis = d3.axisBottom(x);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);
var y_axis = d3.axisBottom(y);
var xFormat = "%Y";;
var parseTime = d3.timeParse("%Y");

x.domain(d3.extent(data, function(d) { return parseTime(d.year); }));
y.domain([0, 
	  d3.max(data, function(d) { 
	      return d3.max([d.money]);
	  })]);

var money = function(d) {return d.a};

var multiline = function(category) {
    var line = d3.line()
	.x(function(d) { return x(parseTime(d.year)); })
	.y(function(d) { return y(d[category]); });
    return line;
}



var categories = ['money'];
//var color = d3.scale.category10(); 
var color = d3.scaleOrdinal(d3.schemeCategory10);

var g = svg.append("g")
    .attr("transform",
	  "translate(" + margin.left + "," + margin.top + ")");

for (i in categories) {
    var lineFunction = multiline(categories[i]);
    g.append("path")
	.datum(data) 
	.attr("class", "line")
	.style("stroke", color(i))
	.attr("d", lineFunction);
}

// Add the X Axis
g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickFormat(d3.timeFormat(xFormat)));

// Add the Y Axis
g.append("g")
    .call(d3.axisLeft(y));

g.append("text")
    .attr("x", 450 )
    .attr("y",  375 )
    .style("text-anchor", "middle")
    .text("Year");

g.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -150 )
    .attr("y",  -70 )
    .style("text-anchor", "middle")
    .text("Spending per student ($)");

g.append('text')
    .attr("x", 450 )
    .attr("y",  -30 )
    .style("text-anchor", "middle")
    .text('District 1');
