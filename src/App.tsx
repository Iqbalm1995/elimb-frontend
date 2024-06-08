// In your App.tsx or equivalent file
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SidebarWithHeader from "./components/appsAdmin/AdminPanelLayout";
import { colorsSchemes } from "./components/themes/colorScheme";
import {
  blankPage,
  dashboardPage,
  orderCreate,
  orderList,
} from "./data/NavigationUrlConstants";
import OrderPage from "./pages/Order/OrderPage";

const BlankPage = React.lazy(() => import("./pages/BlankPage/BlankPage"));
const OrderNew = React.lazy(() => import("./pages/Order/OrderNew"));
const DashboardPage = React.lazy(
  () => import("./pages/Dashboard/DashboardPage")
);

const colors = {
  PrimaryColorScheme: {
    50: "#e6fff7",
    100: "#b3ffe5",
    200: "#99ffdd",
    300: "#80ffd4",
    400: "#66ffcc",
    500: "#33FFBB",
    600: "#00ffaa",
    700: "#00e699",
    800: "#00cc88",
    900: "#009966",
  },
};

const theme = extendTheme({ colors });

const router = [
  {
    path: dashboardPage,
    element: <DashboardPage />,
  },
  {
    path: blankPage,
    element: <BlankPage />,
  },
  {
    path: orderList,
    element: <OrderPage />,
  },
  {
    path: orderCreate,
    element: <OrderNew />,
  },
];

const componentRoute = (
  <Routes>
    {router.map((item: any) => {
      return <Route key={item.path} path={item.path} element={item.element} />;
    })}
  </Routes>
);

function App() {
  return (
    <ChakraProvider theme={extendTheme(theme)}>
      <BrowserRouter>
        <>
          <SidebarWithHeader>
            <Suspense fallback={<div>Mohon tunggu...</div>}>
              {componentRoute}
            </Suspense>
          </SidebarWithHeader>
        </>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
