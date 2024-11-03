/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import GlobalTable from "../../../components/table";
import { useLocation, useNavigate } from "react-router-dom";
import { Loading } from "@components";
import { Button, Input, Space, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { DataItem } from "../../product/types";
import { useGetExchange } from "../hooks/queries";
import ExchangeModal from "./modal";
import DeleteConform from "../../../components/popconform";
import { useDeleteExchange } from "../hooks/mutation";

const Index = () => {
  const [params, setParams] = useState({
    search: "",
    page: 1,
    limit: 3,
  });
  const [total, setTotal] = useState(0);
  const [updateData, setUpdateData] = useState<any | null>(null);
  const [open, setOpen] = useState(false);  
  const navigate = useNavigate();
  const { data, isLoading } = useGetExchange(params);
  console.log(data);
  
  const { search } = useLocation();
  const { mutate: deleteMutate } = useDeleteExchange();



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
      title: "amount",
      dataIndex: "amount",
    },
    {
      title: "id",
      dataIndex: "id",
      render: (text) => text.replace(/\D/g, ''),
    },
    {
      title: "price",
      dataIndex: "price",
    },
    
   
    {
      title: "status",
      dataIndex: "status",
    },

    {
      title: "product_id",
      dataIndex: "product_id",
      render: (text) => text.replace(/\D/g, ''),
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

          <DeleteConform onConfirm={() => handleDelete(record.id)} title="Are you sure to delete this exchange?">
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
      <ExchangeModal
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
          Create Exchange
        </Button>
      </div>


{
  isLoading ? <Loading/> : <GlobalTable
  columns={columns}
  data={data?.all_exchanges}
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
