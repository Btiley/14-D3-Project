
function makeScatter() {

//Create SVG
//-------------------------------------------------------------------
// Clear SVG and replace with resize if browser size changes
  var svgArea = d3.select("body").select("svg");

  // clear svg is not empty
    if (!svgArea.empty()) {
     svgArea.remove();   }

//Set Margins & SVG size
var svgWidth = window.innerWidth;
var svgHeight = window.innerHeight;


var margin = {
    top: 50, 
    right: 50, 
    bottom: 50, 
    left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Append SVG to hold chart.
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
  
//Shift svg by left and top margins.
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

//CREATE CHART
//-------------------------------------------------------------------

//Call data from csv
d3.csv("assets/data/data.csv").then(function(stateData) {      
    
    //Chart Parameters

    stateData.forEach(function(data) {
        data.poverty =  +data.poverty;
        data.healthcare = +data.healthcare;
    });
    
    //Create scales

    var xScale = d3.scaleLinear()
    .domain([8, d3.max(stateData, d => d.poverty)])
    .range([0, width]);

    var yScale = d3.scaleLinear()
    .domain([0, d3.max(stateData, d => d.healthcare)])
    .range([height, 0]);

    //Create axes
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    //Append axes to chart
    //Add X Axis

    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);
    //Add X Label
    svg.append("text")             
    .attr("transform",
          "translate(" + (width/2) + " ," + 
                         (height + margin.top + 40) + ")")
    .style("text-anchor", "middle")
    .text("In Poverty (%)")
    .attr("font-weight",500);
    
    //Add Y Axis

    chartGroup.append("g")
        .call(yAxis);
    
    //Add Y Label
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Lacks Health Care (%)") 
        .attr("font-weight",500);



    //Append datapoints to chart
    var node = chartGroup.selectAll("g")
        .data(stateData)
        .enter()
        .append("g");



        node.append("circle")
            .attr("class", "dot")
            .attr("cx", function(d) { return xScale(d.poverty); })
            .attr("cy", function(d) { return yScale(d.healthcare); })
            .attr("r", 15)
            .attr("fill", "#2E9AFE")
            .attr("opacity", ".7");

        node.append("text")
            .attr("text-anchor", "middle")
            .attr("x", function(d) { return xScale(d.poverty); })
            .attr("y", function(d) { return yScale(d.healthcare); })
            .attr("fill", "white")
            .attr("font-weight",600)
            .attr("font-size",12)
            .text(function(d) { return d.abbr;});

    //TOOL TIPS
    //-----------------------------------------------------------------------------
    //Add Tool tips when mousing over datapoints

    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function(d) {
        return (`<b>In Poverty(%)</b> : ${d.poverty}%<br><b> Lack Healthcare(%)</b> : ${d.healthcare}%`);
        });

        // Step 2: Create the tooltip in chartGroup.
        chartGroup.call(toolTip);

        // Step 3: Create "mouseover" event listener to display tooltip
        node.on("mouseover", function(d) {
            toolTip.show(d, this);
        })
        // Step 4: Create "mouseout" event listener to hide tooltip
            .on("mouseout", function(d) {
            toolTip.hide(d);
            });
        }).catch(function(error) {
        console.log(error);

        
        
    });

};

//When Browser Loads plot Scatter
makeScatter();

//If Window is resized, removes scatter and replaces with appropriate sized chart.

d3.select(window).on("resize", makeScatter);


