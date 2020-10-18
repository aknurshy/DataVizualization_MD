var margin = 150;
var svg = d3.select("svg");
var width = svg.attr("width") - margin;
var height = svg.attr("height") - margin;

svg.append("text")
.attr("transform","translate(100,0)")
.attr("x",5)
.attr("y",50)
.attr("class","title")
.text("Statistics of marriages and divorces in KZ");

var xScale = d3.scaleBand().range([0, width]).padding(0.4);
var yScale = d3.scaleLinear().range([height,0]);

var g = svg.append("g").attr("transform","translate(100,100)");

var before = [
  {year:2010, val: 146, color:'#aac0f0', highlight:'#5182ed'},
  {year:2011, val: 160, color:'#aac0f0', highlight:'#5182ed'},
  {year:2012, val: 164, color:'#aac0f0', highlight:'#5182ed'},
  {year:2013, val: 164, color:'#aac0f0', highlight:'#5182ed'},
  {year:2014, val: 159, color:'#aac0f0', highlight:'#5182ed'},
  {year:2015, val: 148, color:'#aac0f0', highlight:'#5182ed'},
  {year:2016, val: 141, color:'#aac0f0', highlight:'#5182ed'},
  {year:2017, val: 141, color:'#aac0f0', highlight:'#5182ed'},
  {year:2018, val: 137, color:'#aac0f0', highlight:'#5182ed'},
];

var after = [
  {year:2010, val: 41, color:'#f0a3a3', highlight:'#ed6f6f'},
  {year:2011, val: 44, color:'#f0a3a3', highlight:'#ed6f6f'},
  {year:2012, val: 48, color:'#f0a3a3', highlight:'#ed6f6f'},
  {year:2013, val: 51, color:'#f0a3a3', highlight:'#ed6f6f'},
  {year:2014, val: 52, color:'#f0a3a3', highlight:'#ed6f6f'},
  {year:2015, val: 53, color:'#f0a3a3', highlight:'#ed6f6f'},
  {year:2016, val: 51, color:'#f0a3a3', highlight:'#ed6f6f'},
  {year:2017, val: 54, color:'#f0a3a3', highlight:'#ed6f6f'},
  {year:2018, val: 54, color:'#f0a3a3', highlight:'#ed6f6f'},
];

data = before.concat(after);
xScale.domain(data.map(function(d) { return d.year;}));
yScale.domain([0,d3.max(data, function(d) {return d.val;})]);

g.append("g")
.attr("transform","translate(0,"+height+")")
.call(d3.axisBottom(xScale));

g.append("g")
.call(d3.axisLeft(yScale));

function onMouseOver(d,i) {
  d3.select(this)
    .attr('class','bar')
    .style('fill', function (d) {
      return d.highlight;
    } );

}

function onMouseOut(d,i) {
  d3.select(this)
  .attr('class','bar')
  .style('fill', function (d) {
    return d.color;
  } );


}

bar = g.selectAll("g")
       .data(data, data => data)
       .enter()
       .append("g");

bar.append("rect")
   .on("mouseover", onMouseOver)
   .on("mouseout", onMouseOut)
   .attr("x", (d)=>xScale(d.year))
   .attr("y", (d)=>yScale(d.val))
   .attr("width", xScale.bandwidth())
   .transition()
   .ease(d3.easeLinear)
   .duration(500)
   .delay((d,i)=>i*50)
   .attr("height", (d)=>height-yScale(d.val))
   .style('fill', function(d) {return d.color;});

bar.append("text")
   .attr("x", function(d,i){
        console.log("d", d);
        console.log("x pos:",xScale(d.year) + xScale.bandwidth() / 2);
        return xScale(d.year) + xScale.bandwidth() / 2;})
   .attr("y", function(d){
        console.log("y position", height - yScale(d.val) + 14);
        return yScale(d.val) + 10 ;})
   .attr("class", "label")
   .attr("text-anchor", "middle")
   .text(function(d,i) {
        console.log(d);
        return d.val;}) ;

g.append("circle")
 .attr("cx",400)
 .attr("cy",5)
 .attr("r", 6)
 .style("fill", "#aac0f0")
g.append("circle")
 .attr("cx",400)
 .attr("cy",35)
 .attr("r", 6)
 .style("fill", "#f0a3a3")
g.append("text")
 .attr("x", 420)
 .attr("y", 5)
 .text("Marriages")
 .style("font-size", "15px")
 .style("fill", "#5182ed")
 .attr("alignment-baseline","middle")
g.append("text")
 .attr("x", 420)
 .attr("y", 35)
 .text("Divorces")
 .style("font-size", "15px")
 .style("fill", "#ed6f6f")
 .attr("alignment-baseline","middle")
