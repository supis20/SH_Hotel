const userId = document.getElementById('userId');
const name = document.getElementById('name');
const age = document.getElementById('age');
const adress = document.getElementById('adress');
const email = document.getElementById('email');
const addBtn = document.getElementById('addBtn');
const updateBtn = document.getElementById('updateBtn');
const removeBtn = document.getElementById('removeBtn');
const showBtn = document.getElementById('showBtn');

const database = firebase.database();
const db = firebase.firestore();
const usersRef = database.ref('/users');
addBtn.addEventListener('click', e =>{
	e.preventDefault();
	usersRef.child(userId.value).set({
		name: name.value,
		age: age.value,
		adress: adress.value,
		email: email.value
	});
});

updateBtn.addEventListener('click', e => {
	e.preventDefault();
	const newData = {
		name: name.value,
		age: age.value,
		adress: adress.value,
		email: email.value
	};
	usersRef.child(userId.value).update(newData);
});

removeBtn.addEventListener('click', e => {
	e.preventDefault();
	usersRef.child(userId.value).remove()
		.then(() => {
			console.log('User Deleted !');
		})
		.catch(error => {
			console.error(error);
		});
});

function logOut() {
  $("#logout").click(function (e) {
    e.preventDefault();
    sessionStorage.removeItem("isUserLoggedIn");
    sessionStorage.removeItem("userId");
    window.location.href = "index.html";
  });
}