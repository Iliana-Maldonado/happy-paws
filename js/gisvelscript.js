// Contact form validation
document.getElementById("contactForm")?.addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  let msg = "";

  if (!email.endsWith("@gmail.com")) {
    msg = "Email must be a Gmail address.";
  } else if (!/^\d{9}$/.test(phone)) {
    msg = "Phone must be exactly 9 digits.";
  } else {
    msg = "Message sent successfully!";
  }
  document.getElementById("contactMsg").innerText = msg;
});

// Booking form validation
document.getElementById("bookingForm")?.addEventListener("submit", function(e) {
  e.preventDefault();
  const date = new Date(document.getElementById("date").value);
  const today = new Date();
  const service = document.getElementById("service").value;
  let msg = "";

  if (!service) {
    msg = "Please select a service.";
  } else if (date <= today) {
    msg = "Date must be in the future.";
  } else {
    msg = "Booking confirmed!";
  }
  document.getElement