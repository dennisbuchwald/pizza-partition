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

const StickyImageContainer = styled.div`
	position: sticky;
	top: 150px;
`;

const Index = () => {
	return (
		<Container>
			<StickyImageContainer>
				<Image src="/logo.png" alt="Company Logo" width={150} height={150} />
			</StickyImageContainer>
			<PizzaSliceCalculator />
		</Container>
	);
};

export default Index;
