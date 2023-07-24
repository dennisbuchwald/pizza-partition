import React, { useState } from "react";
import styled from "styled-components";
import PizzaSliceCalculator from "../../components/PizzaSliceCalculator";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Index = () => {
  const [pizzaType, setPizzaType] = useState("Margherita");
  const [diameter, setDiameter] = useState(30);
  const [slices, setSlices] = useState(8);

  return (
    <Container>
      <PizzaSliceCalculator
        pizzaType={pizzaType}
        setPizzaType={setPizzaType}
        diameter={diameter}
        setDiameter={setDiameter}
        slices={slices}
        setSlices={setSlices}
      />
    </Container>
  );
};

export default Index;
