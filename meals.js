let mealContainer = document.getElementById("mealContainer");

let mealTitle = document.getElementById("mealTitle");

let menuBtn = document.getElementById("menubtn");

let closeBtn = document.getElementById("closebtn");

let sidebar = document.getElementById("sidebar");

let menuCategories = document.getElementById("menuCategories");

let categoryDescription = document.getElementById("categoryDescription");

let searchInput = document.getElementById("searchInput");

let searchBtn = document.getElementById("searchBtn");

// get the details using url:

let urlParams = new URLSearchParams(window.location.search);

let categoryName = urlParams.get("category");

let searchValue = urlParams.get("search");

// using asynch and await to get the card details using fetch :
/* GET CATEGORIES */

async function getCategories() {
    try {
        let response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        let data = await response.json();
        data.categories.forEach(function (category) {

            /* SIDEBAR */

            menuCategories.innerHTML += `
                <div
                    class="menu-category"
                    data-category="${category.strCategory}"
                >
                    ${category.strCategory}
                </div>
            `;

            /* DESCRIPTION */

            if (
                categoryName &&
                category.strCategory.toLowerCase() ===
                categoryName.toLowerCase()
            ) {
                categoryDescription.innerHTML = `
                    <h3>${category.strCategory}</h3>
                    <p>
                        ${category.strCategoryDescription}
                    </p>
                `;
            }
        });
    }
    catch (error) {
        console.log(error);
    }
}

/* GET MEALS */

async function getMeals() {
    try {
        let url = "";

        /* CATEGORY */

        if (categoryName) {
            mealTitle.textContent = categoryName + " Meals";
            url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(categoryName)}`;
        }

        /* SEARCH */

        else if (searchValue) {
            mealTitle.textContent = "Search Results";

            categoryDescription.innerHTML = `
                <h3>Search Results</h3>
                <p>
                    Showing meals related to "${searchValue}".
                </p>
                `;
            url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchValue)}`;
        }
        else {
            mealTitle.textContent = "Meals";
            return;
        }

        /* FETCH API */

        let response = await fetch(url);
        let data = await response.json();

        /* DISPLAY */

        if (data.meals) {
            displayMeals(data.meals);
        }
        else {
            mealContainer.innerHTML = "<h2>No meals found</h2>";
            categoryDescription.innerHTML = `
                <h3>No Results</h3>
                <p> No meals were found for "${searchValue}".</p>
            `;
        }
    }
    catch (error) {
        console.log(error);
    }
}

/* DISPLAY MEALS */

function displayMeals(meals) {
    mealContainer.innerHTML = "";
    meals.forEach(function (meal) {
        mealContainer.innerHTML += `

            <div
                class="meal-card"
                data-id="${meal.idMeal}"
            >
                <img
                    src="${meal.strMealThumb}"
                    alt="${meal.strMeal}"
                >
                <h3>
                    ${meal.strMeal}
                </h3>
            </div>
        `;
    });
}

/* SEARCH BUTTON */

searchBtn.addEventListener("click", function () {
    let value = searchInput.value.trim();
    if (value !== "") {
        window.location.href = `meals.html?search=${encodeURIComponent(value)}`;
    }
});

/* MEAL CARD CLICK */

mealContainer.addEventListener("click", function (event) {
    let card = event.target.closest(".meal-card");
    if (card) {
        let mealId = card.dataset.id;
        window.location.href = `meal-details.html?id=${mealId}`;
    }
});

/* OPEN MENU */

menuBtn.addEventListener("click", function () {
    sidebar.classList.add("active");
});

/* CLOSE MENU */

closeBtn.addEventListener("click", function () {
    sidebar.classList.remove("active");
});

/* SIDEBAR CATEGORY CLICK */

menuCategories.addEventListener("click", function (event) {
    if (
        event.target.classList.contains("menu-category")
    ) {
        let category =
            event.target.dataset.category;
        window.location.href = `meals.html?category=${encodeURIComponent(category)}`;
    }
});

/* CALL FUNCTIONS */
getCategories();
getMeals();