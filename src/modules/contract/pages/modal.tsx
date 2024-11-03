/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  useCreateContract,
  useCreateMedia,
  useUpdateContract,
} from "../hooks/mutation";
import { ModalPropType } from "../../product/types";

const ContractModal: React.FC<ModalPropType> = ({
  open,
  handleClose,
  update,
}) => {
  const [form] = Form.useForm();
  const [, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { mutate: createMutate } = useCreateContract();
  const { mutate: updateMutate } = useUpdateContract();
  const { mutateAsync: createMedia } = useCreateMedia();

  const handleFileChange = async (info: { fileList: any[] }) => {
    const selectedFile = info.fileList[0]?.originFileObj as File;
    setFile(selectedFile || null);

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await createMedia(formData);
      if (response) {
        setImageUrl(response.data.made_url);
        console.log(response.data.made_url);
      } else {
        console.log("img yuq");
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const productData: any = {
        consumer_address: values.consumer_address,
        consumer_name: values.consumer_name,
        consumer_passport_serial: values.consumer_passport_serial,
        consumer_phone_number: values.consumer_phone_number,
        duration: values.duration,
        passport_image: imageUrl,
      };

      if (update) {
        productData.id = update.id;
        updateMutate(productData, {
          onSuccess: () => {
            handleClose();
            form.resetFields();
            setFile(null);
            setImageUrl(null);
          },
        });
        console.log(productData);
      } else {
        createMutate(productData, {
          onSuccess: () => {
            handleClose();
            form.resetFields();
            setFile(null);
            setImageUrl(null);
          },
        });
      }
    } catch (error) {
      console.error("Form submission failed:", error);
    }
  };

  useEffect(() => {
    if (open) {
      if (update) {
        form.setFieldsValue({
          consumer_address: update.consumer_address,
          consumer_name: update.consumer_name,
          consumer_passport_serial: update.consumer_passport_serial,
          consumer_phone_number: update.consumer_phone_number,
          duration: update.duration,
        });
        setImageUrl(update.passport_image || null);
        setFile(null);
      } else {
        form.resetFields();
        setFile(null);
        setImageUrl(null);
      }
    }
  }, [open, update, form]);
  return (
    <Drawer
      title={update ? "Edit Contract" : "Create Contract"}
      width={500}
      onClose={handleClose}
      open={open}
      bodyStyle={{ paddingBottom: 80 }}
      extra={
        <Space>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} type="primary">
            Submit
          </Button>
        </Space>
      }
    >
      <Form layout="vertical" form={form} hideRequiredMark>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="consumer_name"
              label="consumer_name"
              rules={[
                { required: true, message: "Please enter Contract name" },
              ]}
            >
              <Input placeholder="Please enter product name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="consumer_address"
              label="consumer_address"
              rules={[
                { required: true, message: "Please enter contract color" },
              ]}
            >
              <Input placeholder="Please enter contract color" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="consumer_passport_serial"
              label="consumer_passport_serial"
              rules={[
                { required: true, message: "Please enter contract color" },
              ]}
            >
              <Input placeholder="Please enter contract color" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="consumer_phone_number"
              label="consumer_phone_number "
              rules={[
                {
                  required: true,
                  message: "Please enter where it was consumer_phone_number",
                },
              ]}
            >
              <Input placeholder="Please enter where it was consumer_phone_number" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="duration"
              label="duration"
              rules={[{ required: true, message: "Please enter the duration" }]}
            >
              <InputNumber
                placeholder="Please enter the duration"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Upload Product Image">
              <Upload
                beforeUpload={() => false}
                onChange={handleFileChange}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Select File</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default ContractModal;
