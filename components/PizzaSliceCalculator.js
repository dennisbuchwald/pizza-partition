import React, { useState, useEffect } from "react";
import styled from "styled-components";
import nutritionalValues from "../public/nutritionalValues.json";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PizzaSliceCalculator = ({
  pizzaType = "Margherita",
  setPizzaType,
  diameter = 30,
  setDiameter,
  slices = 8,
  setSlices,
}) => {
  const [currentNutritionalValues, setCurrentNutritionalValues] = useState({});

  // Helper function to find nutritional values for the given pizza type
  const findNutritionValues = (type) => {
    return nutritionalValues.find((item) => item.PizzaType === type);
  };

  useEffect(() => {
    // Set the nutritional values for the current pizza type
    const values = findNutritionValues(pizzaType);
    setCurrentNutritionalValues(values);
  }, [pizzaType, slices]);

  const handlePizzaTypeChange = (e) => {
    setPizzaType(e.target.value);
  };

  const handleDiameterChange = (e) => {
    setDiameter(e.target.value);
  };

  const handleSlicesChange = (e) => {
    setSlices(e.target.value);
  };

  const calculatePizzaSliceArea = () => {
    const radius = diameter / 2;
    const totalArea = Math.PI * Math.pow(radius, 2);
    return Math.round(totalArea / slices);
  };

  const calculateNutritionPerSlice = (nutritionValue) => {
    return (nutritionValue / slices).toFixed(2);
  };

  return (
    <Container>
      <h1>PizzaPartition</h1>
      <label>
        Pizza Typ:
        <select value={pizzaType} onChange={handlePizzaTypeChange}>
          {nutritionalValues.map((pizza, index) => (
            <option key={index} value={pizza.PizzaType}>
              {pizza.PizzaType}
            </option>
          ))}
        </select>
      </label>
      <label>
        Durchmesser (cm):
        <input type="number" value={diameter} onChange={handleDiameterChange} />
      </label>
      <label>
        Anzahl der Stücke:
        <input type="number" value={slices} onChange={handleSlicesChange} />
      </label>
      <p>Fläche des Pizzastücks: {calculatePizzaSliceArea()} qcm</p>
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
          calculateNutritionPerSlice(currentNutritionalValues.Carbohydrates)}
        g
      </p>
    </Container>
  );
};

export default PizzaSliceCalculator;
