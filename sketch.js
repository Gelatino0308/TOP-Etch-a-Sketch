
function changeSize(gridSize) {
    const gridContainer = document.querySelector("#grid-container");

    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }

    let isMouseDown = false;

    for (let i = 0; i < gridSize; i++) {
        const row = document.createElement("div");

        row.classList.add("grid-row-style");
        gridContainer.appendChild(row);

        for (let j = 0; j < gridSize; j++) {
            let cell = document.createElement("div");

            cell.classList.add("grid-cell-style");
            row.appendChild(cell);

            cell.addEventListener("mousedown", (e) => {
                e.preventDefault();
                isMouseDown = true;
                cell.classList.add("highlighted");  
            });

            cell.addEventListener("mouseup", () => {
                isMouseDown = false;
            });

            cell.addEventListener("mouseover", () => {
                if (isMouseDown) {
                    cell.classList.add("highlighted");
                }
            });
        }
    }
}

changeSize(16);

const btnNewGrid = document.querySelector("#btnNewGrid");

btnNewGrid.addEventListener("click", () => {
    let input = prompt("Enter the new dimension size (min: 2, max: 100):");

    while (input < 2 || input > 100) {
        input = prompt("Input out of range. Enter dimension size greater than or equal to 2 and less than or equal to 100:");
    }

    changeSize(input);
});

