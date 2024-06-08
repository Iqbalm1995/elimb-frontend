import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Input,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
  useSteps,
} from "@chakra-ui/react";
import { borderRadiusSchemes } from "../../components/themes/colorScheme";
import { useEffect } from "react";
import {
  HeaderState,
  useHeaderState,
} from "../../data/GlobalStates/HeaderaState";
import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { orderList } from "../../data/NavigationUrlConstants";

const OrderNew = () => {
  const setHeaderActive = useHeaderState(
    (state: HeaderState) => state.setHeaderActive
  );

  useEffect(() => {
    // set header title page
    setHeaderActive({
      tittle: "Create New Order",
      breadcrumbItems: ["Pages", "Order", "Create"],
    });
  }, []);

  return (
    <>
      <Box>
        <Card borderRadius={borderRadiusSchemes}>
          <CardBody>
            <Box pb={5}>
              <Grid templateColumns="repeat(12, 1fr)" gap={6}>
                <GridItem w={"full"} colSpan={{ base: 12, md: 6 }}>
                  <HStack spacing={2}>
                    <Link to={orderList}>
                      <Button colorScheme="teal" variant={"solid"}>
                        <FaChevronLeft />
                      </Button>
                    </Link>
                    <Text fontWeight={"medium"} fontSize="3xl">
                      Create New Order
                    </Text>
                  </HStack>
                </GridItem>
                <GridItem w={"full"} colSpan={{ base: 12, md: 6 }}>
                  <Flex justifyContent={"flex-end"}></Flex>
                </GridItem>
                <GridItem w={"full"} colSpan={12}>
                  <FormWizard />
                </GridItem>
              </Grid>
            </Box>
          </CardBody>
        </Card>
      </Box>
    </>
  );
};

const steps = [
  { title: "Step 1", description: "Personal Info" },
  { title: "Step 2", description: "Address" },
  { title: "Step 3", description: "Review" },
];

const FormWizard: React.FC = () => {
  const { activeStep, goToNext, goToPrevious } = useSteps({
    index: 0,
  });

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      goToNext();
    }
  };

  const handlePrevious = () => {
    if (activeStep > 0) {
      goToPrevious();
    }
  };

  return (
    <Box p={4}>
      <Stepper index={activeStep} colorScheme="teal">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>

      <Card mt={4} borderRadius={borderRadiusSchemes}>
        <CardBody>
          {activeStep === 0 && (
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input placeholder="First Name" />
              <FormLabel mt={2}>Last Name</FormLabel>
              <Input placeholder="Last Name" />
            </FormControl>
          )}
          {activeStep === 1 && (
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input placeholder="Address" />
              <FormLabel mt={2}>City</FormLabel>
              <Input placeholder="City" />
              <FormLabel mt={2}>Postal Code</FormLabel>
              <Input placeholder="Postal Code" />
            </FormControl>
          )}
          {activeStep === 2 && (
            <Box>
              <p>Review your details here...</p>
              {/* Add your review details */}
            </Box>
          )}
        </CardBody>
      </Card>

      <Flex mt={4} justify="end">
        <HStack>
          <Button
            onClick={handlePrevious}
            isDisabled={activeStep === 0}
            colorScheme="teal"
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            isDisabled={activeStep === steps.length - 1}
            colorScheme="teal"
          >
            Next
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default OrderNew;
