/* GET ELEMENTS */

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


/* OPEN HAMBURGER */

menuBtn.addEventListener("click", function () {

    sidebar.classList.add("active");

});


/* CLOSE HAMBURGER */

closeBtn.addEventListener("click", function () {

    sidebar.classList.remove("active");

});


/* GET CATEGORIES FROM API */

fetch("https://www.themealdb.com/api/json/v1/1/categories.php")

    .then((response) => {

        return response.json();

    })

    .then((data) => {

        console.log(data);

        data.categories.forEach((category) => {


            /* MAIN CATEGORY CARD */

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

    })

    .catch((error) => {

        console.log(error);

    });


/* MAIN CATEGORY CLICK */

categoryContainer.addEventListener("click", function (event) {

    let card =
        event.target.closest(".category-card");

    if (card) {

        let categoryName =
            card.dataset.category;

        window.location.href =
            `meals.html?category=${categoryName}`;

    }

});


/* SIDEBAR CATEGORY CLICK */

menuCategories.addEventListener("click", function (event) {

    if (
        event.target.classList.contains("menu-category")
    ) {

        let categoryName =
            event.target.dataset.category;

        window.location.href =
            `meals.html?category=${categoryName}`;

    }

});


/* SEARCH */

search.addEventListener("input", function () {

    let searchValue =
        search.value.toLowerCase();

    if (searchValue !== "") {

        window.location.href =
            `meals.html?search=${searchValue}`;

    }

});