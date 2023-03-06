// fetch BASE_URL API

const BASE_URL = "https://swapi.dev/api";
let currentCollection = null;
let currentCollectionName = null;
let pageNumber = 1;

// next - prev Button

const $prevButton = document.getElementById("prev");
const $nextButton = document.getElementById("next");

$prevButton.addEventListener("click", (event) => {
  if (pageNumber === 1) {
    return;
  }
  pageNumber--;

  buttonClicked(event);
});

$nextButton.addEventListener("click", (event) => {
  console.log(currentCollection);
  if (currentCollection) {
    pageNumber++;
  }
  buttonClicked(event);
});

// async function

async function getApi() {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  const buttons = document.getElementById("buttons");

  for (const [key, value] of Object.entries(data)) {
    console.log(`${key}: ${value}`);

    const button = document.createElement("button");
    button.innerHTML = key.toUpperCase();
    button.onclick = buttonClicked;
    buttons.appendChild(button);
  }
}

getApi();

// hide tabels when change on the other tabel

const hideAllTables = () => {
  const tables = document.querySelectorAll("table");
  tables.forEach((table) => table.remove());
};

async function fetchFunction() {
  try {
    const response = await fetch(
      `${BASE_URL}/${currentCollectionName}?page=${pageNumber}`
    );
    currentCollection = await response.json();
    console.log(currentCollection);
  } catch (error) {
    console.error("Error:", error);
  }
}

// create class - Base and Other

class Base {
  constructor(name, url, created) {
    this.name = name;
    this.url = url;
    this.created = created;
  }
}

class Vechicle extends Base {
  constructor(
    name,
    url,
    created,
    cost_in_credits,
    model,
    vehicle_class,
    manufacturer,
    length,
    crew,
    passengers
  ) {
    super(name, url, created);
    this.cost_in_credits = cost_in_credits;
    this.model = model;
    this.vehicle_class = vehicle_class;
    this.manufacturer = manufacturer;
    this.length = length;
    this.crew = crew;
    this.passengers = passengers;
  }
}

class People extends Base {
  constructor(
    name,
    url,
    created,
    height,
    mass,
    gender,
    birth_year,
    hair_color,
    eye_color
  ) {
    super(name, created, url);
    this.height = height;
    this.mass = mass;
    this.gender = gender;
    this.birth_year = birth_year;
    this.hair_color = hair_color;
    this.eye_color = eye_color;
  }
}

class Planets extends Base {
  constructor(
    name,
    url,
    created,
    climate,
    orbital_period,
    rotation_period,
    population,
    surface_water,
    terrain,
    diameter
  ) {
    super(name, created, url);
    this.climate = climate;
    this.orbital_period = orbital_period;
    this.rotation_period = rotation_period;
    this.population = population;
    this.surface_water = surface_water;
    this.terrain = terrain;
    this.diameter = diameter;
  }
}
class Films extends Base {
  constructor(
    name,
    url,
    created,
    title,
    episode_id,
    director,
    producer,
    release_date,
    opening_crawl
  ) {
    super(name, created, url);
    this.title = title;
    this.episode_id = episode_id;
    this.director = director;
    this.producer = producer;
    this.release_date = release_date;
    this.opening_crawl = opening_crawl;
  }
}
class Species extends Base {
  constructor(
    name,
    url,
    created,
    classification,
    designation,
    language,
    average_lifespan,
    skin_colors
  ) {
    super(name, url, created);
    (this.classification = classification),
      (this.designation = designation),
      (this.language = language),
      (this.average_lifespan = average_lifespan);
    this.skin_colors = skin_colors;
  }
}

class Starships extends Base {
  constructor(name, url, created, manufacturer, cost_in_credits, consumables) {
    super(name, url, created);
    (this.manufactur = manufacturer),
      (this.cost_in_credits = cost_in_credits),
      (this.consumables = consumables);
  }
}

// button Clicked - creates tables based on api data, has button functions, uses swich case when creating a table.

