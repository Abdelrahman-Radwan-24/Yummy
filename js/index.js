/// <reference types="../@types/jquery"/>

// ? ==========> Global <========= //

let rowData = document.getElementById("rowData");
let rowSearch = document.getElementById("rowSearch");
let submitBtn;

// ? ==========> Global <========= //

// ! ==========> Loading <========= //

(function () {
  $(".loader").fadeOut(1000, function () {
    $(".loading").slideUp(1000, function () {
      $("body").css("overflow", "visible");
      $(".loader").remove();
    });
  });
})();

// ! ==========> Loading <========= //

/*==========> aside*/
$("aside ul li").animate({ top: 300 }, 500);

$(".open-icon").on("click", () => {
  $("aside").animate({ left: 0 }, 700);
  $(".open-icon").css("display", "none");
  $(".open-close").css("display", "block");
  for (let i = 0; i < 5; i++) {
    $("aside ul li")
      .eq(i)
      .animate({ top: 0 }, (i + 12) * 100);
  }
});
$(".open-close").on("click", () => {
  $("aside").animate({ left: "-260px" }, 700);
  $(".open-icon").css("display", "block");
  $(".open-close").css("display", "none");
  $("aside ul li").animate({ top: 300 }, 900);
});

function closeSideNav() {
  $("aside").animate({ left: "-260px" }, 700);
  $(".open-icon").css("display", "block");
  $(".open-close").css("display", "none");
  $("aside ul li").animate({ top: 300 }, 900);
}

/*==========> aside*/

/*==========> searchByName*/

async function searchByName(term) {
  $(".second-loading").fadeIn(500);
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  const response = await api.json();
  const mealsData = response.meals;
  response.meals ? displayMeals(mealsData) : displayMeals([]);
  $(".second-loading").fadeOut(500);
}

searchByName("");

function displayMeals(data) {
  let mealsBox = ``;
  for (let i = 0; i < data.length; i++) {
    mealsBox += `
    
        <div class="col-md-3">
        <div onclick="getDetails('${data[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2">
          <img
            class="w-100"
            src="${data[i].strMealThumb}"
            alt="${data[i].strMeal}"
          />
          <div
            class="meal-layout position-absolute d-flex align-items-center p-2"
          >
            <h3>${data[i].strMeal}</h3>
          </div>
        </div>
      </div>
    
    `;
  }

  rowData.innerHTML = mealsBox;
}
/*==========> searchByName*/

/*==========> Categories*/

document.getElementById("Categories").addEventListener("click", () => {
  Categories();
  closeSideNav();
  rowSearch.innerHTML = "";
});

async function Categories() {
  rowData.innerHTML = "";
  $(".second-loading").fadeIn(500);
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  const response = await api.json();
  const data = response.categories;
  displayCategories(data);
  $(".second-loading").fadeOut(500);
}

function displayCategories(data) {
  let mealsBox = ``;
  for (let i = 0; i < data.length; i++) {
    mealsBox += `
    
<div class="col-md-3">
  <div onclick="getMealsCategories('${
    data[i].strCategory
  }')"  class="meal position-relative overflow-hidden rounded-4 ">
    <img
      class="w-100"
      src="${data[i].strCategoryThumb}"
      alt="${data[i].strCategory}"
    />
    <div
      class="meal-layout position-absolute text-center rounded-4 p-3 "
    >
      <h3> ${data[i].strCategory}</h3>
      <p>
      ${data[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}
      </p>
    </div>
  </div>
</div>
    
    `;
  }

  rowData.innerHTML = mealsBox;
}

/*==========> Categories*/

/*==========> MealsCategories*/

async function getMealsCategories(categorie) {
  rowData.innerHTML = "";
  $(".second-loading").fadeIn(500);
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorie}`
  );
  const response = await api.json();
  displayMeals(response.meals);
  closeSideNav();
  $(".second-loading").fadeOut(500);
}

/*==========> MealsCategories*/

/*==========> Areas*/

document.getElementById("Area").addEventListener("click", () => {
  areas();
  closeSideNav();
  rowSearch.innerHTML = "";
});

async function areas() {
  rowData.innerHTML = "";
  $(".second-loading").fadeIn(500);
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  const response = await api.json();
  const data = response.meals;
  displayAreas(data);
  $(".second-loading").fadeOut(500);
}

function displayAreas(data) {
  let mealsBox = ``;
  for (let i = 0; i < data.length; i++) {
    mealsBox += `
    
