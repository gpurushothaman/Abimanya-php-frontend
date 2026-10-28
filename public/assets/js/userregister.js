document.addEventListener("DOMContentLoaded", function () {
  const { userRegisterUrl, loginUrl } = window.APP_CONFIG;

  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  const form = document.getElementById("registerForm");
  const alertBox = document.getElementById("formAlert");

  const fields = {
    name: document.getElementById("name"),
    email: document.getElementById("email"),
    username: document.getElementById("username"),
    phone: document.getElementById("phone"),
    state: document.getElementById("state"),
    city: document.getElementById("city"),
    address: document.getElementById("address"),
    password: document.getElementById("password"),
    confirm_password: document.getElementById("confirm_password"),
  };

  const errorElements = {
    name: document.getElementById("nameError"),
    email: document.getElementById("emailError"),
    username: document.getElementById("usernameError"),
    phone: document.getElementById("phoneError"),
    state: document.getElementById("stateError"),
    city: document.getElementById("cityError"),
    address: document.getElementById("addressError"),
    password: document.getElementById("passwordError"),
    confirm_password: document.getElementById("confirm_passwordError"),
  };

  const iti = window.intlTelInput(fields.phone, {
    initialCountry: "in",
    separateDialCode: true,
    nationalMode: true,
    countrySearch: true,
    loadUtils: () =>
      import(
        "https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.1/build/js/utils.js"
      ),
  });

  function showError(key, message) {
    fields[key].classList.add("is-invalid");
    fields[key].classList.remove("is-valid");

    errorElements[key].textContent = message;
    errorElements[key].classList.add("show");
  }

  function clearError(key) {
    fields[key].classList.remove("is-invalid");
    errorElements[key].textContent = "";
    errorElements[key].classList.remove("show");
  }

  function markValid(key) {
    clearError(key);
    fields[key].classList.add("is-valid");
  }

  function validateField(key) {
    const field = fields[key];
    const value = field.value.trim();

    switch (key) {
      case "name":
        if (!value) {
          showError(key, "Full name is required.");
          return false;
        }

        if (
          value.length < 2 ||
          value.length > 100 ||
          !/^[\p{L}][\p{L}\p{M} .'-]*$/u.test(value)
        ) {
          showError(
            key,
            "Enter a valid name using letters, spaces, hyphens or apostrophes."
          );
          return false;
        }
        break;

      case "email":
        if (!value) {
          showError(key, "Email address is required.");
          return false;
        }

        if (value.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          showError(key, "Enter a valid email address.");
          return false;
        }
        break;

      case "username":
        if (!value) {
          showError(key, "Username is required.");
          return false;
        }

        if (!/^[a-zA-Z0-9._]{3,30}$/.test(value)) {
          showError(
            key,
            "Username must be 3–30 characters and use only letters, numbers, dots or underscores."
          );
          return false;
        }
        break;

      case "phone":
        if (!value) {
          showError(key, "Phone number is required.");
          return false;
        }

        if (!iti.isValidNumber()) {
          showError(
            key,
            "Enter a valid phone number for the selected country."
          );
          return false;
        }
        break;

      case "state":
        if (value.length < 2 || value.length > 100) {
          showError(key, "Enter a state or province (2–100 characters).");
          return false;
        }
        break;

      case "city":
        if (value.length < 2 || value.length > 100) {
          showError(key, "Enter a city (2–100 characters).");
          return false;
        }
        break;

      case "address":
        if (value.length < 5 || value.length > 500) {
          showError(key, "Address must contain 5–500 characters.");
          return false;
        }
        break;

      case "password":
        if (value.length < 8 || value.length > 128) {
          showError(key, "Password must contain 8–128 characters.");
          return false;
        }

        if (
          !/[A-Z]/.test(value) ||
          !/[a-z]/.test(value) ||
          !/[0-9]/.test(value) ||
          !/[^A-Za-z0-9]/.test(value)
        ) {
          showError(
            key,
            "Include uppercase, lowercase, a number and a special character."
          );
          return false;
        }
        break;

      case "confirm_password":
        if (!value) {
          showError(key, "Please confirm your password.");
          return false;
        }

        if (value !== fields.password.value) {
          showError(key, "Passwords do not match.");
          return false;
        }
        break;
    }

    markValid(key);
    return true;
  }

  function validateAll() {
    let valid = true;

    Object.keys(fields).forEach(function (key) {
      if (!validateField(key)) {
        valid = false;
      }
    });

    if (valid) {
      const country = iti.getSelectedCountryData();

      document.getElementById("phone_e164").value = iti.getNumber();

      document.getElementById("country_iso2").value =
        country.iso2.toUpperCase();

      document.getElementById("country_name").value = country.name;

      alertBox.classList.add("d-none");
    } else {
      alertBox.classList.remove("d-none");
    }

    return valid;
  }

  // Validate a field when the user leaves it.
  Object.keys(fields).forEach(function (key) {
    fields[key].addEventListener("blur", function () {
      validateField(key);
    });

    fields[key].addEventListener("input", function () {
      if (
        fields[key].classList.contains("is-invalid") ||
        fields[key].classList.contains("is-valid")
      ) {
        validateField(key);
      }

      // Recheck confirmation if the original password changes.
      if (key === "password" && fields.confirm_password.value !== "") {
        validateField("confirm_password");
      }
    });
  });

  fields.phone.addEventListener("countrychange", function () {
    if (fields.phone.value.trim() !== "") {
      validateField("phone");
    }
  });

  // Final validation before submitting.
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    try {
      // Wait until phone-number validation utilities are ready.
      await iti.promise;

      if (!validateAll()) {
        const firstInvalid = form.querySelector(".is-invalid");

        if (firstInvalid) {
          firstInvalid.focus();
        }

        return;
      }

      // Continue with the form's normal POST submission.
      //form.submit();

      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        username: document.getElementById("username").value,
        phone: document.getElementById("phone_e164").value,
        country_iso2: document.getElementById("country_iso2").value,
        country_name: document.getElementById("country_name").value,
        state: document.getElementById("state").value,
        city: document.getElementById("city").value,
        address: document.getElementById("address").value,
        password: document.getElementById("password").value,
        confirm_password: document.getElementById("confirm_password").value,
      };

      try {
        const response = await axios.post(userRegisterUrl, formData, {
          headers: {
            "Content-Type": "application/json",
          },
          ///withCredentials: true
        });

        document.getElementById("formSuccessAlert").classList.remove("d-none");
        setTimeout(() => {
          window.location.href = loginUrl;
        }, 2000);

        console.log("PHP response:", response.data);
      } catch (error) {
        console.error("Request failed:", error.response?.data || error.message);
      }
    } catch (error) {
      console.error("Phone validation initialization failed:", error);
      showError(
        "phone",
        "Phone validation could not load. Please refresh the page and try again."
      );
      alertBox.classList.remove("d-none");
    }
  });
});
