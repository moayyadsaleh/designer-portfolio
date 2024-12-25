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

  // Use only one message from the skills array
  const skills = ["Simplify. Secure. Deliver."];

  let index = 0; // Current skill index
  let charIndex = 0; // Current character index
  const typingSpeed = 100; // Typing speed in milliseconds

  const type = () => {
    if (charIndex < skills[index].length) {
      textContainer.textContent += skills[index].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingSpeed);
    }
  };

  // Start typing animation for the single message
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
    text: "Hey Moayyad, I heard you’re into tech. What’s your focus?",
    profileImage:
      "https://www.pngitem.com/pimgs/m/286-2868690_thumb-image-smiling-businessman-png-transparent-png.png",
  },
  {
    user: "person2",
    text: "I solve problems through tech by combining instructional design, programming, and creative solutions.",
    profileImage: "Moayyad's Pic.png",
  },
  {
    user: "person2",
    text: "I build apps, create interactive learning tools, and make education smarter with technology.",
    profileImage: "Moayyad's Pic.png",
  },
];

let currentMessageIndex = 0;
const chatBox = document.getElementById("chat-box");

function typeMessage(message, callback) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", message.user);

  const imgElement = document.createElement("img");
  imgElement.src = message.profileImage;
  imgElement.alt = "Profile Image";
  imgElement.classList.add("profile-img");
  messageElement.appendChild(imgElement);

  const textElement = document.createElement("span");
  messageElement.appendChild(textElement);

  const timestamp = document.createElement("span");
  timestamp.classList.add("timestamp");
  const now = new Date();
  timestamp.textContent = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  messageElement.appendChild(timestamp);

  let index = 0;
  const typingSpeed = 100; // Slower typing speed (100ms per character)

  let typingInterval = setInterval(() => {
    textElement.innerHTML =
      message.text.substring(0, index) + "<span class='caret'>|</span>";
    index++;
    if (index > message.text.length) {
      clearInterval(typingInterval);
      setTimeout(() => {
        messageElement.querySelector(".caret").style.visibility = "hidden";
        callback();
      }, 200);
    }
  }, typingSpeed);

  chatBox.appendChild(messageElement);
  chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: "smooth" });
}

function showTypingIndicator() {
  const typingIndicator = document.createElement("div");
  typingIndicator.classList.add("typing-indicator");
  typingIndicator.innerHTML = "<span></span><span></span><span></span>";
  chatBox.appendChild(typingIndicator);

  setTimeout(() => {
    chatBox.removeChild(typingIndicator);
  }, 1000);
}

// NEW FUNCTION TO HANDLE CHAT END
function endChat() {
  const chatContainer = document.getElementById("chat-container");
  chatContainer.classList.add("fade-out");

  // After fade-out completes, remove the chat and reveal expertise
  setTimeout(() => {
    chatContainer.remove(); // Removes the entire chat container from the DOM

    const expertiseContainer = document.getElementById("expertise-container");
    expertiseContainer.classList.remove("hidden");
    expertiseContainer.classList.add("cinematic-reveal");
  }, 2000);
}

function startChat() {
  chatBox.innerHTML = "";
  currentMessageIndex = 0;

  function showNextMessage() {
    if (currentMessageIndex < messages.length) {
      showTypingIndicator();
      setTimeout(() => {
        typeMessage(messages[currentMessageIndex], () => {
          currentMessageIndex++;
          // Add a 2-second pause before showing the next message
          setTimeout(showNextMessage, 2000);
        });
      }, 1000); // Typing indicator delay
    } else {
      // Once all messages have been shown, trigger the end of chat
      setTimeout(endChat, 1500);
    }
  }

  showNextMessage();
}

document.addEventListener("DOMContentLoaded", () => {
  startChat();
});
// Toggle the hidden qualifications when button is clicked
document.addEventListener("DOMContentLoaded", () => {
  const showQualBtn = document.getElementById("show-qualifications-btn");
  const qualifications = document.getElementById("qualifications");

  showQualBtn.addEventListener("click", () => {
    // If qualifications are hidden, show them
    if (
      qualifications.style.display === "none" ||
      qualifications.style.display === ""
    ) {
      qualifications.style.display = "block";
      // Optionally, re-trigger the fade-in animation:
      qualifications.style.animation = "fadeInQual 1s forwards";
      showQualBtn.innerHTML =
        '<i class="fas fa-user-graduate"></i> Hide Qualifications';
    }
    // If they're visible, hide them
    else {
      qualifications.style.display = "none";
      showQualBtn.innerHTML =
        '<i class="fas fa-user-graduate"></i> Show Qualifications';
    }
  });
});
