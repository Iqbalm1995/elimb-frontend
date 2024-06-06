import { Box, Card, CardBody } from "@chakra-ui/react";
import { borderRadiusSchemes } from "../../components/themes/colorScheme";
import useNavigationState from "../../data/GlobalStates/NavigationState";
import { useEffect } from "react";
import {
  HeaderState,
  useHeaderState,
} from "../../data/GlobalStates/HeaderaState";

const BlankPage = () => {
  const { NavigationActive } = useNavigationState((state) => ({
    NavigationActive: state.NavigationActive,
  }));
  const setHeaderActive = useHeaderState(
    (state: HeaderState) => state.setHeaderActive
  );

  useEffect(() => {
    // set header title page
    setHeaderActive({
      tittle: "Blank Page",
      breadcrumbItems: ["Pages", "Blank"],
    });
  }, []);

  return (
    <>
      <Box>
        <Card borderRadius={borderRadiusSchemes}>
          <CardBody>
            <pre>{JSON.stringify(NavigationActive, null, 2)}</pre>
          </CardBody>
        </Card>
      </Box>
      <Box h={"800px"}></Box>
    </>
  );
};

export default BlankPage;
