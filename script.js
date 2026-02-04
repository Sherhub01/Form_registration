const form = document.getElementById("registrationForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const phone = document.getElementById("phone");
const terms = document.getElementById("terms");
const strengthBar = document.querySelector(".strength-meter span");

function showError(input, message) {
    const formGroup = input.closest(".form-group");
    formGroup.querySelector(".error").innerText = message;
    input.classList.add("invalid");
}

function clearError(input) {
    const formGroup = input.closest(".form-group");
    formGroup.querySelector(".error").innerText = "";
    input.classList.remove("invalid");
}

// Password strength checker
password.addEventListener("input", () => {
    const value = password.value;
    let strength = 0;

    if (value.length >= 8) strength++;
    if (/[0-9]/.test(value)) strength++;
    if (/[@$!%*?&#]/.test(value)) strength++;

    if (strength === 1) {
        strengthBar.style.width = "33%";
        strengthBar.style.background = "red";
    } else if (strength === 2) {
        strengthBar.style.width = "66%";
        strengthBar.style.background = "orange";
    } else if (strength === 3) {
        strengthBar.style.width = "100%";
        strengthBar.style.background = "green";
    } else {
        strengthBar.style.width = "0%";
    }
});

form.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    // Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showError(email, "Email is required");
        isValid = false;
    } else if (!emailPattern.test(email.value)) {
        showError(email, "Invalid email format");
        isValid = false;
    } else {
        clearError(email);
    }

    // Password
    const passPattern = /^(?=.*[0-9])(?=.*[@$!%*?&#]).{8,}$/;
    if (!password.value) {
        showError(password, "Password is required");
        isValid = false;
    } else if (!passPattern.test(password.value)) {
        showError(password, "Min 8 chars, 1 number & 1 special char");
        isValid = false;
    } else {
        clearError(password);
    }

    // Confirm Password
    if (!confirmPassword.value) {
        showError(confirmPassword, "Confirm your password");
        isValid = false;
    } else if (password.value !== confirmPassword.value) {
        showError(confirmPassword, "Passwords do not match");
        isValid = false;
    } else {
        clearError(confirmPassword);
    }

    // Phone
    if (!phone.value) {
        showError(phone, "Phone number is required");
        isValid = false;
    } else if (!/^\d{10}$/.test(phone.value)) {
        showError(phone, "Phone number must be 10 digits");
        isValid = false;
    } else {
        clearError(phone);
    }

    // Gender
    const gender = document.querySelector('input[name="gender"]:checked');
    const genderGroup = document.querySelector('input[name="gender"]').closest(".form-group");
    if (!gender) {
        genderGroup.querySelector(".error").innerText = "Please select gender";
        isValid = false;
    } else {
        genderGroup.querySelector(".error").innerText = "";
    }

    // Terms
    const termsGroup = terms.closest(".form-group");
    if (!terms.checked) {
        termsGroup.querySelector(".error").innerText = "You must accept terms";
        isValid = false;
    } else {
        termsGroup.querySelector(".error").innerText = "";
    }

    // Success
    if (isValid) {
        alert("🎉 Registration Successful!");
        form.reset();
        strengthBar.style.width = "0%";
    }
});