<div class="col-md-3">
  <div onclick="getMealsAreas('${data[i].strArea}')" class="meal text-center text-white">
    <i class="fa-solid fa-house-laptop fa-4x"></i>
    <h3>${data[i].strArea}</h3>
  </div>
</div>
    
    `;
  }

  rowData.innerHTML = mealsBox;
}

/*==========> Areas*/

/*==========> MealsAreas*/

async function getMealsAreas(area) {
  rowData.innerHTML = "";
  $(".second-loading").fadeIn(500);
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  const response = await api.json();
  displayMeals(response.meals);
  closeSideNav();
  $(".second-loading").fadeOut(500);
}

/*==========> MealsAreas*/

/*==========> Ingredients*/

document.getElementById("Ingredients").addEventListener("click", () => {
  ingredients();
  closeSideNav();
  rowSearch.innerHTML = "";
});

async function ingredients() {
  rowData.innerHTML = "";
  $(".second-loading").fadeIn(500);
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  const response = await api.json();
  const data = response.meals.slice(0, 20);
  displayIngredients(data);
  $(".second-loading").fadeOut(500);
}

function displayIngredients(data) {
  let mealsBox = ``;
  for (let i = 0; i < data.length; i++) {
    mealsBox += `
    
<div class="col-md-3">
  <div onclick="getMealsIngredients('${
    data[i].strIngredient
  }')" class="meal text-center text-white">
    <i class="fa-solid fa-drumstick-bite  fa-4x"></i>
    <h3>${data[i].strIngredient}</h3>
    <p>${data[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
  </div>
</div>
    
    `;
  }

  rowData.innerHTML = mealsBox;
}

/*==========> Ingredients*/

/*==========> MealsIngredients*/

async function getMealsIngredients(ingredintes) {
  rowData.innerHTML = "";
  $(".second-loading").fadeIn(500);
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredintes}`
  );
  const response = await api.json();
  displayMeals(response.meals);
  closeSideNav();
  $(".second-loading").fadeOut(500);
}

/*==========> MealsIngredients*/

/*==========> Details*/

async function getDetails(mealId) {
  rowData.innerHTML = "";
  $(".second-loading").fadeIn(500);
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  const response = await api.json();
  displayDetails(response.meals[0]);
  closeSideNav();
  $(".second-loading").fadeOut(500);
}

function displayDetails(data) {
  rowSearch.innerHTML = "";

  let ingredient = ``;

  for (let i = 1; i <= 20; i++) {
    if (data[`strIngredient${i}`]) {
      ingredient += `<li class="alert alert-info  p-1 m-2">${
        data[`strMeasure${i}`]
      }${data[`strIngredient${i}`]} </li>`;
    }
  }

  let tags = data.strTags?.split(",");

  if (!tags) {
    tags = [];
  }

  let tagsStr = ``;
  for (let i = 0; i < tags.length; i++) {
    tagsStr += ` <li class="alert alert-danger  p-1 m-2"> ${tags[i]} </li>`;
  }

  let mealsBox = `
    
    <div class="col-md-4 text-white ">
      <img class="w-100 rounded-3" src="${data.strMealThumb}" alt="">
      <h2>${data.strMeal}</h2>
    </div>
    <div class="col-md-8 text-white">
      <h2>Instructions</h2>
      <p>${data.strInstructions}</p>
      <h3><span class="fw-bolder">Area :</span> ${data.strArea}</h3>
      <h3><span class="fw-bolder">Category :</span> ${data.strCategory}</h3>
      <h3>Recipes :</h3>
      <ul class="d-flex  flex-wrap list-unstyled">
      ${ingredient}
      </ul>
      <h3 class="mb-3">Tags :</h3>
      <ul class="d-flex  flex-wrap list-unstyled">
      ${tagsStr}
      </ul>
      <a href="${data.strSource}" target="_blank" class="btn btn-outline-success">Source</a>
      <a href="${data.strYoutube}" target="_blank" class="btn btn-outline-danger">Youtube</a>
    </div>
    
    `;

  rowData.innerHTML = mealsBox;
}

/*==========> Details*/

/*==========> showSearchInputs*/

document.getElementById("showSearchInputs").addEventListener("click", () => {
  searchInputs();
  closeSideNav();
});

