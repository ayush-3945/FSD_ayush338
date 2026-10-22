const jobs = [

    {
        date: "20 May, 2023",
        company: "Amazon",
        title: "Senior UI/UX Designer",
        salary: "$250/hr",
        location: "San Francisco, CA",
        logo: "a",
        logoClass: "",
        tags: [
            "Full time",
            "Senior level",
            "Design",
            "Product design"
        ]
    },

    {
        date: "4 Feb, 2023",
        company: "Google",
        title: "Junior UI/UX Designer",
        salary: "$150/hr",
        location: "California, CA",
        logo: "G",
        logoClass: "google",
        tags: [
            "Full time",
            "Junior level",
            "Design",
            "Product design",
            "Creative Solutions"
        ]
    },

    {
        date: "29 Jan, 2023",
        company: "Dribbble",
        title: "Senior Motion Designer",
        salary: "$260/hr",
        location: "New York, NY",
        logo: "●",
        logoClass: "red",
        tags: [
            "Part time",
            "Senior level",
            "Full time",
            "Staff work"
        ]
    },

    {
        date: "18 Apr, 2023",
        company: "Twitter",
        title: "UX Designer",
        salary: "$120/hr",
        location: "California, CA",
        logo: "♥",
        logoClass: "blue",
        tags: [
            "Full time",
            "Mid level",
            "Design",
            "Product design"
        ]
    },

    {
        date: "2 Apr, 2023",
        company: "Adobe",
        title: "Graphic Designer",
        salary: "$300/hr",
        location: "New York, NY",
        logo: "●",
        logoClass: "red",
        tags: [
            "Part time",
            "Senior level"
        ]
    },

    {
        date: "18 Jan, 2023",
        company: "Apple",
        title: "Graphic Designer",
        salary: "$140/hr",
        location: "California, CA",
        logo: "●",
        logoClass: "",
        tags: [
            "Part time",
            "Design"
        ]
    }

];


const container = document.getElementById("jobContainer");


/* CREATE CARDS */

jobs.forEach((job, index) => {

    const card = document.createElement("div");

    card.className = `job-card card-${index + 1}`;

    card.innerHTML = `

        <div class="date">
            ${job.date}
        </div>

        <button
            class="bookmark"
            onclick="bookmark(this)">
            ♡
        </button>

        <div class="company">
            ${job.company}
        </div>

        <div class="job-title">
            ${job.title}
        </div>

        <div class="logo ${job.logoClass}">
            ${job.logo}
        </div>

        <div class="tags">

            ${job.tags.map(tag => `
                <span class="tag">
                    ${tag}
                </span>
            `).join("")}

        </div>

        <div class="bottom">

            <div>
                <div class="salary">
                    ${job.salary}
                </div>

                <div class="location">
                    ${job.location}
                </div>
            </div>

            <button
                class="details"
                onclick="showDetails(${index})">
                Details
            </button>

        </div>
    `;

    container.appendChild(card);

});


/* BOOKMARK */

function bookmark(button) {

    button.classList.toggle("active");

    if (button.classList.contains("active")) {
        button.innerHTML = "♥";
    } else {
        button.innerHTML = "♡";
    }

}


/* SHOW DETAILS */

function showDetails(index) {

    const job = jobs[index];

    document.getElementById("modalTitle").innerText =
        job.title;

    document.getElementById("modalCompany").innerText =
        "Company: " + job.company;

    document.getElementById("modalSalary").innerText =
        "Salary: " + job.salary;

    document.getElementById("modalLocation").innerText =
        "Location: " + job.location;

    document.getElementById("modal")
        .classList.add("show");
}


/* CLOSE MODAL */

function closeModal() {

    document.getElementById("modal")
        .classList.remove("show");

}


/* CLICK OUTSIDE MODAL */

window.addEventListener("click", function(event) {

    const modal = document.getElementById("modal");

    if (event.target === modal) {
        closeModal();
    }

});