//pull data from data.js
const dataSets = dataSet;

var tbody = d3.select("tbody");


function buildTable(netflix_data) {
  tbody.html(""); //clear data

  //look for objects in data and append rows
  netflix_data.forEach(dataRow => {
    let row = tbody.append("tr");

    Object.values(dataRow).forEach((val) => {
      var cell = row.append("td");
      cell.text(val);
  });

  });

}

//track all filters
let filters= {};

//update those filters
function filterUpdate() {
  let element = d3.select(this);
  let elementValue = element.property("value");
  let elementId = element.attr("id");


  if (elementValue) {
    filters[elementId] = elementValue;
  }
  else {
    delete filters[elementId];
  }

    filterTable();
}

function filterTable() {
  let filteredData = dataSets;


  Object.entries(filters).forEach(([key,value]) => {
    filteredData = filteredData.filter(row => row[key] === value);
  }
  );

  buildTable(filteredData);
}

d3.selectAll("input").on("change", filterUpdate);

buildTable(dataSets);




