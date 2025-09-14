const courses = [
  { code: "WDD130", name: "Web Fundamentals", credits: 3, type: "WDD", completed: true },
  { code: "WDD131", name: "Dynamic Web Fundamentals", credits: 3, type: "WDD", completed: true },
  { code: "WDD231", name: "Web Frontend Development I", credits: 3, type: "WDD", completed: false },
  { code: "CSE110", name: "Programming Building Blocks", credits: 2, type: "CSE", completed: true },
  { code: "CSE111", name: "Programming with Functions", credits: 2, type: "CSE", completed: true },
  { code: "CSE210", name: "Programming with Classes", credits: 2, type: "CSE", completed: true }
];

const courseGrid = document.getElementById("courseGrid");
const creditTotalSpan = document.getElementById("creditTotal");
const filterButtons = document.querySelectorAll(".filters button");

// Function to render courses
function displayCourses(list) {
  courseGrid.innerHTML = "";

  let totalCredits = 0;

  list.forEach(course => {
    const card = document.createElement("div");
    card.classList.add("course-card");
    if (course.completed) {
      card.classList.add("completed");
    }

    card.innerHTML = `
      <h3>${course.code}</h3>
      <p>${course.name}</p>
      <p><strong>Credits:</strong> ${course.credits}</p>
      <p><strong>Type:</strong> ${course.type}</p>
      <p><strong>Status:</strong> ${course.completed ? "Completed ✅" : "In Progress ❌"}</p>
    `;

    courseGrid.appendChild(card);
    totalCredits += course.credits;
  });

  creditTotalSpan.textContent = totalCredits;
}

// Initial display (all courses)
displayCourses(courses);

// Filter logic
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    // remove active from all, add to clicked
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    if (filter === "ALL") {
      displayCourses(courses);
    } else {
      const filtered = courses.filter(c => c.type === filter);
      displayCourses(filtered);
    }
  });
});