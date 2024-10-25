import { Form, Input, Button } from "antd";
import { RegisterType } from "../types";
import "./style.scss"
import { useRegisterMutation } from './../hooks/mutation';
import { Notification } from './../../../utils/notification/index';
import { useNavigate } from "react-router-dom";
const SignIn = () => {
  const { mutate } = useRegisterMutation();
  const navigate = useNavigate()
  const initialValues: RegisterType = {
    address: "",
    password: "",
    email: "",
    full_name: "",
    phone_number: "",
    username: ""
  };

  function handleSubmit(values: RegisterType): void {
    mutate(values, {
      onSuccess: (response) => {
        Notification("success", response?.data?.Message)
        navigate("/")
      },
      onError: (error) => {
        Notification("error", error.message)
      },
    });
  }

  return (
    <>
      <div className="w-full h-[100%] flex justify-center items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-xy">
        <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 xl:my-[30px] lg:my-[40px] md:my-[40px] bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-center text-3xl font-bold mb-6">Register</h1>
          <Form onFinish={handleSubmit} layout="vertical" initialValues={initialValues}>
            <Form.Item
              name="address"
              label={<span className="text-sm">address</span>}
              rules={[{ required: true, message: "Please input your address" }]}
            >
              <Input
                placeholder="Enter your address"
                className="p-3 text-base"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label={<span className="text-sm">email</span>}
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                placeholder="Enter your email"
                className="p-3 text-base"
              />
            </Form.Item>

            <Form.Item
              name="full_name"
              label={<span className="text-sm">full_name</span>}
              rules={[{ required: true, message: "Please input your full_name!" }]}
            >
              <Input
                placeholder="Enter your full_name"
                className="p-3 text-base"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={<span className="text-sm">password</span>}
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password
                placeholder="Enter your password"
                className="p-3 text-base"
              />
            </Form.Item>

            <Form.Item
              name="phone_number"
              label={<span className="text-sm">phone_number</span>}
              rules={[{ required: true, message: "Please input your phone_number!" }]}
            >
              <Input
                placeholder="Enter your phone_number"
                className="p-3 text-base"
              />
            </Form.Item>

            <Form.Item
              name="username"
              label={<span className="text-sm">username</span>}
              rules={[{ required: true, message: "Please input your username!" }]}
            >
              <Input
                placeholder="Enter your username"
                className="p-3 text-base"
              />
            </Form.Item>

            <Form.Item>
              <Button
                style={{ backgroundColor: "#ffa107", fontSize: "16px", padding: "25px", fontWeight:"bold" }}
                type="primary"
                htmlType="submit"
                block
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