const buttonClicked = async (event) => {
  const buttonName = event.target.innerHTML.toLowerCase();
  if (!["next", "prev"].includes(buttonName)) {
    currentCollectionName = buttonName;
  }
  await fetchFunction();

  const table = document.createElement("table");
  //table.setAttribute("border", "1");

  const tableContainer = document.createElement("div");
  tableContainer.id = "table-container";
  document.body.appendChild(tableContainer);

  let counter = 0; // for index on tabel.
  switch (currentCollectionName) {
    case "people":
      let headerRow = table.insertRow();
      let numberIndex = headerRow.insertCell();
      numberIndex.innerHTML = "ID";
      let headerName = headerRow.insertCell();
      headerName.innerHTML = "Name";
      let headerMass = headerRow.insertCell();
      headerMass.innerHTML = "Mass";
      let headerHeight = headerRow.insertCell();
      headerHeight.innerHTML = "Height";
      let headerGender = headerRow.insertCell();
      headerGender.innerHTML = "Gender";
      let birthYear = headerRow.insertCell();
      birthYear.innerHTML = "Birth Year";
      let detail = headerRow.insertCell();
      detail.innerHTML = "Details";

      currentCollection.results.forEach((result) => {
        counter++;
        hideAllTables();
        const people = new People(
          result.name,
          result.url,
          result.created,
          result.height,
          result.mass,
          result.gender,
          result.birth_year,
          result.hair_color,
          result.eye_color
        );

        let dataRow = table.insertRow();
        let number = dataRow.insertCell();
        number.innerHTML = counter + (pageNumber - 1) * 10; // add index number on next/prev page.
        let name = dataRow.insertCell();
        name.innerHTML = people.name;
        let mass = dataRow.insertCell();
        mass.innerHTML = people.mass;
        let height = dataRow.insertCell();
        height.innerHTML = people.height;
        let gender = dataRow.insertCell();
        gender.innerHTML = people.gender;
        let age = dataRow.insertCell();
        age.innerHTML = people.birth_year;

        // button details
        let detail = dataRow.insertCell();
        let detailsButton = document.createElement("button");
        detailsButton.innerHTML = "Details";
        detailsButton.onclick = function () {
          let detailsDiv = document.getElementById("details");
          detailsDiv.innerHTML =
            "Hair: " +
            people.hair_color +
            "<br>" +
            "Eyes: " +
            people.eye_color +
            "<br>" +
            "Height: " +
            people.height +
            " cm";

          detailsDiv.classList.toggle("hidden");

          // close button for details
          const closeButton = document.createElement("button");
          closeButton.innerText = "Close";
          closeButton.addEventListener("click", () => {
            detailsDiv.classList.add("hidden");
          });
          detailsDiv.appendChild(closeButton);
        };
        detail.appendChild(detailsButton);
      });

      break;
    case "vehicles":
      //
      let headerRow1 = table.insertRow();
      let numberIndex1 = headerRow1.insertCell();
      numberIndex1.innerHTML = "ID";
      let vechicle = headerRow1.insertCell();
      vechicle.innerHTML = "Name";
      let model = headerRow1.insertCell();
      model.innerHTML = "Model";
      let manufacturer = headerRow1.insertCell();
      manufacturer.innerHTML = "Manufacturer";
      let cost = headerRow1.insertCell();
      cost.innerHTML = "Cost in Credits";
      let clas = headerRow1.insertCell();
      clas.innerHTML = "Vechicle Class";
      let detail1 = headerRow1.insertCell();
      detail1.innerHTML = "Details";
      //
      currentCollection.results.forEach((result) => {
        counter++;
        hideAllTables();
        const vehicle = new Vechicle(
          result.name,
          result.url,
          result.created,
          result.cost_in_credits,
          result.model,
          result.vehicle_class,
          result.manufacturer,
          result.length,
          result.crew,
          result.passengers
        );

        let dataRow = table.insertRow();
        let number = dataRow.insertCell();
        number.innerHTML = counter + (pageNumber - 1) * 10; // add index number on next/prev page.
        let name = dataRow.insertCell();
        name.innerHTML = vehicle.name;
        let model = dataRow.insertCell();
        model.innerHTML = vehicle.model;
        let manufactur = dataRow.insertCell();
        manufactur.innerHTML = vehicle.manufacturer;
        let cost = dataRow.insertCell();
        cost.innerHTML = vehicle.cost_in_credits;
        let clas = dataRow.insertCell();
        clas.innerHTML = vehicle.vehicle_class;

        // button details
        let detail1 = dataRow.insertCell();
        let detailsButton1 = document.createElement("button");
        detailsButton1.innerHTML = "Details";
        detailsButton1.onclick = function () {
          let detailsDiv1 = document.getElementById("details");
          detailsDiv1.innerHTML =
            "Length:" +
            vehicle.length +
            "<br>" +
            "Crew: " +
            vehicle.crew +
            "<br>" +
            "Passengers: " +
            vehicle.passengers;

          detailsDiv1.classList.toggle("hidden");

          // close button for details
          const closeButton = document.createElement("button");
          closeButton.innerText = "Close";
          closeButton.addEventListener("click", () => {
            detailsDiv1.classList.add("hidden");
          });
          detailsDiv1.appendChild(closeButton);
        };
        detail1.appendChild(detailsButton1);
      });
      break;
    case "planets":
      //
      let headerRow2 = table.insertRow();
      let numberIndex2 = headerRow2.insertCell();
      numberIndex2.innerHTML = "ID";
      let planetName = headerRow2.insertCell();
      planetName.innerHTML = "Name";
      let headerRotation = headerRow2.insertCell();
      headerRotation.innerHTML = "Rotation Period";
      let headerOrbital = headerRow2.insertCell();
      headerOrbital.innerHTML = "Orbital Period";
      let headerClimate = headerRow2.insertCell();
      headerClimate.innerHTML = "Climate";
      let population = headerRow2.insertCell();
      population.innerHTML = "Population";
      let detailPlanets = headerRow2.insertCell();
      detailPlanets.innerHTML = "Details";
      //
      currentCollection.results.forEach((result) => {
        counter++;
        hideAllTables();
        const planet = new Planets(
          result.name,
          result.url,
          result.created,
          result.climate,
          result.orbital_period,
          result.rotation_period,
          result.population,
          result.surface_water,
          result.terrain,
          result.diameter
        );

        let dataRow = table.insertRow();
        let number = dataRow.insertCell();
        number.innerHTML = counter + (pageNumber - 1) * 10; // add index number on next/prev page.
        let name = dataRow.insertCell();
        name.innerHTML = planet.name;
        let rotation = dataRow.insertCell();
        rotation.innerHTML = planet.rotation_period;
        let orbital = dataRow.insertCell();
        orbital.innerHTML = planet.orbital_period;
        let climate = dataRow.insertCell();
        climate.innerHTML = planet.climate;
        let people = dataRow.insertCell();
        people.innerHTML = planet.population;

        // button details
        let detailPlanets = dataRow.insertCell();
        let detailsButton2 = document.createElement("button");
        detailsButton2.innerHTML = "Details";
        detailsButton2.onclick = function () {
          let detailsDiv2 = document.getElementById("details");
          detailsDiv2.innerHTML =
            "Surface Water: " +
            planet.surface_water +
            "<br>" +
            "Terrain: " +
            planet.terrain +
            "<br>" +
            "Diameter: " +
            planet.diameter;

          detailsDiv2.classList.toggle("hidden");

          // close button for details
          const closeButton2 = document.createElement("button");
          closeButton2.innerText = "Close";
          closeButton2.addEventListener("click", () => {
            detailsDiv2.classList.add("hidden");
          });
          detailsDiv2.appendChild(closeButton2);
        };
        detailPlanets.appendChild(detailsButton2);
      });
      break;
    case "films":
      //
      let headerRow3 = table.insertRow();
      let numberIndex3 = headerRow3.insertCell();
      numberIndex3.innerHTML = "ID";
      let title = headerRow3.insertCell();
      title.innerHTML = "Title";
      let episod = headerRow3.insertCell();
      episod.innerHTML = "Episod ID";
      let director = headerRow3.insertCell();
      director.innerHTML = "Director";
      let producer = headerRow3.insertCell();
      producer.innerHTML = "Producer";
      let relase = headerRow3.insertCell();
      relase.innerHTML = "Relase Date";
      let detail3 = headerRow3.insertCell();
      detail3.innerHTML = "Details";

      //
      currentCollection.results.forEach((result) => {
        counter++;
        hideAllTables();
        const film = new Films(
          result.name,
          result.url,
          result.created,
          result.title,
          result.episode_id,
          result.director,
          result.producer,
          result.release_date,
          result.opening_crawl
        );

        let dataRow = table.insertRow();
        let number = dataRow.insertCell();
        number.innerHTML = counter + (pageNumber - 1) * 10; // add index number on next/prev page.
        let title = dataRow.insertCell();
        title.innerHTML = film.title;
        let episod = dataRow.insertCell();
        episod.innerHTML = film.episode_id;
        let director = dataRow.insertCell();
        director.innerHTML = film.director;
        let producer = dataRow.insertCell();
        producer.innerHTML = film.producer;
        let relase = dataRow.insertCell();
        relase.innerHTML = film.release_date;

        // button details
        let detail3 = dataRow.insertCell();
        let detailsButton3 = document.createElement("button");
        detailsButton3.innerHTML = "Details";
        detailsButton3.onclick = function () {
          let detailsDiv3 = document.getElementById("details");
          detailsDiv3.innerHTML = " ' " + film.opening_crawl + " ' ";

          detailsDiv3.classList.toggle("hidden");

          // close button for details
          const closeButton3 = document.createElement("button");
          closeButton3.innerText = "Close";
          closeButton3.addEventListener("click", () => {
            detailsDiv3.classList.add("hidden");
          });
          detailsDiv3.appendChild(closeButton3);
        };
        detail3.appendChild(detailsButton3);
      });
      break;
    case "species":
      //
      let headerRow4 = table.insertRow();
      let numberIndex4 = headerRow4.insertCell();
      numberIndex4.innerHTML = "ID";
      let name5 = headerRow4.insertCell();
      name5.innerHTML = "Name";
      let manufacturer5 = headerRow4.insertCell();
      manufacturer5.innerHTML = "Manufacturer";
      let design = headerRow4.insertCell();
      design.innerHTML = "Designation";
      let language = headerRow4.insertCell();
      language.innerHTML = "Language";
      let lifeTime = headerRow4.insertCell();
      lifeTime.innerHTML = "Average Lifetime";
      let detail4 = headerRow4.insertCell();
      detail4.innerHTML = "Details";
      //
      currentCollection.results.forEach((result) => {
        counter++;
        hideAllTables();
        const species = new Species(
          result.name,
          result.url,
          result.created,
          result.classification,
          result.designation,
          result.language,
          result.average_lifespan,
          result.skin_colors
        );

        let dataRow = table.insertRow();
        let number = dataRow.insertCell();
        number.innerHTML = counter + (pageNumber - 1) * 10; // add index number on next/prev page.
        let name = dataRow.insertCell();
        name.innerHTML = species.name;
        let classification = dataRow.insertCell();
        classification.innerHTML = species.classification;
        let designation = dataRow.insertCell();
        designation.innerHTML = species.designation;
        let language = dataRow.insertCell();
        language.innerHTML = species.language;
        let life = dataRow.insertCell();
        life.innerHTML = species.average_lifespan;

        // button details
        let detail4 = dataRow.insertCell();
        let detailsButton4 = document.createElement("button");
        detailsButton4.innerHTML = "Details";
        detailsButton4.onclick = function () {
          let detailsDiv4 = document.getElementById("details");
          detailsDiv4.innerHTML =
            "Oooops we weren't prepared for this...." +
            "<br>" +
            "Please CLICK ENTER";

          detailsDiv4.classList.toggle("hidden");

          // close button for details
          const closeButton = document.createElement("button");
          closeButton.innerText = "Close";
          closeButton.addEventListener("click", () => {
            detailsDiv4.classList.add("hidden");
          });
          detailsDiv4.appendChild(closeButton);
        };
        detail4.appendChild(detailsButton4);
      });
      break;
    case "starships":
      //
      let headerRow5 = table.insertRow();
      let numberIndex5 = headerRow5.insertCell();
      numberIndex5.innerHTML = "ID";
      let name6 = headerRow5.insertCell();
      name6.innerHTML = "Name";
      let cost_in_credits5 = headerRow5.insertCell();
      cost_in_credits5.innerHTML = "Consumables";
      let consumables = headerRow5.insertCell();
      consumables.innerHTML = "Undefined";
      let detail5 = headerRow5.insertCell();
      detail5.innerHTML = "Details";

      //
      currentCollection.results.forEach((result) => {
        counter++;
        hideAllTables();
        const starships = new Starships(
          result.name,
          result.url,
          result.created,
          result.cost_in_credits,
          result.consumables
        );

        let dataRow = table.insertRow();
        let number = dataRow.insertCell();
        number.innerHTML = counter + (pageNumber - 1) * 10; // add index number on next/prev page.
        let name = dataRow.insertCell();
        name.innerHTML = starships.name;
        let classification = dataRow.insertCell();
        classification.innerHTML = starships.cost_in_credits;
        let consumables = dataRow.insertCell();
        consumables.innerHTML = starships.consumables;

        // button details
        let detail5 = dataRow.insertCell();
        let detailsButton5 = document.createElement("button");
        detailsButton5.innerHTML = "Details";
        detailsButton5.onclick = function () {
          let detailsDiv5 = document.getElementById("details");
          detailsDiv5.innerHTML =
            "Oooops we weren't prepared for this...." +
            "<br>" +
            "Please CLICK ENTER";

          detailsDiv5.classList.toggle("hidden");

          // close button for details
          const closeButton = document.createElement("button");
          closeButton.innerText = "Close";
          closeButton.addEventListener("click", () => {
            detailsDiv5.classList.add("hidden");
          });
          detailsDiv5.appendChild(closeButton);
        };
        detail5.appendChild(detailsButton5);
      });
      break;
    default:
      console.log("Nieznana kategoria");
  }

  const container = document.getElementById("table-container");
  container.appendChild(table);
};
// searchbar for page number

