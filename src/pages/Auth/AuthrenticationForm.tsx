import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { FiLogIn } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useToastHelper } from "../../helper/ToastMessagesHelper";
import useAuthenticationState from "../../data/GlobalStates/AuthenticationState";
import { encryptAES } from "../../helper/HasherHelper";
import { PostAuthenticationServices } from "../../services/AuthenticationServices";
import { HttpStatusCode } from "axios";
import { AuthResponse } from "../../typesModel/AuthTypes";
import { homePage } from "../../data/NavigationUrlConstants";

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
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [isProcess, setProcess] = useState(false);

  const formik = useFormik({
    initialValues: initialValueAuthEx,
    validationSchema: FormSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
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
        showToast({
          description: `${response.data.message}`,
          statusToast: "warning",
        });
        return;
      }
      showToast({
        description: `Login sukses, Selamat Datang`,
        statusToast: "success",
      });
      const responseData: AuthResponse = response.data.data as AuthResponse;
      setAuthData(responseData);
      setLogin(true);
      navigate(homePage);
    }).catch(function (error) {
      showToast({
        description: `Error : ${error.message}`,
        statusToast: "error",
      });
    });
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
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
        </FormControl>
        <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
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
        </FormControl>
        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
        <Stack spacing={6} mt="4">
          <Stack
            direction={{ base: "column", sm: "row" }}
            align={"end"}
            justify={"flex-end"}
          ></Stack>
          <Button
            isLoading={isProcess}
            rightIcon={<FiLogIn />}
            colorScheme="teal"
            variant={"solid"}
            type={"submit"}
          >
            Masuk
          </Button>
        </Stack>
      </form>
    </>
  );
}
