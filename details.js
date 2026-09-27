/* GET ELEMENTS */

let mealDetails =
    document.getElementById("mealDetails");

let breadcrumbMeal =
    document.getElementById("breadcrumbMeal");

let categoryContainer =
    document.getElementById("categoryContainer");

let menuBtn =
    document.getElementById("menubtn");

let closeBtn =
    document.getElementById("closebtn");

let sidebar =
    document.getElementById("sidebar");

let menuCategories =
    document.getElementById("menuCategories");

let search =
    document.getElementById("searchInput");

let searchBtn =
    document.getElementById("searchBtn");


/* GET MEAL ID */

let urlParams =
    new URLSearchParams(window.location.search);

let mealId =
    urlParams.get("id");


/* GET MEAL DETAILS */

fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
)

    .then((response) => {

        return response.json();

    })

    .then((data) => {

        console.log(data);

        let meal =
            data.meals[0];

        breadcrumbMeal.textContent =
            meal.strMeal.toUpperCase();

        displayMeal(meal);

    })

    .catch((error) => {

        console.log(error);

    });


/* DISPLAY MEAL */

function displayMeal(meal) {

    let ingredients = "";


    /* GET INGREDIENTS */

    for (let i = 1; i <= 20; i++) {

        let ingredient =
            meal["strIngredient" + i];

        let measure =
            meal["strMeasure" + i];


        if (
            ingredient &&
            ingredient.trim() !== ""
        ) {

            ingredients += `

                <span>
                    ${ingredient}
                </span>

            `;

        }

    }


    /* GET MEASURES */

    let measures = "";


    for (let i = 1; i <= 20; i++) {

        let ingredient =
            meal["strIngredient" + i];

        let measure =
            meal["strMeasure" + i];


        if (
            ingredient &&
            ingredient.trim() !== ""
        ) {

            measures += `

                <div>

                    <i class="bi bi-pin-fill"></i>

                    ${measure}

                </div>

            `;

        }

    }


    /* TAGS */

    let tags = meal.strTags
        ? meal.strTags
        : "No tags";


    /* DISPLAY */

    mealDetails.innerHTML = `

        <div class="details-top">


            <!-- IMAGE -->

            <div class="details-image">

                <img
                    src="${meal.strMealThumb}"
                    alt="${meal.strMeal}"
                >

            </div>


            <!-- INFORMATION -->

            <div class="details-info">

                <h1>
                    ${meal.strMeal}
                </h1>

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

                    <span class="tag">
                        ${tags}
                    </span>

                </p>


                <!-- INGREDIENTS -->

                <div class="ingredients">

                    <h3>
                        Ingredients
                    </h3>

                    <div class="ingredient-list">

                        ${ingredients}

                    </div>

                </div>

            </div>

        </div>


        <!-- MEASURES -->

        <div class="measures">

            <h3>
                Measure:
            </h3>

            <div class="measure-list">

                ${measures}

            </div>

        </div>


        <!-- INSTRUCTIONS -->

        <div class="instructions">

            <h3>
                Instructions:
            </h3>

            <p>
                ${meal.strInstructions}
            </p>

        </div>

    `;

}


/* HAMBURGER */

menuBtn.addEventListener("click", function () {

    sidebar.classList.add("active");

});


/* CLOSE */

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

            /* CATEGORY CARDS */

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


            /* SIDEBAR */

            menuCategories.innerHTML += `

                <div
                    class="menu-category"
                    data-category="${category.strCategory}"
                >

                    ${category.strCategory}

                </div>

            `;

        });

    });


/* CATEGORY CLICK */

categoryContainer.addEventListener(
    "click",
    function (event) {

        let card =
            event.target.closest(".category-card");

        if (card) {

            let category =
                card.dataset.category;

            window.location.href =
                `meals.html?category=${category}`;

        }

    }
);


/* SIDEBAR CATEGORY */

menuCategories.addEventListener(
    "click",
    function (event) {

        if (
            event.target.classList.contains(
                "menu-category"
            )
        ) {

            let category =
                event.target.dataset.category;

            window.location.href =
                `meals.html?category=${category}`;

        }

    }
);


/* SEARCH */

searchBtn.addEventListener(
    "click",
    function () {

        let searchValue =
            search.value.toLowerCase();

        if (searchValue !== "") {

            window.location.href =
                `meals.html?search=${searchValue}`;

        }

    }
);