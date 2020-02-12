$(document).ready(function() {
    // Getting references to the name input and author container, as well as the table body
    var nameInput = $("#new-name");
    var departmentInput = $("#Department");
    var startingInput = $("#starting");
    var salaryInput = $("#salary");
    var genderInput = $("#Gender");
    var employeeList = $("tbody");
    var employeeContainer = $(".employee-container");
    // Adding event listeners to the form to create a new object, and the button to delete
    // an Author
    $(document).on("submit", "#employee-form", handleEmployeeFormSubmit);
    $(document).on("click", ".delete-employee", handleDeleteButtonPress);
  
    // Getting the initial list of Authors
    getEmployees();
  
    // A function to handle what happens when the form is submitted to create a new Author
    function handleEmployeeFormSubmit(event) {
      event.preventDefault();
      // Don't do anything if the name fields hasn't been filled out
      if (!nameInput.val().trim().trim()) {
        return;
      }
      // Calling the upsertAuthor function and passing in the value of the name input
      upsertEmployee({
        employee_name: nameInput
          .val()
          .trim()
        ,
        department: departmentInput
          .val()
          .trim()
        ,
        start_date: startingInput
          .val()
          .trim()
        ,
        salary: salaryInput
          .val()
          .trim()
        ,
        gender: genderInput
          .val()
          .trim(),
      });
    }
  
    // A function for creating an author. Calls getAuthors upon completion
    function upsertEmployee(employeeData) {
      $.post("/api/employees", employeeData)
        .then(getEmployees);
    }
  
    // Function for creating a new list row for authors
    function createEmployeeRow(employeeData) {
      var newTr = $("<tr>");
      newTr.data("employee", employeeData);
      newTr.append("<td>" + employeeData.employee_name + "</td>");
      newTr.append("<td>" + employeeData.department + "</td>");
      newTr.append("<td>" + employeeData.start_date + "</td>");
      newTr.append("<td>" + employeeData.salary + "</td>");
      newTr.append("<td>" + employeeData.gender + "</td>");
      return newTr;
    }
  
    // Function for retrieving authors and getting them ready to be rendered to the page
    function getEmployees() {
      $.get("/api/employees", function(data) {
        var rowsToAdd = [];
        for (var i = 0; i < data.length; i++) {
          rowsToAdd.push(createEmployeeRow(data[i]));
        }
        renderEmployeeList(rowsToAdd);
        nameInput.val("");
        departmentInput.val("");
        startingInput.val("");
        salaryInput.val("");
        genderInput.val("");
      });
    }
  
    // A function for rendering the list of authors to the page
    function renderEmployeeList(rows) {
      employeeList.children().not(":last").remove();
      employeeContainer.children(".alert").remove();
      if (rows.length) {
        console.log(rows);
        employeeList.prepend(rows);
      }
      else {
        renderEmpty();
      }
    }
  
    // Function for handling what to render when there are no authors
    function renderEmpty() {
      var alertDiv = $("<div>");
      alertDiv.addClass("alert alert-danger");
      alertDiv.text("You must create an Employee before you can create a Post.");
      employeeContainer.append(alertDiv);
    }
  
    // Function for handling what happens when the delete button is pressed
    function handleDeleteButtonPress() {
      var listItemData = $(this).parent("td").parent("tr").data("employee");
      var id = listItemData.id;
      $.ajax({
        method: "DELETE",
        url: "/api/employees/" + id
      })
        .then(getEmployees);
    }
  });