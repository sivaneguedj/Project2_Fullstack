document.addEventListener("DOMContentLoaded", function() {
    const loginContent = document.getElementById("loginContent");
    const registerContent = document.getElementById("registerContent");
    const registerTab = document.getElementById("registerTab");
    const loginTab = document.getElementById("loginTab");
    const login_btn = document.getElementById("login_btn");
    const register_btn = document.getElementById("register_btn");

    // Get the register form and login form
    const registerForm = document.forms["regForm"];
    const loginForm = document.forms["logForm"];

    // Registered User
    const last_name = document.getElementById("lname");
    const first_name = document.getElementById("fname");
    const username_reg = document.getElementById("username_reg");
    const birthday = document.getElementById("birthday");
    const mail = document.getElementById("mail_reg");
    const mail_conf = document.getElementById("mail_conf");
    const password = document.getElementById("psd_ins");
    const pas_conf = document.getElementById("psd_conf");
    // Login 
    const username_log = document.getElementById("username_log");
    const password_log = document.getElementById("psd_log");


    var users = [
        { 
            lastName: "Guedj",
            firstName: "Sivane",
            username: "sivane",
            birthday: "23/02/1999",
            mail: "sivane11@hotmail.fr",
            password: "sivane123456"
        },
        {  lastName: "Maximov",
        firstName: "Yael",
        username: "yaeli",
        birthday: "19/04/2000",
        mail: "yaeli@gmail.com",
        password: "yaeli19"
        },
        ,
        {  lastName: "sparks",
        firstName: "John",
        username: "johnny",
        birthday: "30/06/2005",
        mail: "johnsparks@gmail.com",
        password: "johnSparks769"
        }

    ];

    localStorage.setItem('users', JSON.stringify(users));

    loginTab.addEventListener("click", function() {
        loginContent.classList.add("active");
        registerContent.classList.remove("active");
        loginTab.classList.add("active");
        registerTab.classList.remove("active");
        loginContent.classList.remove("hide");
        registerContent.classList.add("hide");
        register_btn.classList.remove("log_style");
        login_btn.classList.add("log_style");

        /*
        // Update the register form's onsubmit attribute to validate the login form
        login_btn.onsubmit = function(event) {
            event.preventDefault();
            if(validateForm("logForm") === true){
                // check if this user is already registered in the system
                if(checkUserExists(username_log)) {
                    loginUser(username_log.value, password_log.value); // MSSAGE + BUTTON TO LOGIN
                }
                else{
                    alert("This user does not exist in the system, Do you want to register?"); // MSSAGE + BUTTON TO LOGIN
                }
            }
            else {
                return validateForm("logForm");
            }
            
        };
        */
    });

    registerTab.addEventListener("click", function() {
        registerContent.classList.add("active");
        loginContent.classList.remove("active");
        registerTab.classList.add("active");
        loginTab.classList.remove("active");
        loginContent.classList.add("hide");
        registerContent.classList.remove("hide");
        login_btn.classList.remove("log_style");
        register_btn.classList.add("log_style");


        /*
        // Update the register form's onsubmit attribute to validate the register form
        register_btn.onsubmit = function(event) {
            event.preventDefault();
            if(validateForm("regForm") === true){
                // check that the email and password confirmation are correct
                checkConfirmations(mail.value, mail_conf.value, password.value, pas_conf.value);
                // check if this username is already taken
                if(checkUserExists(username_reg)) {
                    alert("This username already exist in the system, Choose another one"); // MSSAGE + BUTTON TO LOGIN
                }
                // check if this username is already registered in the system
                else if (checkUserExistsRegistration(mail)) {
                    alert("This user already exist in the system, Do you want to log in?"); // MSSAGE + BUTTON TO LOGIN

                }
                else{
                    registerUser(last_name.value, first_name.value, username_reg.value, birthday.value, mail.value, mail_conf.value, password.value, pas_conf.value);
                }
            }
            else {
                return validateForm("regForm");
            }
        };
        */
    });


    var registerLink = document.querySelector('.register-link');

    registerLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default action of the link
        registerContent.classList.add("active");
        loginContent.classList.remove("active");
        registerTab.classList.add("active");
        loginTab.classList.remove("active");
        loginContent.classList.add("hide");
        registerContent.classList.remove("hide");
        login_btn.classList.remove("log_style");
        register_btn.classList.add("log_style");
    });


    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        if(validateForm("logForm")) {
            // check if this user is already registered in the system
            if(checkUserExists(username_log.value)) {
                loginUser(username_log.value, password_log.value); // MESSAGE + BUTTON TO LOGIN
            } else {
                alert("This user does not exist in the system. Do you want to register?");
            }
        }
    });

    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();
        if(validateForm("regForm")) {
            // check that the email and password confirmation are correct
            if(checkConfirmations(mail.value, mail_conf.value, password.value, pas_conf.value)) {
                // check if this username is already taken
                if(checkUserExists(username_reg.value)) {
                    alert("This username already exists in the system. Choose another one.");
                }
                // check if this email is already registered in the system
                else if (checkUserExistsRegistration(mail.value)) {
                    alert("This email is already registered in the system. Do you want to log in?");
                }
                else {
                    registerUser(last_name.value, first_name.value, birthday.value, mail.value, password.value);
                }
            }
        }
    });


    function validateForm(formName) {
        // Get all form elements
        var formElements = document.forms[formName].elements;
        
        // Iterate over form elements
        for (var i = 0; i < formElements.length; i++) {
            var element = formElements[i];
            
            // Check if element is an input and not a button
            if (element.tagName.toLowerCase() === "input" && element.type !== "submit") {
                // Check if element value is empty
                if (element.value === "") {
                    // Alert the user and return false if element is empty
                    alert(element.name + " must be filled out");
                    return false;
                }
            }
        }
        return true;
    }



    // Check if the mail's and password's confirmations are correct
    function checkConfirmations(mail, mail_conf, password, pas_conf) {
        if (mail.value === mail_conf.value && password.value === pas_conf.value){
            return true;
        }
        else if (mail.value !== mail_conf.value) {
            mail_conf.value = 'Incorrect mail, make sure you type exactly the same address'; // METTRE EN ROUGE
            return false;
        } else if(password.value !== pas_conf.value){
            pas_conf.value = 'Incorrect password, make sure you type exactly the password'; // METTRE EN ROUGE
            return false;
        } else {
            mail_conf.value = 'Incorrect mail, make sure you type exactly the same address'; // METTRE EN ROUGE
            pas_conf.value = 'Incorrect password, make sure you type exactly the password'; // METTRE EN ROUGE
        }

    }



    // Check if the username exists in local storage
    function checkUserExists(username) {
        // Get user data from local storage
        var users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if the username exists in the stored user data
        return users.some(user => user.username === username);
    }

    // Check if the user exists in local storage 
    function checkUserExistsRegistration(mail) {
        // Get user data from local storage
        var users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if the mail exists in the stored user data
        return users.some(user => user.mail === mail);
    }

    // Register a new user and store their data in local storage
    function registerUser(last_name, first_name, birthday, mail, password) {
        // Get existing users from local storage or initialize an empty array
        var users = JSON.parse(localStorage.getItem('users')) || [];

        // Create a new user object
        var newUser = {
            lastName: last_name.value,
            firstName: first_name.value,
            username:username.value,
            birthday:birthday.value,
            mail: mail.value,
            password: password.value
        };

        // Add the new user to the array of users
        users.push(newUser);

        // Store the updated user data back to local storage
        localStorage.setItem('users', JSON.stringify(users));

        alert("Registration successful."); 
    }

    // Log in an existing user
    function loginUser(username, password_log) {
        // Get user data from local storage
        var users = JSON.parse(localStorage.getItem('users')) || [];

        // Find the user with the provided username and password
        var user = users.find(user => user.username === username && user.password === password_log);

        // If the user is found, return true (login successful), otherwise return false
        if (user) {
            alert("Login successful.");
            window.location.href = "/HTML/homepage.html"; // Redirect to homepage.html
        } else {
            alert("Invalid username or password.");
        }
    }
    
   
});


