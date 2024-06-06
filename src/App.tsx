// In your App.tsx or equivalent file
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SidebarWithHeader from "./components/appsAdmin/AdminPanelLayout";
import { colorsSchemes } from "./components/themes/colorScheme";
import {
  blankPage,
  dashboardPage,
  orderList,
} from "./data/NavigationUrlConstants";
import OrderPage from "./pages/Order/OrderPage";

const BlankPage = React.lazy(() => import("./pages/BlankPage/BlankPage"));
const DashboardPage = React.lazy(
  () => import("./pages/Dashboard/DashboardPage")
);

// const colors = {
//   PrimaryColorScheme: {
//     50: "#6cabe0",
//     100: "#4293d7",
//     200: "#2d87d2",
//     300: "#2979bd",
//     400: "#246ca8",
//     500: "#1b517e",
//     600: "#123654",
//     700: "#0e283f",
//     800: "#091b2a",
//     900: "#000000",
//   },
// };

const theme = extendTheme({ colorsSchemes });

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
