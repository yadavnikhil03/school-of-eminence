// Modal JavaScript

// DOM Elements
const modal = document.getElementById("modal")
const modalClose = document.querySelector(".modal-close")
const modalTitle = document.getElementById("modalTitle")
const modalBody = document.getElementById("modalBody")

// Achievement items
const achievementItems = document.querySelectorAll(".achievement-item")
const eventCards = document.querySelectorAll(".event-card")

// Show modal function
function showModal(title, content) {
  modalTitle.textContent = title
  modalBody.innerHTML = content
  modal.classList.add("show")
  document.body.style.overflow = "hidden" // Prevent scrolling when modal is open
}

// Close modal function
function closeModal() {
  modal.classList.remove("show")
  document.body.style.overflow = "" // Re-enable scrolling
}

// Event listeners
if (modalClose) {
  modalClose.addEventListener("click", closeModal)
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();\
    });
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeModal();
    }
});

// Achievement item click events
achievementItems.forEach((item) => {
  item.addEventListener("click", () => {
    const title = item.querySelector("h3").textContent
    const achievementData = item.getAttribute("data-achievement")

    let content = ""

    // Generate content based on achievement type
    switch (achievementData) {
      case "Academic Excellence":
        content = `
                    <div class="modal-achievement">
                        <p>Our students have consistently achieved a 100% pass rate for 5 consecutive years, with over 75% scoring distinctions in their examinations.</p>
                        <ul>
                            <li>15 students ranked in the top 100 in state examinations</li>
                            <li>Average score of 92% in Mathematics and Science</li>
                            <li>100% college placement rate for graduating students</li>
                            <li>5 students received prestigious national scholarships</li>
                        </ul>
                        <p>This remarkable achievement is a testament to our dedicated faculty and the hard work of our students.</p>
                    </div>
                `
        break

      case "Sports Champions":
        content = `
                    <div class="modal-achievement">
                        <p>Our school teams have excelled in various sports competitions at the district and state levels.</p>
                        <ul>
                            <li>District Cricket Champions for 3 consecutive years</li>
                            <li>State Basketball Runners-up in the Under-16 category</li>
                            <li>Gold medals in Athletics at the Inter-School Sports Meet</li>
                            <li>Best Sports School Award by the District Sports Authority</li>
                        </ul>
                        <p>Our state-of-the-art sports facilities and professional coaching have contributed significantly to these achievements.</p>
                    </div>
                `
        break

      case "Science Olympiad":
        content = `
                    <div class="modal-achievement">
                        <p>Our students have shown exceptional performance in various Science Olympiads at the national level.</p>
                        <ul>
                            <li>5 Gold medals in the National Science Olympiad</li>
                            <li>3 students selected for the International Science Olympiad</li>
                            <li>Best School Award in the Regional Science Exhibition</li>
                            <li>Special recognition for innovative science projects</li>
                        </ul>
                        <p>Our focus on practical learning and scientific inquiry has fostered a spirit of innovation among our students.</p>
                    </div>
                `
        break

      case "Cultural Excellence":
        content = `
                    <div class="modal-achievement">
                        <p>Our students have showcased their talents in various cultural competitions and events.</p>
                        <ul>
                            <li>First prize in the State Level Dance Competition</li>
                            <li>Winners of the Inter-School Music Festival</li>
                            <li>Recognition in the National Youth Festival for performing arts</li>
                            <li>Best Drama Performance Award at the Cultural Fest</li>
                        </ul>
                        <p>We believe in nurturing the artistic talents of our students alongside academic excellence.</p>
                    </div>
                `
        break

      default:
        content = "<p>Details not available.</p>"
    }

    showModal(title, content)
  })
})

// Event card click events
eventCards.forEach((card) => {
  card.addEventListener("click", () => {
    const title = card.querySelector("h3").textContent
    const date = card.querySelector(".day").textContent + " " + card.querySelector(".month").textContent
    const time = card.querySelector(".event-time").textContent
    const location = card.querySelector(".event-location").textContent
    const description = card.querySelector(".event-description").textContent
    const eventData = card.getAttribute("data-event")

    let additionalInfo = ""

    // Generate additional info based on event type
    switch (eventData) {
      case "Annual Day Celebration":
        additionalInfo = `
                    <h4>Event Schedule:</h4>
                    <ul>
                        <li>10:00 AM - Opening Ceremony</li>
                        <li>10:30 AM - Cultural Performances</li>
                        <li>12:30 PM - Lunch Break</li>
                        <li>1:30 PM - Prize Distribution</li>
                        <li>2:30 PM - Special Performances</li>
                    </ul>
                    <p><strong>Chief Guest:</strong> Dr. Rajesh Kumar, Education Minister</p>
                    <p><strong>Dress Code:</strong> School Uniform</p>
                    <p><strong>Note:</strong> Parents are requested to be seated by 9:45 AM.</p>
                `
        break

      case "Science Exhibition":
        additionalInfo = `
                    <h4>Exhibition Categories:</h4>
                    <ul>
                        <li>Renewable Energy Solutions</li>
                        <li>Environmental Conservation</li>
                        <li>Innovative Technology</li>
                        <li>Health and Nutrition</li>
                    </ul>
                    <p><strong>Judges:</strong> Panel of scientists from local universities</p>
                    <p><strong>Prizes:</strong> Certificates and trophies for winners in each category</p>
                    <p><strong>Note:</strong> Open to public. Entry is free.</p>
                `
        break

      case "Parent-Teacher Meeting":
        additionalInfo = `
                    <h4>Important Information:</h4>
                    <ul>
                        <li>Please arrive 10 minutes before your scheduled time</li>
                        <li>Bring your child's report card and notebook</li>
                        <li>Each session will be approximately 15 minutes</li>
                        <li>Discuss any concerns or suggestions with the teachers</li>
                    </ul>
                    <p><strong>Schedule:</strong> Class-wise time slots will be shared via email</p>
                    <p><strong>Note:</strong> Students are encouraged to accompany their parents.</p>
                `
        break

      case "Sports Day":
        additionalInfo = `
                    <h4>Event Schedule:</h4>
                    <ul>
                        <li>8:00 AM - March Past</li>
                        <li>8:30 AM - Track Events</li>
                        <li>10:30 AM - Field Events</li>
                        <li>12:30 PM - Lunch Break</li>
                        <li>1:30 PM - Team Sports Finals</li>
                        <li>3:30 PM - Prize Distribution</li>
                    </ul>
                    <p><strong>Chief Guest:</strong> Mr. Sunil Sharma, Former National Athlete</p>
                    <p><strong>Dress Code:</strong> Sports Uniform</p>
                    <p><strong>Note:</strong> Students should bring water bottles and caps.</p>
                `
        break

      default:
        additionalInfo = "<p>Additional details will be shared soon.</p>"
    }

    const content = `
            <div class="modal-event">
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Time:</strong> ${time}</p>
                <p><strong>Location:</strong> ${location}</p>
                <p><strong>Description:</strong> ${description}</p>
                <div class="modal-event-details">
                    ${additionalInfo}
                </div>
                <div class="modal-event-actions">
                    <button class="btn btn-primary" onclick="alert('Reminder set for this event!')">Set Reminder</button>
                    <button class="btn btn-secondary" onclick="window.print()">Print Details</button>
                </div>
            </div>
        `

    showModal(title, content)
  })
})
