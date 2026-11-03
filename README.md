# CircuitLab — Electrical Calculator

A lightweight, responsive electrical calculator built with HTML, CSS and vanilla JavaScript. CircuitLab provides quick calculations for Ohm's Law and electrical power in a clean engineering-inspired interface.

## Features

- Calculate current, voltage, resistance and electrical power.
- Automatic recalculation as values change.
- Formula and substitution breakdown for each result.
- Input validation, including protection against division by zero.
- Responsive dark interface for desktop and mobile.
- Reset to the default example values.

## Built with

- HTML5
- CSS3
- Vanilla JavaScript
- Google Fonts (Manrope and DM Mono)

## Run locally

No installation or build tools are required.

1. Download or clone this repository.
2. Open `index.html` in your browser.

## Deploy with GitHub Pages

1. Push the project files to a GitHub repository.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and `/ (root)` folder.
5. Save. GitHub Pages will publish the website.

## Calculation formulas

| Quantity | Formula |
|---|---|
| Current | I = V / R |
| Voltage | V = I × R |
| Resistance | R = V / I |
| Power | P = V × I |

All inputs are treated as non-negative SI values. Resistance or current used as a divisor must be greater than zero.

## Project structure

```text
circuitlab/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
```

## License

This project is open source under the MIT License. Add a `LICENSE` file if you choose to distribute it under that license.
