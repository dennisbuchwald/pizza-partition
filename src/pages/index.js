import Image from "next/image";
import styled from "styled-components";
import PizzaSliceCalculator from "../../components/PizzaSliceCalculator";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Index = () => {
  return (
    <Container>
      <Image src="/logo.png" alt="Company Logo" width={150} height={150} />
      <PizzaSliceCalculator />
    </Container>
  );
};

export default Index;
