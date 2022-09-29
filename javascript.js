
let gridContainer = document.querySelector('.container');

document.addEventListener('DOMContentLoaded', () => {
    gridCreate();
    hover();

});

function gridCreate(size = 16) {
    for (i=1; i<=size; i++) {
        let colDiv = document.createElement('div');
        colDiv.classList.toggle('column');

        colDiv.style.display = 'flex';
        colDiv.style.flexDirection = 'column';
        colDiv.style.height = '100%';
        colDiv.style.flex = '1 1 auto';
        for (j=1; j<=size; j++) {
            let rowDiv = document.createElement('div');
            rowDiv.classList.toggle('cell')
            rowDiv.style.height = '100%';
            rowDiv.style.flex = '1 1 auto';
            colDiv.appendChild(rowDiv);            
        }   
             
        gridContainer.appendChild(colDiv);
    }
}

function gridClear() {
    const colDiv = document.querySelectorAll('.column');
    colDiv.forEach((col) => {
        console.log('removed');
        gridContainer.removeChild(col);
    })
}

function hover() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
        cell.addEventListener('mouseenter', (e) => {
            let v1 = Math.floor(Math.random()*256);
            console.log(v1);
            let v2 = Math.floor(Math.random()*256);
            let v3 = Math.floor(Math.random()*256);
            cell.style.backgroundColor = `rgb(${v1}, ${v2}, ${v3})`;
        });
        cell.addEventListener('mouseleave', (e) => {
            cell.style.backgroundColor = '';
        });
    });
}

const btn = document.querySelector('.gridSize');
btn.addEventListener('click', (e) => {
    let size = prompt("What size do you want the grid to be?");
    gridClear();
    gridCreate(size);
    hover();
});


