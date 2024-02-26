import { useState, Fragment, useImperativeHandle, ReactElement } from 'react'
import { Modal, Form, Input, Button, message } from 'antd'
import { addDevice } from './service';

interface addDeviceModalProps {
  modalRef: any,
}

const AddDeviceModal = (props: addDeviceModalProps): ReactElement => {
  const { modalRef } = props; // 从props传入modalRef
  const [isModalOpen, setIsModalOpen] = useState(false);  // 设置模态框的可见状态

  // 对外暴露open方法，外部组件可通过modalRef.open(callback)来展示模态框
  useImperativeHandle(modalRef, () => {	// 这里传入的ref是通过props传进来的
    return {
      open: (callback: any) => {
        setIsModalOpen(true);
        callback && callback()
      }
    };
  });

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values: any) => {
    const formData = [{
      ip: values.ip,
      port: Number(values.port),
    }];
    addDevice(formData).then((res: any) => {
      if (res.data === -1) {
        message.error("添加失败！请稍后重试！");
      } else if (res.data === 1) {
        message.success("添加成功！");
        setIsModalOpen(false);
      }
    });
  };

  return (
    <Fragment>
      <Modal
        title="新增设备"
        open={isModalOpen}
        onCancel={handleCancel} // 这个必须传，不传会导致模态框无法关闭
        wrapClassName="CheckMediaJob-Modal"
        // width={1000}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="ip地址"
            name="ip"
            rules={[{ required: true, message: '请输入ip地址！' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="端口号"
            name="port"
            rules={[{ required: true, message: '请输入端口号！' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              确认
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Fragment >
  )
}

export default AddDeviceModal