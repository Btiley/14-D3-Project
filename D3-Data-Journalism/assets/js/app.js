//Create SVG
//-------------------------------------------------------------------

//Set Margins & SVG size
var svgWidth = 750;
var svgHeight = 350;

var margin = {top: 10, right: 30, bottom: 30, left: 60}
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Append SVG to hold chart.
var svg = d3.select("#scatter")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  
//Shift svg by left and top margins.
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

//CREATE CHART
//-------------------------------------------------------------------

//Call data from csv
d3.csv("assets/data/data.csv", function(data) { 
    
    //Chart Parameterss

    var pdata = data["poverty"];
    var hData = data["healthcare"];
    var abbrs = data["abbr"];

    //Scatter Plot 
    //x = pData, y = hData


    //Customise data points
    //Labels = abbrs, colour = blue, size = large.


    //Customise Axes
    //x = 0-22
    //y = 0-26 


});
