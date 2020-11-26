
    // Create an array of each year's values
    var Y14 = Object.values(data[2014]);
    var Y15 = Object.values(data[2015]);
    var Y16 = Object.values(data[2016]);
    var Y17 = Object.values(data[2017]);
    var Y18 = Object.values(data[2018]);
    

    // Create an array of state labels
    var label14 = Object.keys(data[2014]);
    var label15 = Object.keys(data[2015]);
    var label16 = Object.keys(data[2016]);
    var label17 = Object.keys(data[2017]);
    var label18 = Object.keys(data[2018]);

    // Display the default plot
    function init() {
      var data = [{
        x: label14,
        y: Y14,
        type: "bar",
        marker: {
          color: 'rgb(237,145,59)',
          opacity: 0.5,
        }
      }];


      Plotly.newPlot("bar", data);
    }
  

    // On change to the DOM, call getData()
    d3.selectAll("#selDataset").on("change", getData);

    // Function called by DOM changes
    function getData() {
      var dropdownMenu = d3.select("#selDataset");
      // Assign the value of the dropdown menu option to a variable
      var dataset = dropdownMenu.property("value");
      // Initialize an empty array for the country's data
      var x = [];
      var y = [];

      if (dataset == '2014') {
          x = label14;
          y = Y14;
      }
      else if (dataset == '2015') {
          x = label15;
          y = Y15;
      }
      else if (dataset == '2016') {
          x = label16;
          y = Y16;
      }
      else if (dataset == '2017') {
          x = label17;
          y = Y17;
      }
      else if (dataset == '2018') {
          x = label18;
          y = Y18;
      }
        
      // Call function to update the chart
      Plotly.restyle("bar", "x", [x]);
      Plotly.restyle("bar", "y", [y]);
    }

    init();

