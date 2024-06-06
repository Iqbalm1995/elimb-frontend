import { Container, VStack } from "@chakra-ui/react";
import CarouselDefault from "../components/CarouselDefault";
import FooterLanding from "../components/FooterLanding";
import Navbar from "../components/Navbar";
import PricingOffers from "../components/PricingOffers";
import Testimonials from "../components/Testimonials";
import MiddleLandingContent from "../components/MiddleLandingContent";
import ClientPortofolio from "../components/ClientPortofolio";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <CarouselDefault />
      <MiddleLandingContent />
      <VStack py={5}>
        <Container maxW="container.lg">
          <PricingOffers />
          <ClientPortofolio />
        </Container>
      </VStack>
      <Testimonials />
      <FooterLanding />
    </>
  );
};

export default LandingPage;
