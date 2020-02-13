$(document).ready(function() {
    var nameInput = $("#new-name");
    var departmentInput = $("#Department");
    var startingInput = $("#starting");
    var salaryInput = $("#salary");
    var genderInput = $("#Gender");
    var employeeList = $("tbody");
    var employeeContainer = $(".employee-container");
   
    $(document).on("submit", "#employee-form", handleEmployeeFormSubmit);
    $(document).on("click", ".delete-employee", handleDeleteButtonPress);
  
    getEmployees();
  
    function handleEmployeeFormSubmit(event) {
      event.preventDefault();

      if (!nameInput.val().trim().trim()) {
        return;
      };

       if (!departmentInput.val().trim().trim()) {
         return;
       };

       if (!startingInput.val().trim().trim()) {
         return;
       };

       if (!salaryInput.val().trim().trim()) {
         return;
       };

       if (!genderInput.val().trim().trim()) {
         return;
       };
      
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
    };
  
    function upsertEmployee(employeeData) {
      $.post("/api/employees", employeeData)
        .then(getEmployees);
    };
  
    function createEmployeeRow(employeeData) {
      var newTr = $("<tr>");
      newTr.data("employee", employeeData);
      newTr.append("<td colspan='2'>" + employeeData.employee_name + "</td>");
      newTr.append("<td colspan='2'>" + employeeData.department + "</td>");
      newTr.append("<td colspan='1'>" + employeeData.start_date + "</td>");
      newTr.append("<td colspan='1'>" + employeeData.salary + "</td>");
      newTr.append("<td colspan='1'>" + employeeData.gender + "</td>");
      return newTr;
    };
  
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
    };
  
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
    };
  
    function renderEmpty() {
      var alertDiv = $("<div>");
      alertDiv.addClass("alert alert-danger");
      alertDiv.text("You must create an Employee before you can create a Post.");
      employeeContainer.append(alertDiv);
    };
  
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