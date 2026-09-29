/* GET ELEMENTS */

let mealDetails = document.getElementById("mealDetails");

let breadcrumbMeal = document.getElementById("breadcrumbMeal");

let categoryContainer = document.getElementById("categoryContainer");

let menuBtn = document.getElementById("menubtn");

let closeBtn = document.getElementById("closebtn");

let sidebar = document.getElementById("sidebar");

let menuCategories = document.getElementById("menuCategories");

let search = document.getElementById("searchInput");

let searchBtn = document.getElementById("searchBtn");


/* GET MEAL ID */

let urlParams = new URLSearchParams(window.location.search);

let mealId = urlParams.get("id");


/* GET MEAL DETAILS */

async function getMealDetails() {
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);

        let data = await response.json();
        let meal = data.meals[0];
        breadcrumbMeal.textContent = meal.strMeal.toUpperCase();
        displayMeal(meal);
    }
    catch (error) {
        console.log(error);

    }
}

/* DISPLAY MEAL */

function displayMeal(meal) {

    let ingredients = "";
    letmeasures = "";

    /* GET INGREDIENTS */

    for (let i = 1; i <= 20; i++) {

        let ingredient = meal["strIngredient" + i];

        let measure = meal["strMeasure" + i];

        if (ingredient && ingredient.trim() !== "") {

            ingredients += `

                <span>${ingredient}</span>
            `;
            measures += `
                <div>
                    <i class=bi bi-pin-fill"></i>
                    ${measures}
                </div>
            `;
        }

    }

    /* TAGS */

    let tags = meal.strTags || "No tags";

    /* DISPLAY */

    mealDetails.innerHTML = `

        <div class="details-top">

            <div class="details-image">
                <img
                    src="${meal.strMealThumb}"
                    alt="${meal.strMeal}"
                >
            </div>

            <div class="details-info">

                <h1>${meal.strMeal}</h1>

                <div class="orange-line"></div>

                <p>
                    <b>CATEGORY:</b>
                    ${meal.strCategory}
                </p>

                <p>
                    <b>Source:</b>
                    ${meal.strSource || "Not available"}
                </p>

                <p>
                    <b>Tags:</b>
                    <span class="tag">${tags}</span>
                </p>

                <div class="ingredients">

                    <h3>Ingredients</h3>

                    <div class="ingredient-list">
                        ${ingredients}
                    </div>

                </div>

            </div>

        </div>


        <div class="measures">

            <h3>Measure:</h3>

            <div class="measure-list">
                ${measures}
            </div>

        </div>


        <div class="instructions">

            <h3>Instructions:</h3>

            <p>
                ${meal.strInstructions}
            </p>

        </div>
    `;
}

/* GET CATEGORIES */

async function getCategories() {

    try {

        let response = await fetch(
            "https://www.themealdb.com/api/json/v1/1/categories.php"
        );

        let data = await response.json();

        data.categories.forEach(function (category) {

            /* CATEGORY CARD */

            categoryContainer.innerHTML += `
                <div
                    class="category-card"
                    data-category="${category.strCategory}"
                >

                    <img
                        src="${category.strCategoryThumb}"
                        alt="${category.strCategory}"
                    >

                    <span class="category-name">
                        ${category.strCategory}
                    </span>

                </div>
            `;


            /* SIDEBAR CATEGORY */

            menuCategories.innerHTML += `
                <div
                    class="menu-category"
                    data-category="${category.strCategory}"
                >
                    ${category.strCategory}
                </div>
            `;

        });

    }
    catch (error) {

        console.log(error);

    }
}


/* OPEN MENU */

menuBtn.addEventListener("click", function () {

    sidebar.classList.add("active");

});


/* CLOSE MENU */

closeBtn.addEventListener("click", function () {

    sidebar.classList.remove("active");

});


/* CATEGORY CLICK */

categoryContainer.addEventListener("click", function (event) {

    let card = event.target.closest(".category-card");

    if (card) {

        let category = card.dataset.category;

        window.location.href =
            `meals.html?category=${encodeURIComponent(category)}`;
    }

});


/* SIDEBAR CATEGORY CLICK */

menuCategories.addEventListener("click", function (event) {

    if (event.target.classList.contains("menu-category")) {

        let category = event.target.dataset.category;

        window.location.href =
            `meals.html?category=${encodeURIComponent(category)}`;
    }

});

/* SEARCH */

searchBtn.addEventListener("click", function () {

    let searchValue = search.value.trim();

    if (searchValue !== "") {

        window.location.href =
            `meals.html?search=${encodeURIComponent(searchValue)}`;
    }

});

/* CALL FUNCTIONS */
getMealDetails();
getCategories();