const gridContainer = document.querySelector("#grid-container");

let gridSize = 16;

for (let i = 0; i < gridSize; i++) {
    const row = document.createElement("div");

    row.classList.add("grid-row-style");
    gridContainer.appendChild(row);

    for (let j = 0; j < gridSize; j++) {
        let cell = document.createElement("div");

        cell.classList.add("grid-cell-style");
        row.appendChild(cell);
    }
}