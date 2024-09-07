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

            cellArr.push(cell);

            opacityArr[cellArr.indexOf(cell)] = 0.1;

            isColoredArr[cellArr.indexOf(cell)] = false;
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

function changeInkColor (e) {
    const index = cellArr.indexOf(e.target);

    if (eraseMode || randMode || darkMode) {
        if (eraseMode) {
            cellColor = "";
            cellArr[index].style.backgroundColor = cellColor;
            isColoredArr[index] = false;
        }
        else {
            if (randMode) {
                isColoredArr[index] = true;
            }
            else {
                cellColor = "black";
            }
    
            if (darkMode) {
                cellArr[index].style.opacity = opacityArr[index];
                if (opacityArr[index] < 1) {
                    opacityArr[index] += 0.1;
                }
            }
            else {
                cellArr[index].style.opacity = "1";
            }
        }
        
    }
    else {
        cellColor = "black";
        cellArr[index].style.opacity = "1";
        cellArr[index].style.backgroundColor = cellColor;
    }
    
    if (!isColoredArr[index]) {
        cellArr[index].style.backgroundColor = cellColor;
    }
}

function randomizeBGC () {
    const RED = Math.floor(Math.random() * 256);
    const GREEN = Math.floor(Math.random() * 256);
    const BLUE = Math.floor(Math.random() * 256);

    return `rgb(${RED}, ${GREEN}, ${BLUE})`;
}

let isMouseDown = false;
const cellArr = [];
const opacityArr = [];
const isColoredArr = [];
let cellColor = 'black';

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
            clearCells.style.backgroundColor = "";
        }   
    }
});

const btnEraser = document.querySelector("#btnEraser");
const btnRandColor = document.querySelector("#btnRandColor");
const btnDarkening = document.querySelector("#btnDarkening");

let eraseMode = false;
let randMode = false;
let darkMode = false;


btnEraser.addEventListener("click", (e) => {
    eraseMode = !eraseMode;
    randMode = false;
    darkMode = false;
    shiftMode();
});

btnRandColor.addEventListener("click", (e) => {
    randMode = !randMode;
    eraseMode = false;
    shiftMode();
});

btnDarkening.addEventListener("click", (e) => {
    darkMode = !darkMode;
    eraseMode = false;
    shiftMode();
});


gridContainer.addEventListener("mousedown", (e) => {
    e.preventDefault();
    isMouseDown = true;

    const index = cellArr.indexOf(e.target);
    
    if (randMode && !isColoredArr[index]) {
        cellColor = randomizeBGC();
        cellArr[index].style.backgroundColor = cellColor;
    }

    changeInkColor(e);
});

gridContainer.addEventListener("mouseup", () => {
    isMouseDown = false;
});

gridContainer.addEventListener("mouseover", (e) => {

    if (isMouseDown) {

        const index = cellArr.indexOf(e.target);

        if (randMode && !isColoredArr[index]) {
            cellColor = randomizeBGC();
            cellArr[index].style.backgroundColor = cellColor;
        }

        changeInkColor(e);
    }
});

gridContainer.addEventListener("mouseleave", () => {
    isMouseDown = false;
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

// for (let i = 0; i < gridContainer.children.length; i++) {
        //     let shiftRows = gridContainer.children[i];
        //     for (let j = 0; j < shiftRows.children.length; j++) {
        //         let shiftCells = shiftRows.children[j];
        //         changeInkColor(shiftCells, "white");
        //     }
        // }

