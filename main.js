/*var videoData = [{title: "Despacito", amount: 5.68},
         {title: "Shape of You", amount: 3.89},
         {title: "See You Again", amount: 3.85},
         {title: "Uptown Funk", amount: 3.32},
         {title: "Masha and the Bear: Recipe for Disaster", amount: 3.31},
         {title: "Gangam Style", amount: 3.23},
         {title: "Sorry", amount: 3.03},
         {title: "Sugar", amount: 2.80},
         {title: "Shake it Off", amount: 2.67},
         {title: "Roar", amount: 2.65},
         {title: "Bailando", amount: 2.63},
         {title: "Thinking Out Loud", amount: 2.53},
         {title: "Counting Stars", amount: 2.51},
         {title: "Dark Horse", amount: 2.46},
         {title: "Lean On", amount: 2.43}
                ];

var divSelection = d3.select("body")
                     .selectAll("div");

//Add your code here:
function show_video_data(d) {
  return d.title + ": " + d.amount + " views"
}

divSelection
    .data(videoData)
    .enter() // compute elements to append
    .append('div') // append elements as divs
    .text(show_video_data)
    .attr("class", "bar")
    .style("width", function(d) {
      return d.amount * 70 + "px";
    });
*/

const ds1 = [
                  [ 34,    78 , "#FF0000"],
                  [ 109,   280 , "#FF0000"],
                  [ 310,   120 , "#FF0000"],
                  [ 79,    411 , "#FF0000"],
                  [ 420,   220 , "#FF0000"],
                  [ 233,   145 , "#FF0000"],
                  [ 333,   96 , "#FF0000"],
                  [ 222,   333 , "#FF0000"],
                  [ 78,    320 , "#FF0000"],
                  [ 21,    123 , "#FF0000"]
                ];

const ds2 = [
                  [ 40,    56 , "#0000FF"],
                  [ 115,   340 , "#0000FF"],
                  [ 280,   151 , "#0000FF"],
                  [ 32,    342 , "#0000FF"],
                  [ 367,   212 , "#0000FF"],
                  [ 156,   234 , "#0000FF"],
                  [ 421,   123 , "#0000FF"],
                  [ 390,   344 , "#0000FF"],
                  [ 50,    77 , "#0000FF"],
                  [ 198,   369 , "#0000FF"]
                ];


const w = 500;
const h = 500;

data = ds1.concat(ds2);
//console.log(data);

const svg = d3.select("body")
              .append("svg")
              .attr("width", w)
              .attr("height", h);

svg.selectAll("circle")
   .data(data)
   .enter()
   .append("circle")
   .attr("cx", (d, i) => d[0])
   .attr("cy", (d, i) => h - d[1])
   .attr("r", 3)
   .style("fill", (d) => d[2]);

svg.selectAll("text")
   .data(data)
   .enter()
   .append("text")
   // Add your code below this line
   .attr("x", (d) => d[0]+5)
   .attr("y", (d) => h - d[1])
   .text((d) => d[0]+', '+d[1])
   .style("fill", (d) => d[2]);
