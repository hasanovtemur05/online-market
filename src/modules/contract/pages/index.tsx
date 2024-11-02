import { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import GlobalTable from "../../../components/table";
import { useLocation, useNavigate } from "react-router-dom";
import { Loading } from "@components";
import { Button, Input, Space, Tooltip, } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ProductModal from "./modal"; 
import { useGetContract } from "../hooks/queries";
import { DataItem } from "../../product/types";
import { ContractType } from "../types";
import DeleteConform from "../../../components/popconform";
import { useDeleteContract } from "../hooks/mutation";

const Index = () => {
  const [params, setParams] = useState({
    search: "",
    page: 1,
    limit: 3,
  });
  const [total, setTotal] = useState(0);
  const [updateData, setUpdateData] = useState<ContractType | null>(null);
  const [open, setOpen] = useState(false);  
  const navigate = useNavigate();
  const { data, isLoading } = useGetContract(params);
  console.log(data);
  
  const { search } = useLocation();
  const { mutate: deleteMutate } = useDeleteContract();



  useEffect(() => {
    if (data?.count) {
      setTotal(data?.count);
    }
  }, [data]);

  const handleTableChange = (pagination: { current?: number; pageSize?: number }) => {
    const { current = 1, pageSize = 3 } = pagination;
    setParams((prev) => ({
      ...prev,
      page: current,
      limit: pageSize,
    }));

    const current_params = new URLSearchParams(search);
    current_params.set("page", `${current}`);
    current_params.set("limit", `${pageSize}`);
    navigate(`?${current_params.toString()}`);
  };
  useEffect(() => {
    const params = new URLSearchParams(search);
    const page = Number(params.get("page")) || 1;
    const limit = Number(params.get("limit")) || 3;
    const searchValue = params.get("search") || ""; 
  
    setParams((prev) => ({
      ...prev,
      page: page,
      limit: limit,
      search: searchValue, 
    }));
  }, [search]);
  

  const handleDelete = (id: number) => {
    deleteMutate(id, {
      onSuccess: () => {
        setParams((prev) => ({ ...prev }));
      },
    });
  };

  const handleChange = (event: { target: { value: string; }; }) => {
    const searchValue = event.target.value;
    setParams((prev) => ({
      ...prev,
      search: searchValue,
    }));
  
    const search_params = new URLSearchParams(search);
    search_params.set("search", searchValue); 
    navigate(`?${search_params.toString()}`);
  };
  

  const handleClose = () => {
    setOpen(false);
    setUpdateData(null); 
  };

  const columns: ColumnsType<DataItem> = [
    {
      title: "T/R",
      render: (_, __, index) => (params.page - 1) * params.limit + index + 1,
    },
    {
      title: "Name",
      dataIndex: "consumer_name",
    },
    {
      title: "Address",
      dataIndex: "consumer_address",
    },
    {
      title: "Phone number",
      dataIndex: "consumer_phone_number",
    },
    {
      title: "Passport seria",
      dataIndex: "consumer_passport_serial",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      render: (createdAt) => new Date(createdAt).toLocaleDateString(),
    },
    {
      title: "Duration",
      dataIndex: "duration",
    },
    {
      title: "Image",
      dataIndex: "passport_image",
      render: (imageUrl) => (
        <img src={imageUrl} alt="Product Image" style={{ width: 70, height: 50 }} />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              onClick={() => {
                setUpdateData(record);
                setOpen(true); 
              }}
              icon={<EditOutlined />}
            />
          </Tooltip>

          <DeleteConform onConfirm={() => handleDelete(record.id)} title="Are you sure to delete this contract?">
            <Tooltip title="Delete">
              <Button danger icon={<DeleteOutlined />} />
            </Tooltip>
          </DeleteConform>
        </Space>
      ),
    },
  ];

  return (
    <>
      <ProductModal
        open={open}
        handleClose={handleClose}
        update={updateData}
      
      />

      <div className="flex justify-between px-4 mb-4">
      <Input
          placeholder="search..."
          className="w-[300px]"
          onChange={handleChange}
        />
        <Button
          onClick={() => {
            setOpen(true); 
            setUpdateData(null); 
          }}
          type="primary"
        >
          Create Contract
        </Button>
      </div>


{
  isLoading ? <Loading/> : <GlobalTable
  columns={columns}
  data={data?.all_contracts}
  pagination={{
    current: params.page,
    pageSize: params.limit,
    total: total,
    showSizeChanger: true,
    pageSizeOptions: ["2", "5", "7", "10", "12"],
  }}
  onChange={handleTableChange}
/>}
      
    </>
  );
};

export default Index;
