/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, Modal, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { useCreateExchange, useUpdateExchange } from "../hooks/mutation";
import { ModalPropType } from "../../product/types";
import { useGetContractId } from "../hooks/queries";
import { useGetProduct } from "../../product/hooks/queries";

const CategoryModal = ({ open, handleClose, update }: ModalPropType) => {
  const [form] = useForm();

  // Fetching contracts and products
  const contractQuery = useGetContractId();
  const productQuery = useGetProduct();
  const contracts = contractQuery.data?.all_contracts || [];
  const products = productQuery.data?.all_products || []; 

  const { mutate: createMutate } = useCreateExchange();
  const { mutate: updateMutate } = useUpdateExchange();

  useEffect(() => {
    if (open && update) {
      form.setFieldsValue({
        amount: update.amount,
        contract_id: update.contract_id,
        product_id: update.product_id,
        price: update.price,
        status: update.status,
      });
    } else {
      form.resetFields();
    }
  }, [open, update, form]);

  const handleSubmit = (values: any) => {
    const payload = {
      ...values,
      amount: Number(values.amount), 
      price: Number(values.price), 
    };

    if (update) {
      payload.id = update.id; 
      updateMutate(payload, {
        onSuccess: () => {
          handleClose();
        },
        onError: (error) => {
          console.error("Update failed:", error);
          handleClose();
        },
      });
    } else {
      createMutate(payload, {
        onSuccess: () => {
          handleClose();
        },
        onError: (error) => {
          console.error("Creation failed:", error);
          handleClose();
        },
      });
    }
    
  };

  return (
    <Modal
      title={update ? "Edit Exchange" : "Add Exchange"}
      open={open}
      onCancel={handleClose}
      footer={null}
    >
      <Form layout="vertical" onFinish={handleSubmit} form={form}>
        <Form.Item
          label="Amount"
          name="amount"
          rules={[{ required: true, message: "Please enter amount" }]}
        >
          <Input type="number" placeholder="Enter amount" />
        </Form.Item>

        <Form.Item
          label="Contract ID"
          name="contract_id"
          rules={[{ required: true, message: "Please select a contract ID!" }]}
        >
          <Select placeholder="Select a contract">
            {contracts.map((item: any) => (
              <Select.Option key={item.id.toString()} value={item.id.toString()}>
                {item.consumer_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please enter price" }]}
        >
          <Input type="number" placeholder="Enter price" />
        </Form.Item>

        <Form.Item
          label="Product ID"
          name="product_id"
          rules={[{ required: true, message: "Please select a product ID!" }]}
        >
          <Select placeholder="Select a product">
            {products.map((item: any) => (
              <Select.Option key={item.id.toString()} value={item.id.toString()}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please enter status" }]}
        >
          <Input placeholder="Enter status" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {update ? "Update" : "Create"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryModal;
