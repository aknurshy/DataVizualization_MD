const width = 1440;
const height = 1536;
var xScale = d3.scaleLinear().range([0,width]);
var yScale = d3.scaleLinear().range([0,height]);

var tip = d3.tip().attr("class","d3-tip").html((d)=>d);

var svg = d3.select("svg");
svg.attr("width",width);
svg.attr("height",height);
svg.attr("transform",'translate(100,50)');

svg.call(tip);

sozyv_df = [
  {id:1, year:1995, yavka:79.8, female_proportion:13.4},
  {id:2, year:1999, yavka:62.5, female_proportion:10.3},
  {id:3, year:2004, yavka:45.2, female_proportion:10.3},
  {id:4, year:2007, yavka:64.56, female_proportion:16.6},
  {id:5, year:2012, yavka:75.45, female_proportion:24.3},
  {id:6, year:2016, yavka:77.1, female_proportion:27.1}
]

d3.json("data.json").then((data)=>{
  console.log(data);
  var maxYScale = d3.max(
    data.map((d)=>d.length)
  );
  console.log("maxYScale", maxYScale);
  console.log("data.length", data.length);
  xScale.domain([0, data.length]);
  yScale.domain([0, maxYScale]);

  links = [];
  sozyv_avg_ages = [];
  for(let i = 0; i < data.length; i++) {
    // console.log(i , "data[i]",data[i]);

    //  year_born = data[i].map((d)=>d.year)
    var avg_age = d3.mean(data[i].map((d)=>{
      //console.log(d);
      return d.year;
    }));
    // console.log('avg_age', avg_age);

    sozyv_avg_ages.push(Math.round(avg_age, -2));
    if (i < data.length-1){
      for(let j = 0; j < data[i].length; j++) {

        for(let k = 0; k < data[i+1].length; k++) {
          // console.log('data[i][j]', data[i][j]);
          if(data[i][j].name==data[i+1][k].name) {
            // console.log('data[i][j]', i, j, data[i][j]);
            links.push([
              [xScale(i),yScale(j)],
              [xScale(i+1),yScale(k)]
            ]);
          }
        }

      }
    }


  }


  console.log('links', links);
  console.log('sozyv_avg_ages', sozyv_avg_ages);



  var sozyvs = svg
  .selectAll("g")
  .data(data)
  .enter()
  .append("g")
  .attr("class","sozyv")
  .attr("transform",(d,i)=>'translate(${xScale(i)},0)')

  texts = sozyvs
    .append('text')
    .text((d,i)=>{
    out_str = 'Созыв ' + (i + 1) + ' - ' + sozyv_df[i].year;
    return out_str;
  })
  .attr("x", (d, i) => xScale(i) + 15)
  .attr("y", 15)

  texts2 =  sozyvs
    .append('text')
    .text((d,i)=>{
      out_str = 'Средний возраст ' + sozyv_avg_ages[i];
      return out_str;
    })
    .attr("x", (d, i) => xScale(i) + 15)
    .attr("y", 30);

  text_female_proportion = sozyvs
    .append('text')
    .text((d,i)=>{
      out_str = 'Доля женщин ' + sozyv_df[i].female_proportion;
      return out_str;
    })
    .attr("x", (d, i) => xScale(i) + 15)
    .attr("y", 45);

  text_yavka = sozyvs
    .append('text')
    .text((d, i)=> {
      out_str = 'Явка избирателей ' + sozyv_df[i].yavka;
      return out_str;
    })
    .attr("x", (d, i) => xScale(i) + 15)
    .attr("y", 60);


  function onmouseout(d,i,e) {
    d3.select(this)
    .attr('class', d=>d.party);
    tip.hide();
  }

  function onmouseover(d,i,e) {
    d3.select(this)
    .attr('class',"hl");
    tip.show(d.name, e[i]);

  }

  sozyvs
  .selectAll("rect")
  .data((d,i)=>{
    //console.log(d, i);
    var pi = i;
    // Lets add the sozyv number to each deputat
    d.map( (dr) =>{
      dr.sozyv_num = i;
      return d;
    });
  //  console.log('d', d);
    return d;
  })
  .enter()
  .append("rect")
  .attr("class", (d,j)=>d.party)
  .attr("y", (d, j)=>{
    // console.log(yScale(j));
   //console.log('j', j);
    return yScale(j); })
  .attr("x", (d,j)=>{
    //console.log('xScale', xScale(j));
    // use sozyv number for scaling
    return  xScale(d.sozyv_num);
  })
  .attr("width", 10)
  .attr("height", 10)
  .attr("name",(d,j)=> d.name)
  .on("mouseover",onmouseover)
  .on("mouseout",onmouseout);

  var lineGenerator = d3.line().curve(d3.curveCardinal);

  svg.selectAll("path")
  .data(links)
  .enter()
  .append('path')
  .attr("d",(d,i)=>lineGenerator(d));

  // Legend Part

});
