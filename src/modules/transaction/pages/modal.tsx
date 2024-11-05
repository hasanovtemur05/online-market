/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, Modal, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { useCreateTransaction, useUpdateTransaction } from "../hooks/mutation";
import { ModalPropType } from "../../product/types";
import { useGetContractId } from "../hooks/queries";
import { useEffect } from "react";

const TransactionModal = ({ open, handleClose, update }: ModalPropType) => {
  const [form] = useForm();
  const contractQuery = useGetContractId();
  const contracts = contractQuery.data?.all_contracts || [];

  const { mutate: createMutate } = useCreateTransaction();
  const { mutate: updateMutate } = useUpdateTransaction();

  useEffect(() => {
    if (open && update) {
      form.setFieldsValue({
        contract_id: update.contract_id,
        price: update.price,
        duration: update.duration, 
      });
    } else {
      form.resetFields();
    }
  }, [open, update, form]);


  const handleSubmit = (values: any) => {
    const payload: any = {
      ...values,
      price: Number(values.price),
    };

    if (update) {
      payload.id = update.id;
      payload.duration = Number(values.duration); 
      updateMutate(payload, {
        onSuccess: () => {
          handleClose();
        },
        onError: (error) => {
          console.error(error);
          handleClose();
        },
      });
    } else {
      createMutate(payload, {
        onSuccess: () => {
          handleClose();
        },
        onError: (error) => {
          console.error(error);
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

        {update && (
          <Form.Item
            label="duration"
            name="duration"
            rules={[{ required: true, message: "Please enter duration" }]}
          >
            <Input type="number" placeholder="Enter duration" />
          </Form.Item>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {update ? "Update" : "Create"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TransactionModal;
