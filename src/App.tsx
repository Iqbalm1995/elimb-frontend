// In your App.tsx or equivalent file
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SidebarWithHeader from "./components/appsAdmin/AdminPanelLayout";
import { colorsSchemes } from "./components/themes/colorScheme";
import {
  AuthPage,
  blankPage,
  companiesPage,
  dashboardPage,
  orderCreate,
  orderList,
} from "./data/NavigationUrlConstants";
import OrderPage from "./pages/Order/OrderPage";
import AuthenticationValidation from "./pages/Auth/AuthenticationValidation";

const AuthrenticationPage = React.lazy(
  () => import("./pages/Auth/AuthenticationPage")
);
const CompaniesPage = React.lazy(() => import("./pages/Company/CompaniesPage"));
const BlankPage = React.lazy(() => import("./pages/BlankPage/BlankPage"));
const OrderNew = React.lazy(() => import("./pages/Order/OrderNew"));
const DashboardPage = React.lazy(
  () => import("./pages/Dashboard/DashboardPage")
);

const colors = {
  black: "#0c1015",
  gray: {
    "50": "#f9fafa",
    "100": "#f1f1f2",
    "200": "#e6e7e9",
    "300": "#d2d4d7",
    "400": "#a9adb2",
    "500": "#797f88",
    "600": "#4d5560",
    "700": "#2e3744",
    "800": "#19202b",
    "900": "#141a23",
  },
  blue: {
    "50": "#f0f7ff",
    "100": "#c6e0ff",
    "200": "#9bc9ff",
    "300": "#69afff",
    "400": "#3794ff",
    "500": "#057aff",
    "600": "#0065d9",
    "700": "#004ea7",
    "800": "#004089",
    "900": "#003470",
  },
  purple: {
    "50": "#f9f5ff",
    "100": "#e7d9ff",
    "200": "#d5bcff",
    "300": "#b991ff",
    "400": "#a672ff",
    "500": "#8944ff",
    "600": "#6f1bff",
    "700": "#5400e4",
    "800": "#4600be",
    "900": "#350090",
  },
  pink: {
    "50": "#fff5fa",
    "100": "#ffd6e9",
    "200": "#ffb3d7",
    "300": "#ff80bb",
    "400": "#ff52a3",
    "500": "#ef0070",
    "600": "#ce0060",
    "700": "#aa004f",
    "800": "#86003f",
    "900": "#65002f",
  },
  red: {
    "50": "#fff5f5",
    "100": "#ffd7d5",
    "200": "#ffb2af",
    "300": "#ff7f7b",
    "400": "#ff5c56",
    "500": "#fa0900",
    "600": "#d40700",
    "700": "#ac0600",
    "800": "#930500",
    "900": "#6d0400",
  },
  orange: {
    "50": "#fffaf4",
    "100": "#ffead2",
    "200": "#ffd19b",
    "300": "#ffa947",
    "400": "#f78400",
    "500": "#d57100",
    "600": "#b46000",
    "700": "#8f4c00",
    "800": "#713c00",
    "900": "#5d3200",
  },
  yellow: {
    "50": "#fffef9",
    "100": "#fffad8",
    "200": "#ffef84",
    "300": "#ffde0a",
    "400": "#eacb00",
    "500": "#c1a700",
    "600": "#9a8600",
    "700": "#786800",
    "800": "#5a4e00",
    "900": "#4a4100",
  },
  green: {
    "50": "#effff7",
    "100": "#98ffcf",
    "200": "#00f583",
    "300": "#00da74",
    "400": "#00bf66",
    "500": "#00a458",
    "600": "#008849",
    "700": "#006a39",
    "800": "#00572e",
    "900": "#004826",
  },
  teal: {
    "50": "#e7feff",
    "100": "#82fbff",
    "200": "#00ecf4",
    "300": "#00d2da",
    "400": "#00b3b9",
    "500": "#00989e",
    "600": "#007c80",
    "700": "#006064",
    "800": "#005053",
    "900": "#004245",
  },
  cyan: {
    "50": "#f0fcff",
    "100": "#bdf2ff",
    "200": "#9debff",
    "300": "#74e3ff",
    "400": "#00c4f5",
    "500": "#00b4e1",
    "600": "#00a2cb",
    "700": "#0086a8",
    "800": "#006e8a",
    "900": "#00566b",
  },
  primary: {
    "50": "#eff9ff",
    "100": "#bde6ff",
    "200": "#7fceff",
    "300": "#2aaeff",
    "400": "#0099f8",
    "500": "#0082d1",
    "600": "#006db1",
    "700": "#00588e",
    "800": "#004b78",
    "900": "#003657",
  },
};

const theme = extendTheme({
  colors,
  fonts: {
    heading: "'Poppins', Roboto, sans-serif",
    body: "'Poppins', Roboto, sans-serif",
  },
});

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
  {
    path: AuthPage,
    element: <AuthrenticationPage />,
  },
  {
    path: companiesPage,
    element: <CompaniesPage />,
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
          <AuthenticationValidation>
            <SidebarWithHeader>
              <Suspense fallback={<div>Mohon tunggu...</div>}>
                {componentRoute}
              </Suspense>
            </SidebarWithHeader>
          </AuthenticationValidation>
        </>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
