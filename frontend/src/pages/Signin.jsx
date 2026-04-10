import { useState } from "react";
import AuthRedirect from "../components/AuthRedirect";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex justify-center items-center h-screen bg-[#F0F2F5] px-5">
      <div className="flex flex-col justify-center w-full max-w-md rounded-md p-9 space-y-7 bg-[#FFFFFF] shadow-sm">
        <div className="flex flex-col items-center justify-center space-y-2">
          <Heading heading={"Sign in"}></Heading>
          <SubHeading subheading={"Enter your credentials"}></SubHeading>
        </div>
        <div className="space-y-4">
          <InputBox
            label="Email"
            placeholder="Enter your email"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: "" }));
            }}
            error={errors.email}
          ></InputBox>
          <div>
            <InputBox
              label="Password"
              placeholder="Enter your password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: "" }));
              }}
              error={errors.password}
            ></InputBox>
            <div className="text-sm text-gray-600 space-y-1">
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <Button
            content={"Log in"}
            loading={loading}
            loadingContent={"Signing in..."}
            onClick={async () => {
              try {
                setLoading(true);
                const response = await axios.post(
                  `${BASE_URL}/api/v1/user/signin`,
                  {
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
            question={"Don't have an account?"}
            redirect={"Signup"}
            onClick={() => navigate("/signup")}
          ></AuthRedirect>
        </div>
      </div>
    </div>
  );
}
