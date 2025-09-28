// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  document.getElementById("currentYear").textContent = new Date().getFullYear()

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]')
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = targetSection.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const nav = document.querySelector(".nav")

  mobileMenuToggle.addEventListener("click", () => {
    nav.classList.toggle("active")
  })

  // Header scroll effect
  const header = document.querySelector(".header")
  let lastScrollTop = 0

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (scrollTop > 100) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }

    lastScrollTop = scrollTop
  })

  // Contact form handling
  const contactForm = document.getElementById("contactForm")

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    // Get form data
    const formData = new FormData(this)
    const formObject = {}

    formData.forEach((value, key) => {
      formObject[key] = value
    })

    // Add loading state
    const submitButton = this.querySelector('button[type="submit"]')
    const originalText = submitButton.textContent
    submitButton.textContent = "Sending..."
    submitButton.disabled = true
    submitButton.classList.add("loading")

    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
      // Reset form
      this.reset()

      // Remove loading state
      submitButton.textContent = originalText
      submitButton.disabled = false
      submitButton.classList.remove("loading")

      // Show success message
      showNotification("Message sent successfully! We'll get back to you within 24 hours.", "success")
    }, 2000)
  })

  // Form validation
  const formInputs = document.querySelectorAll("input, select, textarea")

  formInputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateField(this)
    })

    input.addEventListener("input", function () {
      if (this.classList.contains("error")) {
        validateField(this)
      }
    })
  })

  // CTA button actions
  const ctaButtons = document.querySelectorAll(".cta-button, .btn-primary, .btn-secondary")

  ctaButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      if (this.textContent.includes("Call Now")) {
        window.location.href = "tel:+27732507759"
      } else if (this.textContent.includes("Get Free Quote")) {
        document.querySelector("#contact").scrollIntoView({ behavior: "smooth" })
      } else if (this.textContent.includes("Schedule Consultation")) {
        showNotification("Please call us at +27 73 250 7759 to schedule your free consultation!", "info")
      } else if (this.textContent.includes("View Our Services")) {
        document.querySelector("#services").scrollIntoView({ behavior: "smooth" })
      }
    })
  })

  // Emergency button
  const emergencyButton = document.querySelector(".btn-emergency")
  if (emergencyButton) {
    emergencyButton.addEventListener("click", () => {
      window.location.href = "tel:+27732507759"
    })
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in")
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animateElements = document.querySelectorAll(".service-card, .project-card, .feature")
  animateElements.forEach((el) => observer.observe(el))
})

// Utility Functions
function validateField(field) {
  const value = field.value.trim()
  let isValid = true

  // Remove existing error styling
  field.classList.remove("error")
  removeErrorMessage(field)

  // Required field validation
  if (field.hasAttribute("required") && !value) {
    showFieldError(field, "This field is required")
    isValid = false
  }

  // Email validation
  if (field.type === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      showFieldError(field, "Please enter a valid email address")
      isValid = false
    }
  }

  // Phone validation (South African format)
  if (field.type === "tel" && value) {
    const phoneRegex = /^(\+27|0)[0-9]{9}$/
    const cleanPhone = value.replace(/\s/g, "")
    if (!phoneRegex.test(cleanPhone)) {
      showFieldError(field, "Please enter a valid South African phone number")
      isValid = false
    }
  }

  return isValid
}

function showFieldError(field, message) {
  field.classList.add("error")

  const errorElement = document.createElement("div")
  errorElement.className = "field-error"
  errorElement.textContent = message
  errorElement.style.color = "#ef4444"
  errorElement.style.fontSize = "0.875rem"
  errorElement.style.marginTop = "0.25rem"

  field.parentNode.appendChild(errorElement)
}

function removeErrorMessage(field) {
  const errorElement = field.parentNode.querySelector(".field-error")
  if (errorElement) {
    errorElement.remove()
  }
}

function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#3b82f6"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
    `

  // Add animation styles
  const style = document.createElement("style")
  style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
    `
  document.head.appendChild(style)

  // Add to page
  document.body.appendChild(notification)

  // Close functionality
  const closeButton = notification.querySelector(".notification-close")
  closeButton.addEventListener("click", () => {
    notification.remove()
  })

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove()
    }
  }, 5000)
}

// South African phone number formatting
function formatSAPhoneNumber(input) {
  let value = input.value.replace(/\D/g, "")

  // Handle different input formats
  if (value.startsWith("27")) {
    value = "+" + value
  } else if (value.startsWith("0") && value.length === 10) {
    value = "+27" + value.substring(1)
  }

  // Format as +27 XX XXX XXXX
  if (value.startsWith("+27") && value.length === 12) {
    const formatted = value.replace(/(\+27)(\d{2})(\d{3})(\d{4})/, "$1 $2 $3 $4")
    input.value = formatted
  }
}

// Add phone formatting to phone inputs
document.addEventListener("DOMContentLoaded", () => {
  const phoneInputs = document.querySelectorAll('input[type="tel"]')
  phoneInputs.forEach((input) => {
    input.addEventListener("input", function () {
      formatSAPhoneNumber(this)
    })
  })
})

// Service card hover effects
document.addEventListener("DOMContentLoaded", () => {
  const serviceCards = document.querySelectorAll(".service-card")

  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })
})