const $searchInput = document.getElementById("searchInput");
const $searchButton = document.getElementById("searchButton");

$searchButton.addEventListener("click", () => {
  const page = $searchInput.value;
  if (page >= 1 && page <= 10) {
    pageNumber = page;
    buttonClicked({ target: { innerHTML: currentCollectionName } });
  } else {
    alert("Podana strona nie istnieje");
  }
});

/////// search for value
const $searchButtonOne = document.getElementById("searchButtonOne");
$searchButtonOne.addEventListener("click", () => {
  const searchInputOne = document.getElementById("searchInputOne").value;
  const filteredCollection = currentCollection.results.filter((item) =>
    item.name.toLowerCase().includes(searchInputOne.toLowerCase())
  );

  const outputDiv = document.createElement("div");
  outputDiv.classList.add("search-div");
  outputDiv.textContent = JSON.stringify(filteredCollection);

  const outputContainer = document.getElementById("outputDiv");
  outputContainer.appendChild(outputDiv);

  const closeButton = document.createElement("button");
  closeButton.textContent = "Close";

  closeButton.addEventListener("click", (event) => {
    outputDiv.remove();
  });

  outputDiv.appendChild(closeButton);
});

// funny :)

document.body.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    // przekieruj użytkownika do innej strony
    window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  }
});
