

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();
       
        var email = loginForm.emailaddress.value;
        var password = loginForm.password.value;
        
        auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in 
          var user = userCredential.user;
          //console.log(user.uid);
          localStorage.setItem('userID', user.uid);
          window.location.href="dashboard.html";
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // ..
        });
        
    }); 

    createAccountForm.addEventListener("submit", e => {
        e.preventDefault();
        console.log(createAccountForm.emailaddress.value, createAccountForm.password.value)

        var email = createAccountForm.emailaddress.value;
        var password = createAccountForm.password.value;

        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            // ...
            console.log(user)
        })
        .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
        });
    });

 
});