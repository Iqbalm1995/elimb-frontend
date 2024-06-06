import { useEffect } from "react";
import {
  HeaderState,
  useHeaderState,
} from "../../data/GlobalStates/HeaderaState";
import {
  Card,
  CardBody,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  borderRadiusSchemes,
  specialColor,
} from "../../components/themes/colorScheme";
import { RiContractFill, RiEmotionHappyLine } from "react-icons/ri";
import { IconType } from "react-icons";

const DashboardPage = () => {
  const setHeaderActive = useHeaderState(
    (state: HeaderState) => state.setHeaderActive
  );

  useEffect(() => {
    // set header title page
    setHeaderActive({
      tittle: "Dashboard",
      breadcrumbItems: ["Pages", "Dashboard"],
    });
  }, []);
  return (
    <>
      <Grid templateColumns="repeat(12, 1fr)" gap={4}>
        <GridItem w={"full"} colSpan={3}>
          <CardStaticDisplay
            nameDisplay={"Display Static"}
            contentDisplay={"250"}
            iconDisplay={RiContractFill}
          />
        </GridItem>
        <GridItem w={"full"} colSpan={3}>
          <CardStaticDisplay
            nameDisplay={"Display Static"}
            contentDisplay={"3.400"}
            iconDisplay={RiContractFill}
          />
        </GridItem>
        <GridItem w={"full"} colSpan={3}>
          <CardStaticDisplay
            nameDisplay={"Display Static"}
            contentDisplay={"3.400"}
            iconDisplay={RiEmotionHappyLine}
          />
        </GridItem>
        <GridItem w={"full"} colSpan={3}>
          <CardStaticDisplay
            nameDisplay={"Display Static"}
            contentDisplay={"3.400"}
            iconDisplay={RiEmotionHappyLine}
          />
        </GridItem>
        <GridItem w={"full"} colSpan={6}>
          <Card borderRadius={borderRadiusSchemes}>
            <CardBody>
              <Flex
                alignItems={"center"}
                w={"full"}
                h={"200px"}
                justifyContent={"center"}
              >
                Card
              </Flex>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem w={"full"} colSpan={3}>
          <Card borderRadius={borderRadiusSchemes}>
            <CardBody>
              <Flex
                alignItems={"center"}
                w={"full"}
                h={"200px"}
                justifyContent={"center"}
              >
                Card
              </Flex>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem w={"full"} colSpan={3}>
          <Card borderRadius={borderRadiusSchemes}>
            <CardBody>
              <Flex
                alignItems={"center"}
                w={"full"}
                h={"200px"}
                justifyContent={"center"}
              >
                Card
              </Flex>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </>
  );
};

const CardStaticDisplay = ({
  nameDisplay,
  contentDisplay,
  iconDisplay,
}: {
  nameDisplay: string;
  contentDisplay: string;
  iconDisplay: IconType;
}) => {
  return (
    <Card borderRadius={borderRadiusSchemes} h={"90px"}>
      <CardBody>
        <HStack>
          <VStack
            spacing={0}
            justifyContent={"flex-start"}
            alignItems={"start"}
          >
            <Text as={"b"} size={"sm"} color={"gray.500"}>
              {nameDisplay}
            </Text>
            <Text as={"b"}>{contentDisplay}</Text>
          </VStack>
          <Spacer />
          <Flex borderRadius={borderRadiusSchemes} bgColor={specialColor} p={4}>
            <Icon as={iconDisplay} color="white" size={"1.5em"} />
          </Flex>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default DashboardPage;
