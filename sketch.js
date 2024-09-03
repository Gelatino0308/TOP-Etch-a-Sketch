function changeSize(gridSize) {

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
                cell.classList.add("blackFill");  
            });

            cell.addEventListener("mouseup", () => {
                isMouseDown = false;
            });

            cell.addEventListener("mouseover", () => {
                if (isMouseDown) {
                    cell.classList.add("blackFill");
                }
            });
            gridContainer.addEventListener("mouseleave", () => {
                isMouseDown = false;
            }); 
        }
    }
}

function checkInput() {
    let input = prompt("Enter the new dimension size (min: 2, max: 100):");

    if (input) {
        input = input.trim();
        let parsedInput = parseInt(input);
        if (Number.isInteger(parsedInput) && input === parsedInput.toString()) {
            if (input < 2 || input > 100) {
                alert("Input out of range. Enter dimension size greater than or equal to 2 and less than or equal to 100.");
                checkInput();
            }
            else {
                changeSize(input);
            }
        }
        else {
            alert("Only non-negative integer values from 2-100 are allowed. Please enter correct value!");
            checkInput();
        }
    }
}

const gridContainer = document.querySelector("#grid-container");

changeSize(16);

const btnNewGrid = document.querySelector("#btnNewGrid");
btnNewGrid.addEventListener("click", checkInput);

const btnClear = document.querySelector("#btnClear");
btnClear.addEventListener("click", () => {
    
    for (let i = 0; i < gridContainer.children.length; i++) {
        let rows = gridContainer.children[i];
        for (let j = 0; j < rows.children.length; j++) {
            let cells = rows.children[j];
            cells.classList.remove("blackFill");
        }
    }
});

const btnEraser = document.querySelector("#btnEraser");
const btnRandColor = document.querySelector("#btnRandColor");
const btnDarkening = document.querySelector("#btnDarkening");

let eraseMode = false;
let randMode = false;
let darkMode = false;

function shiftMode() {
    if (eraseMode) {
        btnEraser.classList.add("btn-highlight");
    }
    else {
        btnEraser.classList.remove("btn-highlight");
    }

    if (randMode) {
        btnRandColor.classList.add("btn-highlight");
    }
    else {
        btnRandColor.classList.remove("btn-highlight");
    }

    if (darkMode) {
        btnDarkening.classList.add("btn-highlight");
    }
    else {
        btnDarkening.classList.remove("btn-highlight");
    }
}

btnEraser.addEventListener("click", () => {
    eraseMode = !eraseMode;
    randMode = false;
    darkMode = false;
    shiftMode();
});

btnRandColor.addEventListener("click", () => {
    randMode = !randMode;
    eraseMode = false;
    shiftMode();
});

btnDarkening.addEventListener("click", () => {
    darkMode = !darkMode;
    eraseMode = false;
    shiftMode();
});
