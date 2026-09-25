/* GET ELEMENTS */

let mealContainer =
    document.getElementById("mealContainer");

let mealTitle =
    document.getElementById("mealTitle");

let menuBtn =
    document.getElementById("menubtn");

let closeBtn =
    document.getElementById("closebtn");

let sidebar =
    document.getElementById("sidebar");

let menuCategories =
    document.getElementById("menuCategories");


/* GET URL DATA */

let urlParams =
    new URLSearchParams(window.location.search);

let categoryName =
    urlParams.get("category");

let searchValue =
    urlParams.get("search");


/* CATEGORY OR SEARCH */

if (categoryName) {

    /* CATEGORY */

    mealTitle.textContent =
        categoryName + " Meals";


    fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
    )

        .then((response) => {

            return response.json();

        })

        .then((data) => {

            console.log(data);

            displayMeals(data.meals);

        })

        .catch((error) => {

            console.log(error);

        });

}


else if (searchValue) {

    /* SEARCH */

    mealTitle.textContent =
        "Search Results";


    fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`
    )

        .then((response) => {

            return response.json();

        })

        .then((data) => {

            console.log(data);

            if (data.meals) {

                displayMeals(data.meals);

            }
            else {

                mealContainer.innerHTML =
                    "<h2>No meals found</h2>";

            }

        })

        .catch((error) => {

            console.log(error);

        });

}


/* DISPLAY MEALS */

function displayMeals(meals) {

    mealContainer.innerHTML = "";

    meals.forEach(function (meal) {

        mealContainer.innerHTML += `

<div 
    class="meal-card"
    data-id="${ meal.idMeal}"
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

mealContainer.addEventListener("click", function (event) {

    let card =
        event.target.closest(".meal-card");

    if (card) {

        let mealId =
            card.dataset.id;

        window.location.href =
            `meal-details.html?id=${mealId}`;

    }

});

/* OPEN HAMBURGER */

menuBtn.addEventListener("click", function () {

    sidebar.classList.add("active");

});


/* CLOSE HAMBURGER */

closeBtn.addEventListener("click", function () {

    sidebar.classList.remove("active");

});


/* GET CATEGORIES */

fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
)

    .then((response) => {

        return response.json();

    })

    .then((data) => {

        data.categories.forEach(function (category) {

            menuCategories.innerHTML += `

                <div
                    class="menu-category"
                    data-category="${category.strCategory}"
                >

                    ${category.strCategory}

                </div>

            `;

        });

    })

    .catch((error) => {

        console.log(error);

    });


/* SIDEBAR CATEGORY CLICK */

menuCategories.addEventListener("click", function (event) {

    if (
        event.target.classList.contains("menu-category")
    ) {

        let selectedCategory =
            event.target.dataset.category;

        window.location.href =
            `meals.html?category=${selectedCategory}`;

    }

});