// ECO-Tune Calculator - JavaScript
// Evolve Technik - Fuel Savings Calculator

// Constants
const IMPROVEMENT_PERCENTAGE = 0.10; // 10% fixed improvement
const TUNE_COST = 1650; // Average ECU tune cost (AUD)

// DOM Elements
const annualKmEl = document.getElementById('annualKm');
const currentConsumptionEl = document.getElementById('currentConsumption');
const fuelPriceEl = document.getElementById('fuelPrice');
const annualSavingsEl = document.getElementById('annualSavings');
const monthlySavingsEl = document.getElementById('monthlySavings');
const consumptionChangeEl = document.getElementById('consumptionChange');
const paybackPeriodEl = document.getElementById('paybackPeriod');
const fiveYearSavingsEl = document.getElementById('fiveYearSavings');
const newAnnualCostEl = document.getElementById('newAnnualCost');
const calcBtn = document.getElementById('calcBtn');

// ROI Forecast Elements
const year1BarEl = document.getElementById('year1Bar');
const year2BarEl = document.getElementById('year2Bar');
const year3BarEl = document.getElementById('year3Bar');
const year4BarEl = document.getElementById('year4Bar');
const year5BarEl = document.getElementById('year5Bar');
const year1LabelEl = document.getElementById('year1Label');
const year2LabelEl = document.getElementById('year2Label');
const year3LabelEl = document.getElementById('year3Label');
const year4LabelEl = document.getElementById('year4Label');
const year5LabelEl = document.getElementById('year5Label');
const breakevenTextEl = document.getElementById('breakevenText');

// Utility Functions
function formatCurrency(value) {
  return value.toLocaleString('en-AU', { 
    style: 'currency', 
    currency: 'AUD', 
    maximumFractionDigits: 0 
  });
}

function formatCurrency2(value) {
  return value.toLocaleString('en-AU', { 
    style: 'currency', 
    currency: 'AUD', 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  });
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// Set ROI Bar Height and Label
function setBarHeight(barEl, labelEl, netValue) {
  const maxValue = Math.max(
    (annualSavingsEl.dataset.annual || 0) * 5 - TUNE_COST,
    0
  );
  const maxHeight = 180; // pixels
  
  const height = maxValue > 0 ? (Math.max(netValue, 0) / maxValue) * maxHeight : 0;
  barEl.querySelector('div').style.height = `${height}px`;
  labelEl.textContent = netValue >= 0 
    ? formatCurrency(netValue) 
    : `-${formatCurrency(Math.abs(netValue))}`;
  
  // Color coding: red if positive, dimmed if negative
  if (netValue >= 0) {
    barEl.querySelector('div').classList.remove('opacity-30');
    labelEl.classList.remove('text-white/40');
    labelEl.classList.add('text-evolveRed');
  } else {
    barEl.querySelector('div').classList.add('opacity-30');
    labelEl.classList.add('text-white/40');
    labelEl.classList.remove('text-evolveRed');
  }
}

// Main Calculation Function
function calculate() {
  // Get input values
  const annualKm = Math.max(parseFloat(annualKmEl.value) || 0, 0);
  const currentConsumption = Math.max(parseFloat(currentConsumptionEl.value) || 0, 0);
  const fuelPrice = Math.max(parseFloat(fuelPriceEl.value) || 0, 0);

  // Calculate costs
  const currentAnnualCost = (annualKm / 100) * currentConsumption * fuelPrice;
  const improvedConsumption = currentConsumption * (1 - IMPROVEMENT_PERCENTAGE);
  const newAnnualCost = (annualKm / 100) * improvedConsumption * fuelPrice;
  const annualSavings = Math.max(currentAnnualCost - newAnnualCost, 0);
  const monthlySavings = annualSavings / 12;
  const paybackMonths = annualSavings > 0 ? (TUNE_COST / annualSavings) * 12 : 0;
  const fiveYearSavings = annualSavings * 5;

  // Update display
  annualSavingsEl.textContent = formatCurrency(annualSavings);
  annualSavingsEl.dataset.annual = annualSavings; // Store for ROI calc
  monthlySavingsEl.textContent = formatCurrency2(monthlySavings);
  consumptionChangeEl.textContent = `${currentConsumption.toFixed(1)} → ${improvedConsumption.toFixed(1)} L/100km`;
  paybackPeriodEl.textContent = `${paybackMonths.toFixed(1)} months`;
  fiveYearSavingsEl.textContent = formatCurrency(fiveYearSavings);
  newAnnualCostEl.textContent = formatCurrency(newAnnualCost);

  // ROI Forecast Graph (5 years)
  const year1Net = annualSavings - TUNE_COST;
  const year2Net = (annualSavings * 2) - TUNE_COST;
  const year3Net = (annualSavings * 3) - TUNE_COST;
  const year4Net = (annualSavings * 4) - TUNE_COST;
  const year5Net = (annualSavings * 5) - TUNE_COST;
  
  setBarHeight(year1BarEl, year1LabelEl, year1Net);
  setBarHeight(year2BarEl, year2LabelEl, year2Net);
  setBarHeight(year3BarEl, year3LabelEl, year3Net);
  setBarHeight(year4BarEl, year4LabelEl, year4Net);
  setBarHeight(year5BarEl, year5LabelEl, year5Net);
  
  // Breakeven message
  if (annualSavings > 0) {
    const breakevenYears = TUNE_COST / annualSavings;
    if (breakevenYears <= 1) {
      breakevenTextEl.textContent = `✓ Tune pays for itself in ${(breakevenYears * 12).toFixed(1)} months`;
    } else if (breakevenYears <= 5) {
      breakevenTextEl.textContent = `✓ Tune pays for itself in ${breakevenYears.toFixed(1)} years`;
    } else {
      breakevenTextEl.textContent = `Payback period: ${breakevenYears.toFixed(1)} years`;
    }
  } else {
    breakevenTextEl.textContent = 'Enter your details to see ROI forecast';
  }
}

// Event Listeners
[annualKmEl, currentConsumptionEl, fuelPriceEl].forEach(el => {
  el.addEventListener('input', calculate);
});

calcBtn.addEventListener('click', calculate);

// Initial calculation on page load
calculate();
