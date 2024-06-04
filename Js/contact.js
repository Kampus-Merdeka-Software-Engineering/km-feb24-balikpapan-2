function validateForm() {
    const name = document.getElementById('Name').value;
    const email = document.getElementById('Email').value;
    const message = document.getElementById('Message').value;

    if (name === '' || email === '' || message === '') {
        // Show error modal
        document.getElementById('errorModalall').style.display = 'block';
        return false;
    }

    if (!validateEmail(email)) {
        // Show error modal
        document.getElementById('errorModalemail').style.display = 'block';
        return false;
    }

    if (name.length < 5) {
        // Show error modal
        document.getElementById('errorModalname').style.display = 'block';
        return false;
    }

    // Show success modal
    document.getElementById('successModal').style.display = 'block';

    // Reload the page after 2 seconds
    setTimeout(() => {
        location.reload();
    }, 2000);

    return false;  // Prevent actual form submission for demonstration
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function closeModal() {
    document.getElementById('successModal').style.display = 'none';
}

function closeErrorModal1() {
    document.getElementById('errorModalall').style.display = 'none';
}
function closeErrorModal2() {
    document.getElementById('errorModalemail').style.display = 'none';
}
function closeErrorModal4() {
    document.getElementById('errorModalname').style.display = 'none';
}