function searchInputs() {
  rowSearch.innerHTML = `
       <div class="col-md-6">
            <input onkeyup="searchByName(this.value)" type="text" class="form-control mb-3" placeholder="Search By Name">
          </div>
          <div class="col-md-6">
            <input maxlength="1" onkeyup="searchByFirstName(this.value)" type="text" class="form-control mb-3" placeholder="Search By First Letter">
          </div>
  `;
  rowData.innerHTML = "";
}

async function searchByFirstName(term) {
  rowData.innerHTML = "";
  $(".second-loading").fadeIn(500);
  term === "" ? (term = "a") : "";
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
  );
  const response = await api.json();
  const mealsData = response.meals;
  response.meals ? displayMeals(mealsData) : displayMeals([]);
  $(".second-loading").fadeOut(500);
}

/*==========> showSearchInputs*/

/*==========> Contact us*/

document.getElementById("showContacts").addEventListener("click", () => {
  rowSearch.innerHTML = "";
  showContacts();
  closeSideNav();
});

function showContacts() {
  rowData.innerHTML = `
  <section class="contact-us ">
            <div class="container w-75 mx-auto d-flex flex-column justify-content-center align-items-center min-vh-100">
              <div class="row g-4 p-3" id="rowContacts">
                <div class="col-md-6 ">
                  <input id="nameInput" onkeyup="inputsValidations()" type="text" class="form-control" placeholder="Enter Your Name">
                  <p id="nameAlert" class=" d-none alert alert-danger w-100 mt-2 text-center">Special characters and numbers not allowed</p>
                </div>
                <div class="col-md-6 ">
                  <input id="emailInput" onkeyup="inputsValidations()" type="email" class="form-control" placeholder="Enter Your Email">
                   <p id="emailAlert" class=" d-none alert alert-danger w-100 mt-2 text-center ">Email not valid *exemple@yyy.zzz</p>
                </div>
                <div class="col-md-6 ">
                  <input id="phoneInput" onkeyup="inputsValidations()" type="text" class="form-control" placeholder="Enter Your Phone">
                   <p id="phoneAlert" class=" d-none alert alert-danger w-100 mt-2 text-center ">Enter valid Phone Number</p>
                </div>
                <div class="col-md-6 ">
                  <input id="ageInput" onkeyup="inputsValidations()" type="number" class="form-control" placeholder="Enter Your Age">
                   <p id="ageAlert" class=" d-none alert alert-danger w-100 mt-2 text-center ">Enter valid age</p>
                </div>


                <div class="col-md-6 position-relative">
                  <input id="passwordInput" onkeyup="inputsValidations()" type="password" class="form-control" placeholder="Enter Your Password">
                  <i id="inputIcon"  onclick="iconOfEye()" class="fa-regular fa-eye-slash eye-icon"></i>
                   <p id="passwordAlert" class=" d-none alert alert-danger w-100 mt-2 text-center ">Enter valid password *Minimum eight characters, at least one letter and one number:*</p>
                </div>


                <div class="col-md-6 position-relative">
                  <input id="repasswordInput" onkeyup="inputsValidations()" type="password" class="form-control" placeholder="Repassword">
                  <i id="inputEye"  onclick="iconEye()" class="fa-regular fa-eye-slash eye-icon"></i>
                   <p id="repasswordAlert" class=" d-none alert alert-danger w-100 mt-2 text-center ">Enter valid repassword</p>
                </div>


              </div>
              <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
            </div>
            
          </section> 

`;
  submitBtn = document.getElementById("submitBtn");
}

function nameInput() {
  let regex =
    /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/;
  let nameInput = document.getElementById("nameInput").value;

  if (regex.test(nameInput)) {
    document.getElementById("nameInput").classList.add("is-valid");
    document.getElementById("nameInput").classList.remove("is-invalid");
    return true;
  } else {
    document.getElementById("nameInput").classList.add("is-invalid");
    document.getElementById("nameInput").classList.remove("is-valid");
    return false;
  }
}

function emailInput() {
  let regex =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  let emailInput = document.getElementById("emailInput").value;

  if (regex.test(emailInput)) {
    document.getElementById("emailInput").classList.add("is-valid");
    document.getElementById("emailInput").classList.remove("is-invalid");
    return true;
  } else {
    document.getElementById("emailInput").classList.add("is-invalid");
    document.getElementById("emailInput").classList.remove("is-valid");
    return false;
  }
}

