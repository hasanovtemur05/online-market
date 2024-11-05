/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import GlobalTable from "../../../components/table";
import { useLocation, useNavigate } from "react-router-dom";
import { Loading } from "@components";
import { Button, Input, Space, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { DataItem } from "../../product/types";
import DeleteConform from "../../../components/popconform";
import { useGetTransaction } from "../hooks/queries";
import { useDeleteTransaction } from "../hooks/mutation";
import TransactionModal from "./modal";

const Index = () => {
  const [params, setParams] = useState({
    search: "",
    page: 1,
    limit: 3,
  });
  const [updateData, setUpdateData] = useState<any | null>(null);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false)
  const navigate = useNavigate();
  const { data, isLoading } = useGetTransaction(params);
  
  const { search } = useLocation();
  const { mutate: deleteMutate } = useDeleteTransaction();

  useEffect(() => {
    if (data?.count) {
      setTotal(data.count);
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

    setParams({
      page: page,
      limit: limit,
      search: searchValue,
    });
  }, [search]);

  const handleClose = () => {
    setOpen(false);
    setUpdateData(null); 
  };

  const handleDelete = (id: number | undefined) => {
    if (id !== undefined) {
      deleteMutate(id, {
        onSuccess: () => {
          setParams((prev) => ({ ...prev })); 
        },
      });
    } else {
      console.error("ID is undefined, cannot delete transaction.");
    }
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
 
  

  const columns: ColumnsType<DataItem> = [
    {
      title: "T/R",
      render: (_, __, index) => (params.page - 1) * params.limit + index + 1,
    },
    {
      title: "created_at",
      dataIndex: "created_at",
      render: (createdAt) => new Date(createdAt).toLocaleDateString(),
    },
    {
      title: "duration",
      dataIndex: "duration",
    },
    {
      title: "price",
      dataIndex: "price",
    },
    {
      title: "id",
      dataIndex: "id",
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
          <DeleteConform onConfirm={() => handleDelete(record.id)} title="Are you sure to delete this transaction?">
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
      <TransactionModal
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
          Create Transaction
        </Button>
      </div>

      {isLoading ? <Loading /> : (
        <GlobalTable
          columns={columns}
          data={data?.all_transactions}
          pagination={{
            current: params.page,
            pageSize: params.limit,
            total: total,
            showSizeChanger: true,
            pageSizeOptions: ["2", "5", "7", "10", "12"],
          }}
          onChange={handleTableChange}
        />
      )}
    </>
  );
};


export default Index;


