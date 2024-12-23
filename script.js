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
    text: "Hey Moayyad! So, what exactly do you do?",
    profileImage:
      "https://www.pngitem.com/pimgs/m/286-2868690_thumb-image-smiling-businessman-png-transparent-png.png",
  },
  {
    user: "person2",
    text: "Hey there! I design tech tools and apps that help instructors create better learning experiences. Think instructional design meets cutting-edge tech!",
    profileImage: "Moayyad's Pic.png",
  },
  {
    user: "person1",
    text: "That’s cool! Can you give me an example?",
    profileImage:
      "https://www.pngitem.com/pimgs/m/286-2868690_thumb-image-smiling-businessman-png-transparent-png.png",
  },
  {
    user: "person2",
    text: "Sure! I’m working on an app right now that helps instructors build activities based on transcription. It’s great for improving speaking and comprehension skills!",
    profileImage: "Moayyad's Pic.png",
  },
  {
    user: "person1",
    text: "Oh wow, that sounds really useful. What’s your ultimate goal with all this?",
    profileImage:
      "https://www.pngitem.com/pimgs/m/286-2868690_thumb-image-smiling-businessman-png-transparent-png.png",
  },
  {
    user: "person2",
    text: "To empower educators with tools that make learning more engaging and impactful. At the end of the day, it’s about making education better for everyone!",
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
  const typingSpeed = 50;

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

function startChat() {
  chatBox.innerHTML = "";
  currentMessageIndex = 0;

  function showNextMessage() {
    if (currentMessageIndex < messages.length) {
      showTypingIndicator();
      setTimeout(() => {
        typeMessage(messages[currentMessageIndex], () => {
          currentMessageIndex++;
          setTimeout(showNextMessage, 1000);
        });
      }, 1000);
    }
  }

  showNextMessage();
}

document.addEventListener("DOMContentLoaded", () => {
  startChat();
});
