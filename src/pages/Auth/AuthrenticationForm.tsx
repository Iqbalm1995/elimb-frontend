import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
  VStack,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { FiLogIn } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useToastHelper } from "../../helper/ToastMessagesHelper";
import useAuthenticationState from "../../data/GlobalStates/AuthenticationState";
import { PostAuthenticationServices } from "../../services/AuthenticationServices";
import { HttpStatusCode } from "axios";
import { AuthResponse } from "../../typesModel/AuthTypes";
import { homePage } from "../../data/NavigationUrlConstants";
import { borderRadiusSchemes } from "../../components/themes/colorScheme";
import {
  HeaderState,
  useHeaderState,
} from "../../data/GlobalStates/HeaderaState";

export interface PayloadAuthentication {
  username: string;
  password: string;
}

const initialValueAuthEx: PayloadAuthentication = {
  username: "",
  password: "",
};

const FormSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

export default function AuthrenticationForm() {
  const showToast = useToastHelper();
  const setLogin = useAuthenticationState((state: any) => state.setLogin);
  const setAuthData = useAuthenticationState((state: any) => state.setAuthData);
  const setHeaderActive = useHeaderState(
    (state: HeaderState) => state.setHeaderActive
  );
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [isProcess, setProcess] = useState(false);

  const formik = useFormik({
    initialValues: initialValueAuthEx,
    validationSchema: FormSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values: any) => {
      setProcess(true);
      AuthAction({
        username: values.username,
        password: values.password,
      });
    },
  });

  const AuthAction = (payload: PayloadAuthentication) => {
    var RequestAuthentication = PostAuthenticationServices(payload);
    RequestAuthentication.then(function (response: any) {
      if (response.status != HttpStatusCode.Ok) {
        setProcess(false);
        showToast({
          description: `${response.data.message}`,
          statusToast: "warning",
        });
        return;
      }
      setProcess(false);
      showToast({
        description: `Login sukses, Selamat Datang`,
        statusToast: "success",
      });
      const responseData: AuthResponse = response.data.data as AuthResponse;
      setAuthData(responseData);
      setLogin(true);
      // set header title page
      setHeaderActive({
        tittle: "Dashboard",
        breadcrumbItems: ["Pages", "Dashboard"],
      });
      navigate(homePage);
    }).catch(function (error) {
      setProcess(false);
      showToast({
        description: `Error : ${error.message}`,
        statusToast: "error",
      });
    });
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <VStack w={"full"}>
          <FormControl
            id="username"
            isInvalid={formik.errors.username ? true : false}
            isRequired
          >
            <FormLabel>Username</FormLabel>
            <Input
              id="username"
              name="username"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.username}
              placeholder="Username"
            />
            <FormErrorMessage>
              {typeof formik.errors.username === "string"
                ? formik.errors.username
                : ""}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            id="password"
            isInvalid={formik.errors.password ? true : false}
            isRequired
          >
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
              <Input
                id="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {typeof formik.errors.password === "string"
                ? formik.errors.password
                : ""}
            </FormErrorMessage>
          </FormControl>
          <HStack justifyContent={"end"} w={"full"}>
            <Link to={"#"}>
              <Button
                colorScheme="primary"
                fontWeight={"300"}
                fontSize={15}
                fontStyle={"italic"}
                variant="link"
              >
                Lupa Password ?
              </Button>
            </Link>
          </HStack>
          <Stack spacing={6} mt="4" w={"full"}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"end"}
              justify={"flex-end"}
            ></Stack>
            <Button
              isLoading={isProcess}
              borderRadius={borderRadiusSchemes}
              rightIcon={<FiLogIn />}
              colorScheme="primary"
              variant={"solid"}
              type={"submit"}
              size={"lg"}
              width={"full"}
            >
              Masuk
            </Button>
          </Stack>
        </VStack>
      </form>
    </>
  );
}
