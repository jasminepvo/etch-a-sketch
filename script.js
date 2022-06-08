// Select elements from DOM
const sketchGrid = document.querySelector("#sketch-grid");
const gridSize = document.querySelector("#grid-size");
const colorPicker = document.querySelector("#color-picker");
const buttons = document.querySelectorAll("button");
const sliderLabel = document.querySelectorAll("#slider-label");
let color = colorPicker.value;
let random = false;

// Call functions
createDivs();
updateText();

// Sets default grid size to 16 x 16
sketchGrid.style.gridTemplateColumns = `repeat(${gridSize.value}, 1fr)`;

// Creates the divs on the page using JavaScript
function createDivs() {
  for (let i = 0; i < Math.pow(gridSize.value, 2); i++) {
    const div = document.createElement("div");
    sketchGrid.append(div);
  }
}

// Set up a “hover” effect so that the grid divs change color when your mouse passes over them, leaving a (pixelated) trail through your grid like a pen would.
sketchGrid.addEventListener("mouseover", (e) => {
  if (e.target.matches("div")) {
    e.target.style.backgroundColor = color;
    if (random === true) updateColor();
  }
});

// Slider adjusts the grid size
gridSize.addEventListener("click", () => {
  sketchGrid.replaceChildren();
  sketchGrid.style.gridTemplateColumns = `repeat(${gridSize.value}, 1fr)`;
  updateText();
  createDivs();
});

// Updates the grid size labels on the page
function updateText() {
  sliderLabel.forEach((label) => {
    label.innerText = gridSize.value;
  });
}

// Updates the color when selected on Color Picker
colorPicker.addEventListener("change", () => (color = colorPicker.value));

// Buttons
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.id == "btn-color") {
      color = colorPicker.value;
      random = false;
    } else if (button.id == "btn-eraser") {
      color = "var(--main--grey)";
      random = false;
    } else if (button.id == "btn-rainbow") {
      random = true;
    } else {
      sketchGrid.replaceChildren();
      sketchGrid.style.gridTemplateColumns = `repeat(${gridSize.value}, 1fr)`;
      createDivs();
    }
  });
});

// Selects the random colors for rainbow effect
function updateColor() {
  color = `hsl(${Math.random() * 360}, 100%, 50%)`;
}
