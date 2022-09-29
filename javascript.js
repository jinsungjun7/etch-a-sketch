
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

        let light = window.getComputedStyle(cell).backgroundColor;
        console.log(light);
        light = getHSLfromRGB(light);
        console.log(light);
        cell.addEventListener('mouseenter', (e) => {
            if (light < .1) {
                cell.style.backgroundColor = `hsl(0, 0%, 10%)`;
            } else {
                cell.style.backgroundColor = `hsl(0, 0%, ${light+10}%)`;
                console.log("hi")
            }
        });
    });
}

function getHSLfromRGB(rgba) {
    let sep = rgba.indexOf(",") > -1 ? "," : " ";
    rgba = rgba.substr(5).split(")")[0].split(sep);

    // Strip the slash if using space-separated syntax
    if (rgba.indexOf("/") > -1) 
      rgba.splice(3,1);

    for (let R in rgba) {
      let r = rgba[R];
      if (r.indexOf("%") > -1) {
        let p = r.substr(0,r.length - 1) / 100;

        if (R < 3) { 
          rgba[R] = Math.round(p * 255);
        } else {
          rgba[R] = p;
        }
      }
    }

    // Make r, g, and b fractions of 1
    let r = rgba[0] / 255,
        g = rgba[1] / 255,
        b = rgba[2] / 255,
        a = rgba[3];
    // Make r, g, and b fractions of 1
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;
  // Calculate hue
  // No difference
  if (delta == 0)
    h = 0;
  // Red is max
  else if (cmax == r)
    h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g)
    h = (b - r) / delta + 2;
  // Blue is max
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);
    
  // Make negative hues positive behind 360°
  if (h < 0)
      h += 360;
return l;


}

const btn = document.querySelector('.gridSize');
btn.addEventListener('click', (e) => {
    let size = prompt("What size do you want the grid to be?");
    gridClear();
    gridCreate(size);
    hover();
});


