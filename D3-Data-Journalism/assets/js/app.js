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
