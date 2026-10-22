let students = [];

let editIndex = -1;


// Add Student
function addStudent() {

    let name = document.getElementById("studentName").value;
    let roll = document.getElementById("rollNo").value;
    let course = document.getElementById("course").value;
    let marks = document.getElementById("marks").value;


    // Validation
    if (name === "" || roll === "" ||
        course === "" || marks === "") {

        alert("Please fill all fields.");

        return;
    }


    marks = Number(marks);


    if (marks < 0 || marks > 100) {

        alert("Marks should be between 0 and 100.");

        return;
    }


    // Update Student
    if (editIndex !== -1) {

        students[editIndex] = {
            name: name,
            roll: roll,
            course: course,
            marks: marks
        };

        editIndex = -1;

        document.getElementById("addButton")
            .innerText = "Add Student";
    }


    // Add New Student
    else {

        let student = {
            name: name,
            roll: roll,
            course: course,
            marks: marks
        };

        students.push(student);
    }


    clearForm();

    displayStudents();
}


// Grade
function getGrade(marks) {

    if (marks >= 90) {
        return "A";
    }

    else if (marks >= 75) {
        return "B";
    }

    else if (marks >= 60) {
        return "C";
    }

    else {
        return "D";
    }
}


// Display Students
function displayStudents() {

    let table =
        document.getElementById("studentTable");

    table.innerHTML = "";


    let search =
        document.getElementById("search")
        .value
        .toLowerCase();


    for (let i = 0; i < students.length; i++) {

        let student = students[i];


        // Search
        if (
            student.name.toLowerCase().includes(search) ||
            student.roll.toLowerCase().includes(search)
        ) {

            let grade = getGrade(student.marks);


            let row = document.createElement("tr");


            row.innerHTML = `
            
                <td>${student.roll}</td>

                <td>${student.name}</td>

                <td>${student.course}</td>

                <td>${student.marks}</td>

                <td>${grade}</td>

                <td>

                    <button
                        class="edit-btn"
                        onclick="editStudent(${i})">
                        Edit
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteStudent(${i})">
                        Delete
                    </button>

                </td>
            
            `;


            table.appendChild(row);
        }
    }


    updateStatistics();
}


// Delete Student
function deleteStudent(index) {

    students.splice(index, 1);

    displayStudents();
}


// Edit Student
function editStudent(index) {

    let student = students[index];


    document.getElementById("studentName")
        .value = student.name;

    document.getElementById("rollNo")
        .value = student.roll;

    document.getElementById("course")
        .value = student.course;

    document.getElementById("marks")
        .value = student.marks;


    editIndex = index;


    document.getElementById("addButton")
        .innerText = "Update Student";
}


// Clear Form
function clearForm() {

    document.getElementById("studentName")
        .value = "";

    document.getElementById("rollNo")
        .value = "";

    document.getElementById("course")
        .value = "";

    document.getElementById("marks")
        .value = "";
}


// Statistics
function updateStatistics() {

    document.getElementById("total")
        .innerText = students.length;


    if (students.length === 0) {

        document.getElementById("average")
            .innerText = "0";

        return;
    }


    let totalMarks = 0;


    for (let i = 0; i < students.length; i++) {

        totalMarks += students[i].marks;
    }


    let average =
        totalMarks / students.length;


    document.getElementById("average")
        .innerText = average.toFixed(2);
}