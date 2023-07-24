import React, { useState, useEffect } from "react";
import styled from "styled-components";
import nutritionalValues from "../public/nutritionalValues.json";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PizzaSliceCalculator = () => {
  const [step, setStep] = useState(0);
  const [pizzaType, setPizzaType] = useState("");
  const [shape, setShape] = useState("");
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [diameter, setDiameter] = useState(0);
  const [slices, setSlices] = useState(0);
  const [price, setPrice] = useState(0);
  const [currentNutritionalValues, setCurrentNutritionalValues] = useState({});

  // Helper function to find nutritional values for the given pizza type
  const findNutritionValues = (type) => {
    return nutritionalValues.find((item) => item.PizzaType === type);
  };

  useEffect(() => {
    // Set the nutritional values for the current pizza type
    if (pizzaType !== "") {
      const values = findNutritionValues(pizzaType);
      setCurrentNutritionalValues(values);
    }
  }, [pizzaType, slices]);

  const handlePizzaTypeChange = (e) => {
    setPizzaType(e.target.value);
  };

  const handleShapeChange = (e) => {
    setShape(e.target.value);
  };

  const handleLengthChange = (e) => {
    setLength(e.target.value);
  };

  const handleWidthChange = (e) => {
    setWidth(e.target.value);
  };

  const handleDiameterChange = (e) => {
    setDiameter(e.target.value);
  };

  const handleSlicesChange = (e) => {
    setSlices(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const calculatePizzaSliceArea = () => {
    if (shape === "circle") {
      const radius = diameter / 2;
      const totalArea = Math.PI * Math.pow(radius, 2);
      return Math.round(totalArea / slices);
    } else if (shape === "rectangle") {
      const totalArea = length * width;
      return Math.round(totalArea / slices);
    }
  };

  const calculateNutritionPerSlice = (nutritionValue) => {
    let adjustmentFactor = 1;
    if (shape === "circle") {
      const standardArea = Math.PI * Math.pow(30 / 2, 2);
      const userArea = Math.PI * Math.pow(diameter / 2, 2);
      adjustmentFactor = userArea / standardArea;
    } else if (shape === "rectangle") {
      const standardArea = 35 * 20;
      const userArea = length * width;
      adjustmentFactor = userArea / standardArea;
    }
    return ((nutritionValue * adjustmentFactor) / slices).toFixed(2);
  };

  const calculatePricePerSlice = () => {
    return (price / slices).toFixed(2);
  };

  // Implement the form steps
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <label>
            Was für eine Pizza hast du gegessen?
            <select value={pizzaType} onChange={handlePizzaTypeChange}>
              <option value="">-- wähle eine Pizza --</option>
              {nutritionalValues.map((pizza, index) => (
                <option key={index} value={pizza.PizzaType}>
                  {pizza.PizzaType}
                </option>
              ))}
            </select>
          </label>
        );
      case 1:
        return (
          <label>
            Welche Form hatte diese?
            <select value={shape} onChange={handleShapeChange}>
              <option value="">-- wähle eine Form --</option>
              <option value="circle">Rund</option>
              <option value="rectangle">Rechteckig</option>
            </select>
          </label>
        );
      case 2:
        if (shape === "circle") {
          return (
            <label>
              Durchmesser (cm):
              <input
                type="number"
                value={diameter}
                onChange={handleDiameterChange}
              />
            </label>
          );
        } else if (shape === "rectangle") {
          return (
            <>
              <label>
                Länge (cm):
                <input
                  type="number"
                  value={length}
                  onChange={handleLengthChange}
                />
              </label>
              <label>
                Breite (cm):
                <input
                  type="number"
                  value={width}
                  onChange={handleWidthChange}
                />
              </label>
            </>
          );
        }
        return null;
      case 3:
        return (
          <label>
            Wie viele Stücke hast du geschnitten?
            <input type="number" value={slices} onChange={handleSlicesChange} />
          </label>
        );
      case 4:
        return (
          <label>
            Wie teuer war die Pizza?
            <input type="number" value={price} onChange={handlePriceChange} />
          </label>
        );
      case 5:
        return (
          <div>
            <p>Fläche des Pizzastücks: {calculatePizzaSliceArea()} cm²</p>
            <p>Preis pro Stück: {calculatePricePerSlice()} €</p>
            <h2>Nährwerte pro Stück</h2>
            <p>
              Kalorien:{" "}
              {currentNutritionalValues &&
                calculateNutritionPerSlice(currentNutritionalValues.Calories)}
            </p>
            <p>
              Eiweiß:{" "}
              {currentNutritionalValues &&
                calculateNutritionPerSlice(currentNutritionalValues.Protein)}
              g
            </p>
            <p>
              Fett:{" "}
              {currentNutritionalValues &&
                calculateNutritionPerSlice(currentNutritionalValues.Fat)}
              g
            </p>
            <p>
              Kohlenhydrate:{" "}
              {currentNutritionalValues &&
                calculateNutritionPerSlice(
                  currentNutritionalValues.Carbohydrates
                )}
              g
            </p>
          </div>
        );
      default:
        return "Unknown step";
    }
  };

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <Container>
      <h1>PizzaPartition</h1>
      {renderStepContent(step)}
      {step > 0 && <button onClick={handleBack}>Zurück</button>}
      {step < 5 && <button onClick={handleNext}>Weiter</button>}
    </Container>
  );
};

export default PizzaSliceCalculator;
