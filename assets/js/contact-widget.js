(function () {
  "use strict";

  var formEndpoint = "https://formsubmit.co/ajax/jianbin.tan@duke.edu";
  var panel = document.getElementById("mailPanel");
  var launcher = document.getElementById("mailLauncher");
  var closeButton = document.getElementById("closeMail");
  var form = document.getElementById("directMailForm");
  var sendButton = document.getElementById("sendMail");
  var status = document.getElementById("formStatus");
  var formView = document.getElementById("mailFormView");
  var successView = document.getElementById("mailSuccess");
  var sendAnother = document.getElementById("sendAnother");
  var retryButton = document.getElementById("retryMail");
  var emailField = document.getElementById("visitorEmail");

  if (!panel || !launcher || !form) return;

  function setOpen(open) {
    panel.classList.toggle("open", open);
    panel.setAttribute("aria-hidden", String(!open));
    launcher.setAttribute("aria-expanded", String(open));
    if (open) window.setTimeout(function () { emailField.focus(); }, 190);
  }

  function showFailure() {
    status.textContent = "Message failed to send. Please check your email address and message, then try again.";
    status.className = "form-status show error";
    retryButton.hidden = false;
  }

  function showSuccess() {
    formView.hidden = true;
    successView.hidden = false;
  }

  launcher.addEventListener("click", function () {
    setOpen(!panel.classList.contains("open"));
  });

  closeButton.addEventListener("click", function () {
    setOpen(false);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && panel.classList.contains("open")) setOpen(false);
  });

  sendAnother.addEventListener("click", function () {
    successView.hidden = true;
    formView.hidden = false;
    status.className = "form-status";
    retryButton.hidden = true;
    emailField.focus();
  });

  retryButton.addEventListener("click", function () {
    form.requestSubmit();
  });

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    status.className = "form-status";
    retryButton.hidden = true;
    sendButton.disabled = true;
    sendButton.textContent = "Sending…";

    var payload = Object.fromEntries(new FormData(form).entries());

    try {
      var response = await fetch(formEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });
      var result = await response.json().catch(function () { return {}; });

      if (!response.ok || result.success === false || result.success === "false") {
        throw new Error("Submission failed");
      }

      form.reset();
      showSuccess();
    } catch (error) {
      showFailure();
    } finally {
      sendButton.disabled = false;
      sendButton.textContent = "Send Message";
    }
  });
}());
