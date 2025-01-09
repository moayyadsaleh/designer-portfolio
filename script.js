const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  body.classList.add(savedTheme);
  themeToggle.innerHTML =
    savedTheme === "dark-mode"
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
} else {
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}
themeToggle.addEventListener("click", () => {
  body.classList.add("theme-transition");
  setTimeout(() => {
    body.classList.remove("theme-transition");
  }, 500);
  if (body.classList.contains("dark-mode")) {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    localStorage.setItem("theme", "light-mode");
  } else {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem("theme", "dark-mode");
  }
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
  const skills = ["I Strategize. I Build. I Transform."];
  let index = 0;
  let charIndex = 0;
  const typingSpeed = 100;
  const type = () => {
    if (charIndex < skills[index].length) {
      textContainer.textContent += skills[index].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingSpeed);
    }
  };
  type();
});
document
  .getElementById("contactForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const formStatus = document.getElementById("formStatus");
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        formStatus.textContent = "Thank you! Your message has been sent.";
        formStatus.className = "success";
        form.reset();
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
    text: "Hey Moayyad, what’s your area of expertise?",
    profileImage:
      "https://www.pngitem.com/pimgs/m/286-2868690_thumb-image-smiling-businessman-png-transparent-png.png",
  },
  {
    user: "person2",
    text: "I help organizations design innovative learning solutions, implement advanced tech strategies, and empower teams with impactful tools.",
    profileImage: "Moayyad's Pic.png",
  },
  {
    user: "person2",
    text: "My work combines education, design, and technology to build engaging courses, intuitive web apps, and data-driven systems.",
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
  const typingSpeed = 100;
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
function endChat() {
  const chatContainer = document.getElementById("chat-container");
  chatContainer.classList.add("fade-out");
  setTimeout(() => {
    chatContainer.remove();
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
          setTimeout(showNextMessage, 2000);
        });
      }, 1000);
    } else {
      setTimeout(endChat, 1500);
    }
  }
  showNextMessage();
}
document.addEventListener("DOMContentLoaded", () => {
  startChat();
});
document.addEventListener("DOMContentLoaded", () => {
  const showQualBtn = document.getElementById("show-qualifications-btn");
  const qualifications = document.getElementById("qualifications");
  showQualBtn.addEventListener("click", () => {
    if (
      qualifications.style.display === "none" ||
      qualifications.style.display === ""
    ) {
      qualifications.style.display = "block";
      qualifications.style.animation = "fadeInQual 1s forwards";
      showQualBtn.innerHTML =
        '<i class="fas fa-user-graduate"></i> Hide Qualifications';
    } else {
      qualifications.style.display = "none";
      showQualBtn.innerHTML =
        '<i class="fas fa-user-graduate"></i> Show Qualifications';
    }
  });
});
const openChatbotBtn = document.getElementById("open-chatbot");
const chatbotContainer = document.getElementById("chatbot-container");
const closeChatbotBtn = document.getElementById("close-chatbot");
const sendChatBtn = document.getElementById("send-chat");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chatbot-messages");
let isWelcomeSent = !1;
openChatbotBtn.addEventListener("click", () => {
  chatbotContainer.style.display = "flex";
  if (!isWelcomeSent) {
    sendWelcomeMessage();
    isWelcomeSent = !0;
  }
});
closeChatbotBtn.addEventListener("click", () => {
  chatbotContainer.style.display = "none";
});
sendChatBtn.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});
function sendMessage() {
  const message = chatInput.value.trim();
  if (message === "") return;
  appendMessage(message, "Person1");
  chatInput.value = "";
  adjustTextareaHeight();
  chatMessages.scrollTop = chatMessages.scrollHeight;
  const loadingDiv = document.createElement("div");
  loadingDiv.classList.add("message", "loading");
  loadingDiv.innerHTML = `<span>Typing</span>`;
  chatMessages.appendChild(loadingDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  fetch("https://backend-portfolio-22x2.onrender.com/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  })
    .then((response) => response.json())
    .then((data) => {
      chatMessages.removeChild(loadingDiv);
      if (data.reply) {
        appendMessage(data.reply, "Person2");
        chatMessages.scrollTop = chatMessages.scrollHeight;
      } else if (data.error) {
        appendMessage(`Error: ${data.error}`, "Person2");
      } else {
        appendMessage("Sorry, I could not process that.", "Person2");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      chatMessages.removeChild(loadingDiv);
      appendMessage("Sorry, something went wrong.", "Person2");
    });
}
function appendMessage(message, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);
  if (sender === "Person2" && message.includes("moayyad")) {
    messageDiv.innerHTML = `<strong>${message}</strong>`;
  } else {
    messageDiv.textContent = message;
  }
  chatMessages.appendChild(messageDiv);
}
function sendWelcomeMessage() {
  const welcomeText =
    "Hi there! I’m Moayyad’s virtual twin—ready to answer your questions, share insights, and help you explore innovative solutions. Let’s get started!";
  appendMessage(welcomeText, "Person2");
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
function adjustTextareaHeight() {
  chatInput.style.height = "auto";
  chatInput.style.height = `${chatInput.scrollHeight}px`;
}
document.addEventListener("DOMContentLoaded", () => {
  adjustTextareaHeight();
});
chatInput.addEventListener("input", adjustTextareaHeight);
function toggleInfoPopup() {
  const infoModal = document.getElementById("info-modal");
  infoModal.classList.toggle("hidden");
}
function toggleSkillsModal() {
  const skillsModal = document.getElementById("skills-modal");
  if (skillsModal.classList.contains("hidden")) {
    skillsModal.classList.remove("hidden");
  } else {
    skillsModal.classList.add("hidden");
  }
}
function toggleExperienceModal() {
  const experienceModal = document.getElementById("experience-modal");
  if (experienceModal.classList.contains("hidden")) {
    experienceModal.classList.remove("hidden");
  } else {
    experienceModal.classList.add("hidden");
  }
}
