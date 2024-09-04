function changeSize(gridSize) {

    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }

    for (let i = 0; i < gridSize; i++) {
        const row = document.createElement("div");

        row.classList.add("grid-row-style");
        gridContainer.appendChild(row);

        for (let j = 0; j < gridSize; j++) {
            let cell = document.createElement("div");

            cell.classList.add("grid-cell-style");
            row.appendChild(cell);

            changeInkColor(cell, "blackFill");

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

function shiftMode() {
    
    if (eraseMode) {
        btnEraser.classList.add("btn-highlight");

        for (let i = 0; i < gridContainer.children.length; i++) {
            let shiftRows = gridContainer.children[i];
            for (let j = 0; j < shiftRows.children.length; j++) {
                let shiftCells = shiftRows.children[j];
                changeInkColor(shiftCells, "whiteFill");
            }
        }
    }
    else {
        btnEraser.classList.remove("btn-highlight");

        for (let i = 0; i < gridContainer.children.length; i++) {
            let shiftRows = gridContainer.children[i];
            for (let j = 0; j < shiftRows.children.length; j++) {
                let shiftCells = shiftRows.children[j];
                changeInkColor(shiftCells, "blackFill");
            }
        }
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

function changeInkColor (cells, colorClass) {
    
    cells.addEventListener("mousedown", (e) => {
        e.preventDefault();
        isMouseDown = true;

        if(colorClass === 'blackFill') {
            cells.classList.remove("whiteFill");
        }
        else {
            cells.classList.remove("blackFill");
        }

        cells.classList.add(colorClass);  
    });

    cells.addEventListener("mouseup", () => {
        isMouseDown = false;
    });

    cells.addEventListener("mouseover", () => {

        if (isMouseDown) {
            if(colorClass === 'blackFill') {
                cells.classList.remove("whiteFill");
            }
            else {
                cells.classList.remove("blackFill");
            }

            cells.classList.add(colorClass);
        }
    });

    gridContainer.addEventListener("mouseleave", () => {
        isMouseDown = false;
    }); 
}

let isMouseDown = false;
const gridContainer = document.querySelector("#grid-container");
changeSize(16);

const btnNewGrid = document.querySelector("#btnNewGrid");
btnNewGrid.addEventListener("click", checkInput);

const btnClear = document.querySelector("#btnClear");
btnClear.addEventListener("click", () => {

    for (let i = 0; i < gridContainer.children.length; i++) {
        let clearRows = gridContainer.children[i];

        for (let j = 0; j < clearRows.children.length; j++) {
            let clearCells = clearRows.children[j];
            clearCells.classList.remove("blackFill");
        }   
    }
});

const btnEraser = document.querySelector("#btnEraser");
const btnRandColor = document.querySelector("#btnRandColor");
const btnDarkening = document.querySelector("#btnDarkening");

let eraseMode = false;
let randMode = false;
let darkMode = false;

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

// const btnClicked = document.querySelectorAll(".highlight");

// btnClicked.forEach(btn => {
//     btn.addEventListener("click", (event) => {
//         const btnID = event.target.id;
//         const button = document.querySelector(`#${btnID}`);

//         switch (btnID) {

//             case 'btnEraser':
//                 eraseMode = !eraseMode;
//                 shiftMode(button, btnID);
//             case 'btnRandColor':
//                 randMode = !randMode;
//                 shiftMode(button, btnID);
//             case 'btnDarkening':
//                 darkMode = !darkMode;
//                 shiftMode(button, btnID);
            
//             // case 'btnEraser':
//             // case 'btnRandColor':
//             // case 'btnDarkening':
//             //     shiftMode(button, btnID);
//         }
//     });
// });


// btnEraser.addEventListener("click", () => {
//     eraseMode = !eraseMode;
//     shiftMode();
// });


// const btnClicked = document.querySelectorAll(".highlight");
// btnClicked.forEach(btn => {

//     let oldMode = false;
//     let newMode;
//     btn.addEventListener("click", (event) => {
//         let btnID = event.target.id;
//         const button = document.querySelector(`#${btnID}`);

//         switch(btnID) {
//             case 'btnEraser':
//                 btnRandColor.style.cssText = "";
//                 btnDarkening.style.cssText = "";

//             case 'btnRandColor':
//             case 'btnDarkening':
//                 btnEraser.style.cssText = "";
                
//             case 'btnEraser':
//             case 'btnRandColor':
//             case 'btnDarkening':
//                 newMode = !oldMode;
//                 if (newMode === true) {
//                     button.style.cssText = "background-color: blueviolet; color: yellow;";
//                 }
//                 else {
//                     button.style.cssText = "";
//                 }
                
//                 oldMode = newMode;
//         }
//     });
// });

