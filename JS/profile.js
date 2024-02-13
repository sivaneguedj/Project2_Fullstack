document.addEventListener("DOMContentLoaded", function() {
    // Retrieve the username from local storage
    console.log("hi");
    var username = JSON.parse(localStorage.getItem('user'));
    console.log(username);

    // Check if the user is logged in
    if (username) {
        // Display the username in the profile page
        var userDetails = document.querySelector('.user-details');
        userDetails.innerHTML = '<p><strong>Username:</strong> ' + username + '</p>';
    } else {
        // Redirect to the login page if the user is not logged in
        window.location.href = "../HTML/login.html";
    }


    // Parse users data from local storage
    var users = JSON.parse(localStorage.getItem('users'));

    // Filter users who have a score for "Game 2"
    var usersWithGame2Score = users.filter(user => user.scoreGame2);

    // Sort users based on their scores for "Game 2" in descending order
    usersWithGame2Score.sort(function(a, b) {
        var scoreA = parseInt(a.scoreGame2.split(' ')[0]);
        var scoreB = parseInt(b.scoreGame2.split(' ')[0]);
        return scoreB - scoreA;
    });

    // Display the top three users with the highest scores for "Game 2"
    var recordsTable = document.querySelector('.records table');
    for (var i = 0; i < Math.min(3, usersWithGame2Score.length); i++) {
        var user = usersWithGame2Score[i];
        var row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.username}</td>
            <td>Dragons&Diamonds</td>
            <td>${user.scoreGame2}</td>
        `;
        recordsTable.appendChild(row);
    }


     

});

