import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { css } from "styled-components";
import nutritionalValues from "../public/nutritionalValues.json";

const sizes = {
  desktop: 992,
  tablet: 768,
  phone: 576,
};

const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)};
    }
  `;

  return acc;
}, {});

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30rem;
  margin: auto;

  ${media.desktop`width: 28rem;`}
  ${media.tablet`width: 24rem;`}
  ${media.phone`width: 20rem;`}
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

  ${media.desktop`padding-left: 9rem; font-size: 1.4rem;`}
  ${media.tablet`padding-left: 7rem; font-size: 1.3rem;`}
  	${media.phone`padding-left: 5rem; font-size: 1.2rem;`}
`;

const StyledParagraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  margin-bottom: 1rem;
`;

const StyledToggleLabel = styled.span`
  font-size: 1rem;
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
  color: white;
  border-radius: 20px;
  box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;

  ${media.desktop`width: 14em; height: 1.9em;`}
  ${media.tablet`width: 12em; height: 1.8em;`}
  ${media.phone`width: 10em; height: 1.7em;`}
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
  color: white;
  border-radius: 20px;
  box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
  font-size: 2rem;
  padding: 0 4em 0 1em;

  ${media.desktop`width: 14em; height: 1.9em;`}
  ${media.tablet`width: 12em; height: 1.8em;`}
  ${media.phone`width: 10em; height: 1.7em;`}
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
  background-color: #ccc;
  &:hover:enabled {
    background-color: #515151;
  }
`;

const StyledNextButton = styled(StyledButton)`
  margin-left: auto;
`;

const StyledLabel = styled.label`
  font-family: "Roboto_Regular", sans-serif;
  color: white;
  font-size: 2rem;
  display: block;
  margin-bottom: 1rem;
  text-align: center; // Zentriert den Text innerhalb des Labels
`;

const StyledToggle = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 50px;
  height: 25px;
  background: ${(props) => (props.checked ? "grey" : "#34c759")};
  border-radius: 50px;
  position: relative;
  margin: 1rem auto;
  & input {
    height: 0;
    width: 0;
    visibility: hidden;
  }
  & span {
    content: "";
    position: absolute;
    top: 5px;
    left: 5px;
    width: 15px;
    height: 15px;
    border-radius: 45px;
    transition: 0.2s;
    background: white;
    box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);
  }
  & input:checked + span {
    left: calc(100% - 5px);
    transform: translateX(-100%);
  }
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
  const [displayWholePizza, setDisplayWholePizza] = useState(false);

  const calculatePizzaArea = () => {
    if (shape === "circle") {
      const radius = diameter / 2;
      const totalArea = Math.PI * Math.pow(radius, 2);
      return Math.round(totalArea);
    } else if (shape === "rectangle") {
      const totalArea = length * width;
      return Math.round(totalArea);
    }
  };

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

  const findNutritionValues = (type) => {
    return nutritionalValues.find((item) => item.PizzaType === type);
  };

  const resetCalculator = () => {
    setStep(0);
    setPizzaType("");
    setShape("");
    setLength(0);
    setWidth(0);
    setDiameter(0);
    setSlices(0);
    setPrice(0);
    setCurrentNutritionalValues({});
  };

  useEffect(() => {
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
    return (
      (nutritionValue * adjustmentFactor) /
      (displayWholePizza ? 1 : slices)
    ).toFixed(2);
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
            Wie teuer war die Pizza in €?
            <StyledInput
              type="number"
              value={price}
              onChange={handlePriceChange}
            />
          </StyledLabel>
        );
      case 5:
        return (
          <>
            <StyledLabel>
              <StyledToggleLabel>Pro Stück - Pro Pizza</StyledToggleLabel>
              <StyledToggle checked={displayWholePizza}>
                <input
                  type="checkbox"
                  checked={displayWholePizza}
                  onChange={() => setDisplayWholePizza(!displayWholePizza)}
                />
                <span></span>
              </StyledToggle>
            </StyledLabel>

            <StyledParagraphContainer>
              <StyledParagraph>
                {displayWholePizza
                  ? "Fläche der Pizza: "
                  : "Fläche des Pizzastücks: "}
                {displayWholePizza
                  ? calculatePizzaArea()
                  : calculatePizzaSliceArea()}{" "}
                cm²
              </StyledParagraph>
              <StyledParagraph>
                {displayWholePizza ? "Preis der Pizza: " : "Preis pro Stück: "}
                {displayWholePizza ? price : calculatePricePerSlice()} €
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
            </StyledParagraphContainer>
          </>
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
        {step === 5 && (
          <StyledNextButton onClick={resetCalculator}>Nochmal</StyledNextButton>
        )}
      </ButtonContainer>
    </Container>
  );
};

export default PizzaSliceCalculator;
