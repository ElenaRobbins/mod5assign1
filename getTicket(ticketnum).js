function getTicket() {
  // Get the ticket number the user entered
  var ticketNumber = document.getElementById('ticketNumberInput').value.trim();

  // Check if user entered a ticket number
  if (ticketNumber === "") {
    alert("Please enter a ticket number");
    return; // Stop if no ticket number
  }

  // Create a request to the server
  var xhr = new XMLHttpRequest();

  // Build the URL with the ticket number
  var url = 'https://jscript.rdm/ticketrequest.asp/?ticketnumber=' + encodeURIComponent(ticketNumber);

  // Set up the request
  xhr.open('GET', url, true);

  // What to do when response arrives
  xhr.onload = function() {
    if (xhr.status === 200 && xhr.responseXML) {
      var xml = xhr.responseXML;

      // Find data in the XML and put it on the page
      document.getElementById('requestDate').innerText = 
        xml.getElementsByTagName('requestDate')[0].textContent;

      document.getElementById('employeeID').innerText = 
        xml.getElementsByTagName('employeeID')[0].textContent;

      document.getElementById('name').innerText = 
        xml.getElementsByTagName('firstName')[0].textContent + ' ' +
        xml.getElementsByTagName('lastName')[0].textContent;

      document.getElementById('description').innerText = 
        xml.getElementsByTagName('problemDescription')[0].textContent;

      document.getElementById('status').innerText = 
        xml.getElementsByTagName('status')[0].textContent;

      document.getElementById('response').innerText = 
        xml.getElementsByTagName('response')[0].textContent;
    } else {
      alert("Could not find that ticket or error occurred");
    }
  };

  // Handle errors
  xhr.onerror = function() {
    alert("Request failed");
  };

  // Send the request
  xhr.send();
}