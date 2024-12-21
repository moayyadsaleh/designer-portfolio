const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  themeToggle.innerHTML = body.classList.contains("dark-mode")
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
});

document.querySelectorAll(".show-more-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const moreText = button.previousElementSibling;
    moreText.classList.toggle("hidden");
    button.textContent = moreText.classList.contains("hidden")
      ? "Show More"
      : "Show Less";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const textContainer = document.getElementById("text-container");

  const skills = [
    "Simplify. Secure. Deliver.",
    "Innovate. Build. Transform.",
    "Design. Develop. Impact.",
  ];

  let index = 0; // Current skill index
  let charIndex = 0; // Current character index
  const typingSpeed = 100; // Typing speed in milliseconds
  const erasingSpeed = 50; // Erasing speed in milliseconds
  const pauseBetweenSkills = 1500; // Pause before switching skills

  const type = () => {
    if (charIndex < skills[index].length) {
      textContainer.textContent += skills[index].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(erase, pauseBetweenSkills);
    }
  };

  const erase = () => {
    if (charIndex > 0) {
      textContainer.textContent = skills[index].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingSpeed);
    } else {
      index = (index + 1) % skills.length; // Move to the next skill
      setTimeout(type, typingSpeed);
    }
  };

  // Start typing animation
  type();
});
document
  .getElementById("contactForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    const form = event.target;
    const formData = new FormData(form);
    const formStatus = document.getElementById("formStatus");

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        formStatus.textContent = "Thank you! Your message has been sent.";
        formStatus.className = "success";
        form.reset(); // Clear the form
      } else {
        throw new Error("An error occurred while submitting the form.");
      }
    } catch (error) {
      formStatus.textContent =
        "Oops! There was a problem submitting your form.";
      formStatus.className = "error";
    }
  });
window.addEventListener("scroll", function () {
  const parallaxElements = document.querySelectorAll(".parallax");
  parallaxElements.forEach((element) => {
    const offset = window.scrollY;
    element.style.transform = `translateY(${offset * 0.5}px)`;
  });
});
