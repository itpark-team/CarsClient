//ui elements
let divCarsList = document.getElementById("div-cars-list");

let inputName = document.getElementById("input-name");
let inputReleaseYear = document.getElementById("input-release-year");
let inputPrice = document.getElementById("input-price");

//variables
let cars = [];

function showCars() {
    let tableHtml = "";
    tableHtml += `<table class="table mb-4">`;
    tableHtml +=
        `<thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Название</th>
            <th scope="col">Год выпуска</th>
            <th scope="col">Цена (руб.)</th>
            <th scope="col">Действия</th>
        </tr>
        </thead>`;

    tableHtml += "<tbody>";

    cars.forEach((car, index) => {
        tableHtml += "<tr>";
        tableHtml += `<th scope="row">${index + 1}</th>`;
        tableHtml += `<td>${car.name}</td>`;
        tableHtml += `<td>${car.releaseYear}</td>`;
        tableHtml += `<td>${car.price}</td>`;
        tableHtml += `<td>
                        <button type="submit" class="btn btn-danger" onclick="deleteCarById(${car.id})">Удалить</button>
                     </td>`;
        tableHtml += "</tr>";
    });

    tableHtml += "</tbody>";
    tableHtml += "</table>";

    divCarsList.innerHTML = tableHtml;
}

async function loadCars() {
    let response = await fetch("https://localhost:7043/cars/get-all");

    if (response.ok) {
        cars = await response.json();
        console.dir(cars);

        showCars();
    }
}

async function deleteCarById(id) {
    let response = await fetch(`https://localhost:7043/cars/delete-by-id/${id}`, {
        method: "DELETE"
    });

    if (response.ok) {
        await loadCars();
    }
}

async function addNewCar() {
    let car = {
        name: inputName.value,
        releaseYear: inputReleaseYear.value,
        price: inputPrice.value
    }

    let response = await fetch(`https://localhost:7043/cars/add-new`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(car),
    });

    if (response.ok) {
        await loadCars();

        inputName.value = "";
        inputReleaseYear.value = "";
        inputPrice.value = "";
    }
}
