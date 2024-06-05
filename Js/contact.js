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

    // Show confirm modal
    document.getElementById('confirmModal').style.display = 'block';
    return false;  
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

function closeConfirmModal() {
    document.getElementById('confirmModal').style.display = 'none';
}

function submitForm() {

    document.getElementById('confirmModal').style.display = 'none';
    document.getElementById('successModal').style.display = 'block';

    setTimeout(() => {
        location.reload();
    }, 2000);
}
