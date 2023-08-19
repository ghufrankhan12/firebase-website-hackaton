const userDetails = document.querySelector('.userDetails');  // Fixed typo in variable name
const editProfile = document.querySelector('#editprofile');
function createUserCollection(user) {
    firebase.firestore().collection('users')
        .doc(user.uid)
        .set({
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            portfolioUrl: "",
            phone:"",
            Experience:""
        });
}

async function getUserInfo(userID) {
    if (userID) {
        try {
            const userinfosnap = await firebase.firestore()
                .collection('users')
                .doc(userID)
                .get();
            const userInfo = userinfosnap.data();
            if (userInfo) {
                userDetails.innerHTML = `
                    <h3>${userInfo.name}</h3>
                    <h3>${userInfo.email}</h3>
                    <h3>${userInfo.portfolioUrl}</h3>
                    
                `;
            } else {
                userDetails.innerHTML = `<h3>Please login</h3>`;
            }
        } catch (error) {
            console.error("Error fetching user info:", error);
            userDetails.innerHTML = `<h3>Error fetching user info</h3>`;
        }
    } else {
        userDetails.innerHTML = `<h3>Please login</h3>`;
    }
}

// Replace 'yourUserID' with the actual user ID after authentication
// If the user is not logged in, pass null to indicate that
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log(user);
        getUserInfo(user.uid);
    } else {
        console.log('Signout successful');
        getUserInfo(null);
        M.toast({ html: 'Signout successful', classes: 'rounded' });
    }
});





async function getuserInfoRealtime(userID) {
    if (userID) {
        try {
            const userdocRef  = await firebase.firestore()
                .collection('users')
                .doc(userID)
                userdocRef.onSnapshot((doc)=>{
                    if(doc.exists){
                        const userInfo = doc.data();
            if (userInfo) {
                userDetails.innerHTML = `
                    <h3>${userInfo.name}</h3>
                    <h3>${userInfo.email}</h3>
                    <h3>${userInfo.portfolioUrl}</h3>
                    <button class=" btn waves-effect #fbc02d yellow darken-2 modal-trigger" href="#model3" type="submit">Edit Detail</button>
                `;
            } else {
                userDetails.innerHTML = `<h3>Please login</h3>`;
            }
                    }
                })
            
        } catch (error) {
            console.error("Error fetching user info:", error);
            userDetails.innerHTML = `<h3>Error fetching user info</h3>`;
        }
    } else {
        userDetails.innerHTML = `<h3>Please login</h3>`;
    }
}

function updateuserprofile(e){
    e.preventDefault()
    const userDocRef = firebase.firestore()
    .collection(users)
    .doc(firebase.auth().currentUser.uid)

    userDocRef.update({
        name:editProfile["name"].value,
        email:editProfile["email"].value,
        phone:editProfile["phone"].value,
        portfolioUrl:editProfile["portfolioUrl"].value,
        Experience:editProfile["Experience"].value

        
    })
    M.Modal.getInstance(myModal[2]).close();

    
        
    }