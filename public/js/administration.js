$(document).ready(function() {

  var employeeContainer = $(".employee-container");
  
  $(document).on("click", "button.delete", handleEmployeeDelete);
  $(document).on("click", "button.edit", handleEmployeeEdit);

  var employees;

  var url = window.location.search;
  var departmentId;
  if (url.indexOf("?department_id=") !== -1) {
    departmentId = url.split("=")[1];
    getPosts(departmentId);
  }
  else {
    getEmployees();
  }


  function getEmployees(department) {
    departmentId = department || "";
    if (departmentId) {
      departmentId = "/?department_id=" + departmentId;
    }
    $.get("/api/employees" + departmentId, function(data) {
      console.log("employees", data);
      employees = data;
      if (!employees || !employees.length) {
        displayEmpty(department);
      }
      else {
        initializeRows();
      }
    });
  }

   
   function deletePost(id) {
     $.ajax({
       method: "DELETE",
       url: "/api/posts/" + id
     })
       .then(function() {
         getPosts(postCategorySelect.val());
       });
   }

  
  function initializeRows() {
    employeeContainer.empty();
    var postsToAdd = [];
    for (var i = 0; i < posts.length; i++) {
      employeesToAdd.push(createNewRow(posts[i]));
    }
    employeeContainer.append(postsToAdd);
  }

  function createNewRow(post) {
    var formattedDate = new Date(post.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newEmployeeCard = $("<div>");
    newEmployeeCard.addClass("card");
    var newEmployeeCardHeading = $("<div>");
    newEMployeeCardHeading.addClass("card-header");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-info");
    var newEmployeeName = $("<h2>");
    var newEmployeeDate = $("<small>");
    var newEmployeeCardBody = $("<div>");
    newEmployeeCardBody.addClass("card-body");
    var newEmployeeGender = $("<p>");
    newEmployeeName.text(employee.name + " ");
    newEmployeeGender.text(post.gender + " ");
    newEmployeeDate.text(formattedDate);
    newEmployeeTitle.append(newPostDate);
    newEmployeeCardHeading.append(deleteBtn);
    newEmployeeCardHeading.append(editBtn);
    newEmployeeCardHeading.append(newPostName);
    newPostCardGender.append(newPostGender);
    newPostCard.append(newEmployeeCardHeading);
    newPostCard.append(newEmployeeCardBody);
    newPostCard.data("employee", employee);
    return newEmployeeCard;
  }

  function handleEmployeeDelete() {
    var currentEmployee = $(this)
      .parent()
      .parent()
      .data("employee");
    deletePost(currentEmployee.id);
  }

  function handleEmployeeEdit() {
    var currentEmployee = $(this)
      .parent()
      .parent()
      .data("employee");
    window.location.href = "/employees?post_id=" + currentEmployee.id;
  }

  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for Department #" + id;
    }
    employeeContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No posts yet" + partial + ", navigate <a href='/cms" + query +
    "'>here</a> in order to get started.");
    employeeContainer.append(messageH2);
  }

});
