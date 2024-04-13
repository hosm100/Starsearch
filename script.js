$(document).ready(function() {
  // Load the data from data.json
  $.getJSON("data.json", function(data) {
    var items = [];
    // Extract FullNames from the data
    data.forEach(function(group) {
      group.forEach(function(item) {
        items.push(item.FullName);
      });
    });
    // Remove duplicate FullNames
    var uniqueItems = [...new Set(items)];
    // Create the datalist options
    uniqueItems.forEach(function(item) {
      $("#name-list").append("<option value='" + item + "'>");
    });
  });

  // Handle form submission
  $("#search-form").submit(function(event) {
    event.preventDefault();
    var input = $("#search-input").val();
    $.getJSON("data.json", function(data) {
      var results = [];
      data.forEach(function(group) {
        group.forEach(function(item) {
          if (item.FullName.toLowerCase() === input.toLowerCase()) {
            results.push(item);
          }
        });
      });
      displayResults(results);
    });
  });

  // Display the search results
  function displayResults(results) {
    var output = "";
    if (results.length === 0) {
      output = "<p>No results found.</p>";
    } else {
      results.forEach(function(result) {
        output += "<p><strong>FullName:</strong> " + result.FullName + "</p>";
        output += "<p><strong>ObjectName:</strong> " + result.ObjectName + "</p>";
        output += "<p><strong>Type:</strong> " + result.Type + "</p>";
        output += "<p><strong>Description:</strong> " + result.Description + "</p>";
        output += "<p><strong>Value:</strong> " + result.Value + "</p>";
        output += "<p><strong>Volume:</strong> " + result.Volume + "</p>";
        output += "<hr>";
      });
    }
    $("#search-result").html(output);
  }

});