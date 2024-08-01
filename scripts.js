// Dummy data for authentication
const users = {
    user: { password: "user123", role: "user" },
    admin: { password: "admin123", role: "admin" }
};

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", handleLogin);
    }

    const voteForm = document.getElementById("voteForm");
    if (voteForm) {
        voteForm.addEventListener("submit", handleVoteSubmission);
    }

    if (window.location.pathname.includes("admin.html")) {
        displayVoteCounts();
    }
});

function handleLogin(event) {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    if (users[username] && users[username].password === password) {
        if (users[username].role === "user") {
            window.location.href = "vote.html";
        } else if (users[username].role === "admin") {
            window.location.href = "admin.html";
        }
    } else {
        alert("Invalid credentials");
    }
}

function handleVoteSubmission(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const voteData = {
        name: formData.get("name"),
        email: formData.get("email"),
        voterId: formData.get("voterId"),
        party: formData.get("party")
    };

    // Store vote data (you would send this to a server in a real application)
    saveVote(voteData);

    window.location.href = "thankyou.html";
}

function saveVote(voteData) {
    const votes = JSON.parse(localStorage.getItem("votes")) || [];
    votes.push(voteData);
    localStorage.setItem("votes", JSON.stringify(votes));
}

function displayVoteCounts() {
    const votes = JSON.parse(localStorage.getItem("votes")) || [];
    const voteCounts = votes.reduce((counts, vote) => {
        counts[vote.party] = (counts[vote.party] || 0) + 1;
        return counts;
    }, {});

    const voteCountsContainer = document.getElementById("voteCounts");
    voteCountsContainer.innerHTML = Object.entries(voteCounts)
        .map(([party, count]) => `<p>${party}: ${count} votes</p>`)
        .join("");
}

function logout() {
    window.location.href = "index.html";
}
