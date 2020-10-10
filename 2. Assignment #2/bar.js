const DATA = [
  {id:1, value:10, name:"Kaz", check:1},
  {id:2, value:5, name:"Rus", check:1},
  {id:3, value:3, name:"Kyr", check:1},
  {id:4, value:1, name:"Ukr", check:1},
]

const listItems = d3.select('ul')
.selectAll('li')
.data(DATA, (data)=>data.name)
.enter()
.append('li');

listItems.append('span')
.text((data)=>data.name);

const xScale = d3.scaleBand()
.domain(DATA.map( (dp) => dp.name ))
.rangeRound([0,250])
.padding(0.1);

const yScale = d3.scaleLinear()
.domain([0,12])
.rangeRound([0,200]);

const container = d3.select("svg")
.append('g')
.call(d3.axisBottom(xScale))
.attr('color','#DD1111');

const bars = container
.selectAll(".bar")
.data(DATA)
.enter()
.append('rect')
.classed('bar',true)
.attr('width',xScale.bandwidth())
.attr('height',data => yScale(data.value))
.attr('x',data => xScale(data.name))
.attr('y', data => 200-yScale(data.value))
.attr('id', (data) => "bar" + data.id);


listItems.append('input')
         .attr('type','checkbox')
         .attr('checked',true)
         .attr('id',(data) => "inp" + data.id)
         .on('change', (evnt) => {
  var re = new RegExp("[0-4]");
  m = re.exec(evnt.target.id);
  cid = parseInt(m);
  for (var i = 0; i < DATA.length; i++) {
    if ((DATA[i]['id']) == cid) {
      if (DATA[i]['check'] == 1) {
        DATA[i]['check'] = 0;
        var removing_filter = DATA.filter((el) => el.check !== 0);
        console.log('console.log(removing_filtered); ', removing_filter);
        container.selectAll('.bar')
                 .data(removing_filter, data => data.id)
                 .exit()
                 .remove();
      } else {
        DATA[i]['check'] = 1;
        var addition_filter = DATA.filter((el) => el.check == 1);
        console.log('console.log(addition_filter);', addition_filter);
        var appending = container.selectAll('.bar')
                                 .data(addition_filter, data => data.name)
                                 .enter()
                                 .append('rect')
                                 .classed('bar',true)
                                 .attr('width',xScale.bandwidth())
                                 .attr('height',data => yScale(data.value))
                                 .attr('x',data => xScale(data.name))
                                 .attr('y', data => 200-yScale(data.value))
                                 .attr('id', (data) => "bar"+ data.id);
      }
    }
  }
});
