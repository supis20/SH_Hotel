login();

function usersRef() {
  const database = firebase.database();
  return database.ref("users");
}

function login() {
  $("#login").click(async function (e) {
    try {
      e.preventDefault();
      const email = $("#email").val();
      const password = $("#password").val();

      if (email && password) {
        const isUserExists = await checkUsersExists(email, password);
        const userId = await getUserId(email, password);

        if (isUserExists === "users") {
          if (userId) {
            sessionStorage.setItem("isUserLoggedIn", true);
            sessionStorage.setItem("userId", userId);
            window.location.href = 'index1.html';
          }
        } else {
          alert("Email or password is wrong!");
        }
      } else {
        alert("Email or password is empty!");
      }
    } catch (error) {
      console.log("can't login", error);
    }
  });
}

async function checkUsersExists(email, password) {
  try {
    const snapshot = await usersRef().once("value");
    const users = Object.values(snapshot.val());
    const findUser = users.find(user => user.email === email && user.password === password);
    if (findUser) {
      return true;
    }
    return false;
  } catch (error) {
    console.log("can't check user exists", error);
  }
}

async function getUserId(email, password) {
  try {
    const snapshot = await usersRef().once("value");
    const usersData = snapshot.val();
    for (const userId in usersData) {
      if (usersData[userId].email === email && usersData[userId].password === password) {
        return userId;
      }
    }
    return null;
  } catch (error) {
    console.log("can't get user id", error);
  }
}





