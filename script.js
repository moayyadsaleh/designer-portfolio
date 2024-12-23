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

const messages = [
  {
    user: "person1",
    text: "Hi, what is your scope of work?",
    profileImage:
      "https://www.pngitem.com/pimgs/m/286-2868690_thumb-image-smiling-businessman-png-transparent-png.png",
  },
  {
    user: "person2",
    text: "Hi, I specialize in instructional design, focusing on communication, productivity, and tech tools.",
    profileImage: "Moayyad's Pic.png",
  },
  {
    user: "person1",
    text: "What else?",
    profileImage:
      "https://www.pngitem.com/pimgs/m/286-2868690_thumb-image-smiling-businessman-png-transparent-png.png",
  },
  {
    user: "person2",
    text: "I also create educational apps and tech solutions that help instructors improve their teaching experience.",
    profileImage: "Moayyad's Pic.png",
  },
];

let currentMessageIndex = 0;
const chatBox = document.getElementById("chat-box");

function typeMessage(message, callback) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", message.user);

  // Create image element and append to messageElement
  const imgElement = document.createElement("img");
  imgElement.src = message.profileImage;
  imgElement.alt = "Profile Image";
  imgElement.classList.add("profile-img"); // Optional: Add a class for styling
  messageElement.appendChild(imgElement);

  // Create a span to hold the text, initially empty for typing effect
  const textElement = document.createElement("span");
  messageElement.appendChild(textElement);

  let index = 0;
  const typingSpeed = 50; // Adjusted speed for faster typing
  const caretElement = document.createElement("span"); // This will simulate the typing cursor
  caretElement.classList.add("caret");
  messageElement.appendChild(caretElement);

  let typingInterval = setInterval(() => {
    textElement.innerHTML =
      message.text.substring(0, index) + "<span class='caret'>|</span>"; // Adds a blinking caret
    index++;
    if (index > message.text.length) {
      clearInterval(typingInterval);
      caretElement.style.visibility = "hidden"; // Hide caret (in case of visibility control)
      setTimeout(() => {
        messageElement.removeChild(caretElement); // Remove caret after a short delay
        callback(); // Call the callback when typing is complete
      }, 200); // Small delay before removing the caret
    }
  }, typingSpeed);

  chatBox.appendChild(messageElement);
}

function startChat() {
  chatBox.innerHTML = ""; // Clear the chat box before starting
  currentMessageIndex = 0; // Reset the message index

  function showNextMessage() {
    if (currentMessageIndex < messages.length) {
      typeMessage(messages[currentMessageIndex], () => {
        currentMessageIndex++;
        setTimeout(showNextMessage, 1000); // Slight pause between messages for realism
      });
    }
  }

  showNextMessage(); // Start the typing effect
}

// Start the typing effect
startChat();
