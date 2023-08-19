const myModal = document.querySelectorAll('.modal');

async function signup(e) {
    e.preventDefault();

    // Get user input from the signup form
    const email = document.querySelector('#Signup_email').value;
    const password = document.querySelector('#signupassword').value;

    try {
        // Create a new user using Firebase authentication
        const result = await firebase.auth().createUserWithEmailAndPassword(email, password);

        // Update the user's display name (optional)
        await result.user.updateProfile({
            displayName: "User", // Set the display name as needed
        });

        // Create a user document in Firestore
        createUserCollection(result.user);

        // Display a welcome message
        M.toast({ html: `Welcome ${result.user.email}`, classes: 'rounded' });
    } catch (err) {
        console.error(err);
        M.toast({ html: err.message, classes: 'rounded green' });
    }

    // Clear the input fields and close the signup modal
    document.querySelector('#Signup_email').value = '';
    document.querySelector('#signupassword').value = '';
    M.Modal.getInstance(myModal[0]).close();
}

async function login(e) {
    e.preventDefault();

    // Get user input from the login form
    const email = document.querySelector('#login_email').value;
    const password = document.querySelector('#loginpassword').value;

    try {
        // Sign in with Firebase authentication
        const result = await firebase.auth().signInWithEmailAndPassword(email, password);

        // Display a welcome message
        M.toast({ html: `Welcome ${result.user.email}`, classes: 'rounded green' });
    } catch (err) {
        console.error(err);
        M.toast({ html: err.message, classes: 'rounded' });
    }

    // Clear the input fields and close the login modal
    document.querySelector('#login_email').value = '';
    document.querySelector('#loginpassword').value = '';
    M.Modal.getInstance(myModal[1]).close();
}

function logout() {
    firebase.auth().signOut();
}

const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log(user);
        //getUserInfo(user.uid);
        getuserInfoRealtime(user.uid);
    } else {
        console.log('Signout successful');
      //  getUserInfo(null);
      getuserInfoRealtime(null);
        M.toast({ html: 'Signout successful', classes: 'rounded' });
    }
});

async function loginWithGoogle() {
    try {
        // Initialize a GoogleAuthProvider
        const provider = new firebase.auth.GoogleAuthProvider();

        // Sign in with Google using a popup
        const result = await firebase.auth().signInWithPopup(provider);
    } catch (error) {
        console.error("Error fetching user info:", error);
        userDetails.innerHTML = `<h3>Error fetching user info</h3>`;
    }
}


// Replace 'yourUserID' with the actual user ID after authentication


// Define the getuserInfo function here (ensure it's properly defined and imported)
// Define the createUserCollection function here (ensure it's properly defined and imported)
