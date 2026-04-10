import AuthRedirect from "../components/AuthRedirect";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F0F2F5] px-5">
      <div className="flex flex-col justify-center w-full sm:max-w-md rounded-md p-6 sm:p-9 space-y-5 bg-[#FFFFFF] shadow-sm">
        <div className="flex flex-col items-center justify-center space-y-2">
          <Heading heading={"Sign Up"}></Heading>
          <SubHeading
            subheading={"Create your account to get started"}
          ></SubHeading>
        </div>

        <div className="space-y-3">
          <InputBox
            label="First Name"
            placeholder="Alex"
            type="text"
            onChange={(e) => {
              setFirstName(e.target.value);
              setErrors((prev) => ({ ...prev, firstName: "" }));
            }}
            error={errors.firstName}
          ></InputBox>
          <InputBox
            label="Last Name"
            placeholder="James"
            type="text"
            onChange={(e) => {
              setLastName(e.target.value);
              setErrors((prev) => ({ ...prev, lastName: "" }));
            }}
            error={errors.lastName}
          ></InputBox>

          <InputBox
            label="Username"
            placeholder="Only Letters, numbers and underscores"
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
              setErrors((prev) => ({ ...prev, username: "" }));
            }}
            error={errors.username}
          ></InputBox>
          <InputBox
            label="Email"
            placeholder="example@gmail.com"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: "" }));
            }}
            error={errors.email}
          ></InputBox>

          <InputBox
            label="Password"
            placeholder="Use a mix of letters, numbers and symbols"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: "" }));
            }}
            error={errors.password}
          ></InputBox>
        </div>
        <div className="space-y-3">
          <Button loading={loading}
            content={"Create Account"}
            loadingContent={"Creating account..."}
            onClick={async () => {
              try {
                setLoading(true);
                const response = await axios.post(
                  `${BASE_URL}/api/v1/user/signup`,
                  {
                    firstName,
                    lastName,
                    username,
                    email,
                    password,
                  },
                );
                setErrors({});
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
                setLoading(false);
              } catch (err) {
                setLoading(false);
                const backendErrors = err.response?.data?.errors;
                if (backendErrors) {
                  setErrors(backendErrors);
                }
              }
            }}
          ></Button>
          <AuthRedirect
            question={"Already have an account?"}
            redirect={"Signin"}
            onClick={() => navigate("/signin")}
          ></AuthRedirect>
        </div>
      </div>
    </div>
  );
}

