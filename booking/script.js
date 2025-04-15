function bookRoom(roomName) {
    document.getElementById('room-type').value = roomName;
    document.getElementById('booking-form').scrollIntoView({ behavior: 'smooth' });
}

document.getElementById('booking').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for booking with us!');
});

// Login Modal Code
const loginButton = document.getElementById('login-button');
const loginModal = document.getElementById('login-modal');
const loginForm = document.getElementById('login-form');

loginButton.addEventListener('click', () => {
    loginModal.classList.add('visible');
});

loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.classList.remove('visible');
    }
});

document.getElementById('login-button').addEventListener('click', () => {
    document.getElementById('login-modal').classList.toggle('hidden');
});

document.getElementById('signup-button').addEventListener('click', () => {
    document.getElementById('signup-modal').classList.toggle('hidden');
});
document.addEventListener('DOMContentLoaded', fetchUsers);

// Fetch users and display them
document.addEventListener('DOMContentLoaded', fetchUsers);
// Function to fetch all users and populate the table
function fetchUsers() {
    console.log('Fetching users...'); // Check if the function is being called
    fetch('fetch_users.php')
        .then((response) => {
            console.log('Response:', response); // Check if the fetch request was successful
            return response.json();
        })
        .then((data) => {
            console.log('Fetched Data:', data); // Log the data here
            const tbody = document.querySelector('#user-table tbody');
            tbody.innerHTML = ''; // Clear the table

            data.forEach((user) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.password}</td> <!-- Display password as well -->
                    <td>
                        <button class="edit-btn" data-id="${user.id}" data-username="${user.username}" data-email="${user.email}" data-password="${user.password}">Edit</button>
                        <button class="delete-btn" data-id="${user.id}">Delete</button>
                    </td>
                `;
                tbody.appendChild(row);
            });

            attachActionListeners(); // Attach event listeners for edit and delete buttons
        })
        .catch((error) => console.error('Error fetching users:', error));
}


// Function to delete a user
function deleteUser(userId) {
    fetch('delete_user.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `id=${userId}`
    })
        .then((response) => response.text())
        .then((message) => {
            alert(message);
            fetchUsers(); // Refresh the user table after deletion
        })
        .catch((error) => console.error('Error deleting user:', error));
}

// Function to attach listeners to edit and delete buttons
// Function to attach listeners to edit and delete buttons
function attachActionListeners() {
    document.querySelectorAll('.delete-btn').forEach((button) => {
        button.addEventListener('click', (e) => {
            const userId = e.target.dataset.id;
            if (confirm('Are you sure you want to delete this user?')) {
                deleteUser(userId);
            }
        });
    });

    document.querySelectorAll('.edit-btn').forEach((button) => {
        button.addEventListener('click', (e) => {
            const userId = e.target.dataset.id;
            const username = e.target.dataset.username;
            const email = e.target.dataset.email;
            const password = e.target.dataset.password;

            const newUsername = prompt('Edit Username:', username);
            const newEmail = prompt('Edit Email:', email);
            const newPassword = prompt('Edit Password:', password);

            if (newUsername && newEmail && newPassword) {
                updateUser(userId, newUsername, newEmail, newPassword);
            }
        });
    });
}


// Function to update user
// Function to update user
function updateUser(userId, username, email, password) {
    fetch('update_user.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `id=${userId}&username=${username}&email=${email}&password=${password}`
    })
        .then((response) => response.text())
        .then((message) => {
            alert(message);
            fetchUsers(); // Refresh the user table after update
        })
        .catch((error) => console.error('Error updating user:', error));
}


// Fetch users when the page loads
document.addEventListener('DOMContentLoaded', fetchUsers);