function phoneInput() {
  let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  let phoneInput = document.getElementById("phoneInput").value;

  if (regex.test(phoneInput)) {
    document.getElementById("phoneInput").classList.add("is-valid");
    document.getElementById("phoneInput").classList.remove("is-invalid");
    return true;
  } else {
    document.getElementById("phoneInput").classList.add("is-invalid");
    document.getElementById("phoneInput").classList.remove("is-valid");
    return false;
  }
}

function ageInput() {
  let regex = /^([1-7][0-9]|80)$/;
  let ageInput = document.getElementById("ageInput").value;

  if (regex.test(ageInput)) {
    document.getElementById("ageInput").classList.add("is-valid");
    document.getElementById("ageInput").classList.remove("is-invalid");
    return true;
  } else {
    document.getElementById("ageInput").classList.add("is-invalid");
    document.getElementById("ageInput").classList.remove("is-valid");
    return false;
  }
}

function passwordInput() {
  let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  let passwordInput = document.getElementById("passwordInput").value;

  if (regex.test(passwordInput)) {
    document.getElementById("passwordInput").classList.add("is-valid");
    document.getElementById("passwordInput").classList.remove("is-invalid");
    return true;
  } else {
    document.getElementById("passwordInput").classList.add("is-invalid");
    document.getElementById("passwordInput").classList.remove("is-valid");
    return false;
  }
}

function repasswordInput() {
  if (
    document.getElementById("repasswordInput").value ===
      document.getElementById("passwordInput").value &&
    document.getElementById("repasswordInput").value !== ""
  ) {
    document.getElementById("repasswordInput").classList.add("is-valid");
    document.getElementById("repasswordInput").classList.remove("is-invalid");
    return true;
  } else {
    document.getElementById("repasswordInput").classList.add("is-invalid");
    document.getElementById("repasswordInput").classList.remove("is-valid");
    return false;
  }
}

function inputsValidations() {
  if (nameInput()) {
    document.getElementById("nameAlert").classList.replace("d-block", "d-none");
  } else {
    document.getElementById("nameAlert").classList.replace("d-none", "d-block");
  }

  if (emailInput()) {
    document
      .getElementById("emailAlert")
      .classList.replace("d-block", "d-none");
  } else {
    document
      .getElementById("emailAlert")
      .classList.replace("d-none", "d-block");
  }

  if (phoneInput()) {
    document
      .getElementById("phoneAlert")
      .classList.replace("d-block", "d-none");
  } else {
    document
      .getElementById("phoneAlert")
      .classList.replace("d-none", "d-block");
  }

  if (ageInput()) {
    document.getElementById("ageAlert").classList.replace("d-block", "d-none");
  } else {
    document.getElementById("ageAlert").classList.replace("d-none", "d-block");
  }

  if (passwordInput()) {
    document
      .getElementById("passwordAlert")
      .classList.replace("d-block", "d-none");
  } else {
    document
      .getElementById("passwordAlert")
      .classList.replace("d-none", "d-block");
  }

  if (repasswordInput()) {
    document
      .getElementById("repasswordAlert")
      .classList.replace("d-block", "d-none");
  } else {
    document
      .getElementById("repasswordAlert")
      .classList.replace("d-none", "d-block");
  }

  if (
    nameInput() &&
    emailInput() &&
    phoneInput() &&
    ageInput() &&
    passwordInput() &&
    repasswordInput()
  ) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
  }
}

/*==========> Contact us*/

/*==========> Eye Icon*/

function iconOfEye() {
  if (document.getElementById("inputIcon").classList.contains("fa-eye-slash")) {
    document
      .getElementById("inputIcon")
      .classList.replace("fa-eye-slash", "fa-eye");
    document.getElementById("passwordInput").setAttribute("type", "text");
  } else {
    document
      .getElementById("inputIcon")
      .classList.replace("fa-eye", "fa-eye-slash");
    document.getElementById("passwordInput").setAttribute("type", "password");
  }
}

function iconEye() {
  if (document.getElementById("inputEye").classList.contains("fa-eye-slash")) {
    document
      .getElementById("inputEye")
      .classList.replace("fa-eye-slash", "fa-eye");
    document.getElementById("repasswordInput").setAttribute("type", "text");
  } else {
    document
      .getElementById("inputEye")
      .classList.replace("fa-eye", "fa-eye-slash");
    document.getElementById("repasswordInput").setAttribute("type", "password");
  }
}

/*==========> Eye Icon*/
