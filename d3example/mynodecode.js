// David Mann
// ba6.us

// An example of a way to integrate SQL Developer 4 with d3.js
// and other JavaScript libraries. 

var nodes = {};

// Compute the distinct nodes from the links.
links.forEach(function(link) {
  link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
  link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
});

var width = 800,
    height = 600;

var force = d3.layout.force()
    .nodes(d3.values(nodes))
    .links(links)
    .size([width, height])
    .linkDistance(50)
    .charge(-800)
    .on("tick", tick)
    .start();

var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

var link = svg.selectAll(".link")
    .data(force.links())
    .enter().append("line")
    .attr("class", "link");

var node = svg.selectAll(".node")
    .data(force.nodes())
    .enter().append("g")
    .attr("class", "node")
//    .on("mouseover", mouseover)
//    .on("mouseout", mouseout)
    .call(force.drag);

node.append("rect")
.attr("x",-40)
.attr("y",-10)
    .attr("width", 80)
    .attr("height",20);

node.append("text")
    .attr("x", -30)
    .attr("dy", "4px")
    .text(function(d) { return d.name; });

function tick() {
  link
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  node
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
}

function mouseover() {
  d3.select(this).select("circle").transition()
      .duration(750)
      .attr("r", 20);
}

function mouseout() {
  d3.select(this).select("circle").transition()
      .duration(750)
      .attr("r", 8);
}

// References:
// Labeled Force Layout - http://bl.ocks.org/mbostock/950642
