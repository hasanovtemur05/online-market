import { ProductOutlined } from '@ant-design/icons';
export interface AdminType {
    content: string
    path: string
    icon: JSX.Element
}
const admin:AdminType[] = [
    {
        content: "product",
        path: "/user-layout",
        icon: <ProductOutlined style={{ fontSize: "16px" }} />,
    },
    
];

export default admin;
