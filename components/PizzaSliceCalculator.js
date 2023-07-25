import React, { useState, useEffect } from "react";
import styled from "styled-components";
import nutritionalValues from "../public/nutritionalValues.json";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30rem;
  margin: auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 1rem;
`;

const StyledParagraph = styled.p`
  font-family: "Roboto_Regular", sans-serif;
  color: white;
  font-size: 1.5rem;
  padding-top: 1rem;
  padding-left: 10rem;
`;

const StyledLabel = styled.label`
  font-family: "Roboto_Regular", sans-serif;
  color: white;
  font-size: 2rem;
  display: block;
  margin-bottom: 1rem;
`;

const StyledInput = styled.input`
  margin-top: 1rem;
  display: flex;
  appearance: none;
  border: 0;
  outline: 0;
  font: inherit;
  width: 15em;
  height: 2em;
  padding: 0 4em 0 1em;
  background: url(https://upload.wikimedia.org/wikipedia/commons/9/9d/Caret_down_font_awesome_whitevariation.svg)
      no-repeat right 0.8em center / 1.4em,
    linear-gradient(to left, $glass-icon 3em, $glass 3em);
  color: white;
  border-radius: 20px;
  box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

const StyledSelect = styled.select`
  margin-top: 1rem;
  display: flex;
  appearance: none;
  border: 0;
  outline: 0;
  font: inherit;
  width: 15em;
  height: 2em;
  padding: 0 4em 0 1em;
  background: url(https://upload.wikimedia.org/wikipedia/commons/9/9d/Caret_down_font_awesome_whitevariation.svg)
      no-repeat right 0.8em center / 1.4em,
    linear-gradient(to left, $glass-icon 3em, $glass 3em);
  color: white;
  border-radius: 20px;
  box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

const StyledButton = styled.button`
  padding: 1rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  border-radius: 20px;
  color: black;
  background-color: #d49b17;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  &:hover:enabled {
    background-color: #8c660d;
  }
`;

const StyledBackButton = styled(StyledButton)`
  margin-right: auto;
`;

const StyledNextButton = styled(StyledButton)`
  margin-left: auto;
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

  const isSelectionMade = (step) => {
    switch (step) {
      case 0:
        return pizzaType !== "";
      case 1:
        return shape !== "";
      case 2:
        if (shape === "circle") {
          return diameter !== 0;
        } else if (shape === "rectangle") {
          return length !== 0 && width !== 0;
        }
        return false;
      case 3:
        return slices !== 0;
      case 4:
        return price !== 0;
      default:
        return false;
    }
  };

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
          <StyledLabel>
            Was für eine Pizza hast du gegessen?
            <StyledSelect value={pizzaType} onChange={handlePizzaTypeChange}>
              <option value="">-- wähle eine Pizza --</option>
              {nutritionalValues.map((pizza, index) => (
                <option key={index} value={pizza.PizzaType}>
                  {pizza.PizzaType}
                </option>
              ))}
            </StyledSelect>
          </StyledLabel>
        );
      case 1:
        return (
          <StyledLabel>
            Welche Form hatte diese?
            <StyledSelect value={shape} onChange={handleShapeChange}>
              <option value="">-- wähle eine Form --</option>
              <option value="circle">Rund</option>
              <option value="rectangle">Rechteckig</option>
            </StyledSelect>
          </StyledLabel>
        );
      case 2:
        if (shape === "circle") {
          return (
            <StyledLabel>
              Durchmesser (cm):
              <StyledInput
                type="number"
                value={diameter}
                onChange={handleDiameterChange}
              />
            </StyledLabel>
          );
        } else if (shape === "rectangle") {
          return (
            <>
              <StyledLabel>
                Länge (cm):
                <StyledInput
                  type="number"
                  value={length}
                  onChange={handleLengthChange}
                />
              </StyledLabel>
              <StyledLabel>
                Breite (cm):
                <StyledInput
                  type="number"
                  value={width}
                  onChange={handleWidthChange}
                />
              </StyledLabel>
            </>
          );
        }
        return null;
      case 3:
        return (
          <StyledLabel>
            Wie viele Stücke hast du geschnitten?
            <StyledInput
              type="number"
              value={slices}
              onChange={handleSlicesChange}
            />
          </StyledLabel>
        );
      case 4:
        return (
          <StyledLabel>
            Wie teuer war die Pizza?
            <StyledInput
              type="number"
              value={price}
              onChange={handlePriceChange}
            />
          </StyledLabel>
        );
      case 5:
        return (
          <div>
            <StyledParagraph>
              Fläche des Pizzastücks: {calculatePizzaSliceArea()} cm²
            </StyledParagraph>
            <StyledParagraph>
              Preis pro Stück: {calculatePricePerSlice()} €
            </StyledParagraph>
            <br />
            <br />
            <StyledParagraph>Nährwerte pro Stück:</StyledParagraph>
            <StyledParagraph>
              Kalorien:{" "}
              {currentNutritionalValues &&
                calculateNutritionPerSlice(currentNutritionalValues.Calories)}
            </StyledParagraph>
            <StyledParagraph>
              Eiweiß:{" "}
              {currentNutritionalValues &&
                calculateNutritionPerSlice(currentNutritionalValues.Protein)}
              g
            </StyledParagraph>
            <StyledParagraph>
              Fett:{" "}
              {currentNutritionalValues &&
                calculateNutritionPerSlice(currentNutritionalValues.Fat)}
              g
            </StyledParagraph>
            <StyledParagraph>
              Kohlenhydrate:{" "}
              {currentNutritionalValues &&
                calculateNutritionPerSlice(
                  currentNutritionalValues.Carbohydrates
                )}
              g
            </StyledParagraph>
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
      {renderStepContent(step)}
      <ButtonContainer>
        {step > 0 && (
          <StyledBackButton onClick={handleBack}>Zurück</StyledBackButton>
        )}
        {step < 5 && (
          <StyledNextButton
            disabled={!isSelectionMade(step)}
            onClick={handleNext}
          >
            Weiter
          </StyledNextButton>
        )}
      </ButtonContainer>
    </Container>
  );
};

export default PizzaSliceCalculator;
