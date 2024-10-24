import { Form, Input, Button } from "antd";
import { SignInType } from "../types";
import { useSignInMutation } from "../hooks/mutation";
import "./style.scss"
import { Notification } from "../../../utils/notification";
const SignIn = () => {
  const { mutate } = useSignInMutation();
  const initialValues: SignInType = {
    username: "",
    password: "",
  };

  function handleSubmit(values: SignInType): void {
    mutate(values, {
      onSuccess: (response) => {
        console.log(response);
      },
      onError: (error) => {
        Notification("error", error.message)
      },
    });
  }

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-xy">
        <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-center text-3xl font-bold mb-6">Sign-In</h1>
          <Form onFinish={handleSubmit} layout="vertical" initialValues={initialValues}>
            <Form.Item
              name="username"
              label={<span className="text-sm">Username</span>}
              rules={[{ required: true, message: "Please input your username" }]}
            >
              <Input
                placeholder="Enter your phone number"
                className="p-3 text-base"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={<span className="text-sm">Password</span>}
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password
                placeholder="Enter your password"
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
                Sign-in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
