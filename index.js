
// document.addEventListener("DOMContentLoaded", function () {
//   // ... (previous JavaScript code) ...

//   // Event listener for the "+" button
//   document.getElementById("addCourseButton").addEventListener("click", function () {
//       addCourseRow();
       
//   });

// });



function addCourseRow() {
  var form = document.getElementById("cgpaForm");

  // Create a new row
  var newRow = document.createElement("div");
  newRow.className = "form-row";

  // Add input for course name
  var courseInput = document.createElement("input");
  courseInput.type = "text";
  courseInput.name = "course[]";
  courseInput.placeholder = "POS 108";
  newRow.appendChild(courseInput);

  // Add select for course unit
  var unitSelect = createSelect("unit[]", ["Unit", "1", "2", "3", "4"]);
  newRow.appendChild(unitSelect);

  // Add select for grade
  var gradeSelect = createSelect("grade[]", ["Grade", "A", "B", "C", "D", "E", "F"]);
  newRow.appendChild(gradeSelect);

  // Add hidden input for grade value
  var gradeValueInput = document.createElement("input");
  gradeValueInput.type = "hidden";
  gradeValueInput.name = "gradeValue[]";
  newRow.appendChild(gradeValueInput);

  // Add delete button
  var deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function () {
    deleteRow(deleteButton);
  });
  newRow.appendChild(deleteButton);
  deleteButton.style.borderRadius = "20px";

   

  // Append the new row to the form
  form.insertBefore(newRow, document.getElementById("addCourseButton"));
}

function createSelect(name, options) {
  var select = document.createElement("select");
  select.name = name;

  for (var i = 0; i < options.length; i++) {
    var option = document.createElement("option");
    option.value = options[i];
    option.textContent = options[i];
    select.appendChild(option);
  }

  return select;
}

function deleteRow(button) {
  // Get the parent row and remove it
  var row = button.parentNode;
  row.parentNode.removeChild(row);
}

// function evaluateCGPAGrade(cgpa) {
//   if (cgpa >= 4.50 && cgpa <= 5.00) {
//     return "First Class";
//   } else if (cgpa >= 3.50 && cgpa < 4.50) {
//     return "2nd Class Upper";
//   } else if (cgpa >= 2.40 && cgpa < 3.50) {
//     return "2nd Class Lower";
//   } else if (cgpa >= 1.50 && cgpa < 2.40) {
//     return "3rd Class";
//   } else if (cgpa >= 1.0 && cgpa < 1.50) {
//     return "Pass";
//   } else {
//     return "Unclassified";
//   }
// }

function calculateCGPA() {
  var form = document.getElementById("cgpaForm");
  var formData = new FormData(form);
  var totalQualityPoints = 0;
  var totalCreditUnits = 0;

  // Loop through each row in the form
  formData.getAll("grade[]").forEach(function (grade, index) {
    // Assign numerical values to grades
    var gradeValue = 0;

    switch (grade) {
      case "A":
        gradeValue = 5;
        break;
      case "B":
        gradeValue = 4;
        break;
      case "C":
        gradeValue = 3;
        break;
      case "D":
        gradeValue = 2;
        break;
      case "E":
        gradeValue = 1;
        break;
      // F will remain as 0
    }

    // Update hidden input for grade value
    formData.set("gradeValue[]", gradeValue);

    // Calculate Total Quality Points for each course
    var courseTQP = gradeValue * parseInt(formData.getAll("unit[]")[index]);

    // Add to the total Quality Points and update Total Credit Units
    totalQualityPoints += courseTQP;
    totalCreditUnits += parseInt(formData.getAll("unit[]")[index]);
  });

  // Calculate CGPA
  var cgpa = totalQualityPoints / totalCreditUnits;

  // Display result
 
  if (
    formData.getAll("course[]").some((course) => course === "") ||
    formData.getAll("unit[]").some((unit) => unit === "Unit") ||
    formData.getAll("grade[]").some((grade) => grade === "Grade") ||
    isNaN(cgpa)
  ) {
    alert("Fill all the Input Fields");
  } else {
    var resultElement = document.getElementById("result");
    resultElement.innerHTML = "Your CGPA is: " + cgpa.toFixed(2);

    var gradeMessage = document.getElementById("gradeMessage");
    if (cgpa >= 4.5) {
      gradeMessage.innerHTML = "Grade Message: First Class";
    } else if (cgpa >= 3.5) {
      gradeMessage.innerHTML = "Grade Message: 2nd Class Upper";
    } else if (cgpa >= 2.4) {
      gradeMessage.innerHTML = "Grade Message: 2nd Class Lower";
    } else if (cgpa >= 1.5) {
      gradeMessage.innerHTML = "Grade Message: 3rd Class";
    } else if (cgpa >= 1.0) {
      gradeMessage.innerHTML = "Grade Message: Pass";
    }
  }
  // if(courseForm.value === "" || isNaN(courseForm.value)){
  //    alert('Fill all the Input Field')
  // }
  // else{
  //   var resultElement = document.getElementById("result");
  //   resultElement.innerHTML = "Your CGPA is: " + cgpa.toFixed(2);
  //    var gradeMessage = "Your Grade is: " + evaluateCGPAGrade(cgpa);
  //  resultElement.innerHTML = cgpaMessage + gradeMessage;
  // }
}