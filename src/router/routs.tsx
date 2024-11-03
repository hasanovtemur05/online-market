import { ProductOutlined } from '@ant-design/icons';
export interface AdminType {
    content: string
    path: string
    icon: JSX.Element
}
const admin:AdminType[] = [
    {
        content: "Contract",
        path: "/user-layout/contract",
        icon: <ProductOutlined style={{ fontSize: "16px" }} />,
    },
    {
        content: "Product",
        path: "/user-layout",
        icon: <ProductOutlined style={{ fontSize: "16px" }} />,
    },
    {
        content: "Exchange",
        path: "/user-layout/exchange",
        icon: <ProductOutlined style={{ fontSize: "16px" }} />,
    },
];

export default admin;
