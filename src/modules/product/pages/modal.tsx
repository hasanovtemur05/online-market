/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import dayjs from 'dayjs';
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Space,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  useCreateProduct,
  useUpdateProduct,
  useCreateMedia,
} from "../hooks/mutation";
import { ModalPropType } from "./../types/index";

const ProductModal: React.FC<ModalPropType> = ({
  open,
  handleClose,
  update,
}) => {
  const [form] = Form.useForm();
  const [, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { mutate: createMutate } = useCreateProduct();
  const { mutate: updateMutate } = useUpdateProduct();
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
        name: values.name,
        color: values.color,
        date_of_creation: values.date_of_creation ? values.date_of_creation.toISOString() : null,
        made_in: values.made_in,
        model: values.model,
        image_url: imageUrl,
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
          name: update.name,
          color: update.color,
          date_of_creation: update.date_of_creation ? dayjs(update.date_of_creation) : null, 
          made_in: update.made_in,
          model: update.model,
        });
        setImageUrl(update.image_url || null);
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
      title={update ? "Edit Product" : "Create product"}
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
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter product name" }]}
            >
              <Input placeholder="Please enter product name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="color"
              label="Color"
              rules={[
                { required: true, message: "Please enter product color" },
              ]}
            >
              <Input placeholder="Please enter product color" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="date_of_creation" label="Date of Creation">
              <DatePicker />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="made_in"
              label="Made In"
              rules={[
                { required: true, message: "Please enter where it was made" },
              ]}
            >
              <Input placeholder="Please enter where it was made" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="model"
              label="Model"
              rules={[{ required: true, message: "Please enter the model" }]}
            >
              <Input placeholder="Please enter the model" />
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

export default ProductModal;
