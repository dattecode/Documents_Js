

data_users = []

// constant -----------------------------------
const formUser = document.querySelector("#form_main")
const closeIcon = document.querySelector("#closeIcon")
const modalShow = document.querySelector(".containtModal")
const usersDiv = document.querySelector(".users")

// events -------------------------------------
formUser.addEventListener("submit", function(event){
    event.preventDefault()

    const userName = event.target.userName.value.toLowerCase().trim()
    const userEmail = event.target.userEmail.value.toLowerCase().trim()
    const userPass = event.target.userPass.value.trim()
    const userPass2 = event.target.userPass2.value

    if (!userName || !userEmail || ! userPass || !userPass2){
        printText("fill in all fields")
        return modalShow.classList.toggle("containModal__show")
    }

    if (userPass !== userPass2){
        printText("the passwords have to consider")
        return modalShow.classList.toggle("containModal__show")
    }

    if (!userEmail.includes("@")){
        printText("Email invalid")
        return modalShow.classList.toggle("containModal__show")
    }

    if (repeatEmail(userEmail, data_users)){
        printText("this email is used")
        return modalShow.classList.toggle("containModal__show")
    }

    const user_obj = {
        userName,
        userEmail,
        userPass,
        userPass2
    }

    data_users.push(user_obj)

    addUsers(data_users)
})

closeIcon.addEventListener("click", function () {
    modalShow.classList.toggle("containModal__show")
})

// functions ----------------------------------

function printText (text) {
    document.querySelector("#modalText").textContent = text
}

function addUsers(arr){

    let html = ""

    for (const key of arr) {
        html += `
        <div class="user">
        <p>User name: ${key.userName}</p>
        <p>User email: ${key.userEmail}</p>
        <p>User pass: ${key.userPass}</p>
        </div>
        `}

    return usersDiv.innerHTML = html
}

function repeatEmail(email, arr) {

    for (const user of arr) {
        if (user.userEmail === email) {
            return true
        }
    }
}