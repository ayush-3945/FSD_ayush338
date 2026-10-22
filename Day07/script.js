const container = document.getElementById("jobContainer");
const searchInput = document.getElementById("searchInput");
const jobCount = document.getElementById("jobCount");
const filterButtons = document.querySelectorAll(".filter-btn");

let currentFilter = "all";
let currentSearch = "";

function renderJobs() {
    container.innerHTML = "";

    const filtered = jobs.filter((job) => {
        const matchesFilter =
            currentFilter === "all" || job.tags.includes(currentFilter);
        const matchesSearch =
            job.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
            job.company.toLowerCase().includes(currentSearch.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    jobCount.innerText = filtered.length;

    if (filtered.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 40px;">No jobs match your search.</p>`;
        return;
    }

    filtered.forEach((job, index) => {
        const card = document.createElement("div");
        card.className = `job-card card-${index + 1}`;
        card.innerHTML = `
            <div class="date">${job.date}</div>
            <button class="bookmark" onclick="bookmark(this)">?</button>
            <div class="company">${job.company}</div>
            <div class="job-title">${job.title}</div>
            <div class="logo ${job.logoClass}">${job.logo}</div>
            <div class="tags">
                ${job.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
            </div>
            <div class="bottom">
                <div>
                    <div class="salary">${job.salary}</div>
                    <div class="location">${job.location}</div>
                </div>
                <button class="details" onclick="showDetails(${jobs.indexOf(job)})">Details</button>
            </div>
        `;
        container.appendChild(card);
    });
}

searchInput.addEventListener("input", (e) => {
    currentSearch = e.target.value.trim();
    renderJobs();
});

filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.getAttribute("data-filter");
        renderJobs();
    });
});

function bookmark(button) {
    button.classList.toggle("active");
    button.innerHTML = button.classList.contains("active") ? "?" : "?";
}

function showDetails(index) {
    const job = jobs[index];
    document.getElementById("modalTitle").innerText = job.title;
    document.getElementById("modalCompany").innerText = "Company: " + job.company;
    document.getElementById("modalSalary").innerText = "Salary: " + job.salary;
    document.getElementById("modalLocation").innerText = "Location: " + job.location;
    document.getElementById("modal").classList.add("show");
}

function closeModal() {
    document.getElementById("modal").classList.remove("show");
}

window.addEventListener("click", function(event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        closeModal();
    }
});

renderJobs();
