/* GET ELEMENTS */

let categoryContainer = document.getElementById("categoryContainer");

let menuBtn = document.getElementById("menubtn");

let closeBtn = document.getElementById("closebtn");

let sidebar = document.getElementById("sidebar");

let menuCategories = document.getElementById("menuCategories");

let searchInput = document.getElementById("searchInput");

let searchBtn = document.getElementById("searchBtn");

/* OPEN HAMBURGER */

menuBtn.addEventListener("click", function () {
  sidebar.classList.add("active");
});

/* CLOSE HAMBURGER */

closeBtn.addEventListener("click", function () {
    sidebar.classList.remove("active");
});

/* GET CATEGORIES FROM API */

async function getCategories() {
    try {
        let response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        let data = await response.json();
        console.log(data);

        data.categories.forEach(function (category) {

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
                    <p class="category-description">
                        ${category.strCategoryDescription}
                    </p>
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
getCategories();

/* MAIN CATEGORY CLICK */

categoryContainer.addEventListener("click", function (event) {
    let card = event.target.closest(".category-card");
    if (card) {
        let categoryName = card.dataset.category;
        window.location.href = `meals.html?category=${encodeURIComponent(categoryName)}`;
    }
});

/* SIDEBAR CATEGORY CLICK */

menuCategories.addEventListener("click", function (event) {
    if (
        event.target.classList.contains("menu-category")
    ) {
        let categoryName = event.target.dataset.category;
        window.location.href = `meals.html?category=${encodeURIComponent(categoryName)}`;
    }
});

/* SEARCH */

searchBtn.addEventListener("click", function () {
    let searchValue = searchInput.value.trim();
    if (searchValue !== "") {
        window.location.href = `meals.html?search=${encodeURIComponent(searchValue)}`;
    }
});