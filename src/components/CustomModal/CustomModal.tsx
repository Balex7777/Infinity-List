import { Form, Modal, Input, FormInstance } from 'antd';
import React from 'react';
import { IItem } from '../../models';

interface IFormValues {
  full_name: string;
  html_url: string;
  login: string;
  stargazers_count: number;
	forks: number
}

interface ModalProps {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  localItem: IItem;
  setLocalItem: React.Dispatch<React.SetStateAction<IItem>>;
	form: FormInstance;
}

export default function CustomModal({ modal, setModal, localItem, setLocalItem, form }: ModalProps) {
  const onEdit = (values: IFormValues) =>	 {
    setLocalItem((prevItem) => ({
			...prevItem,
			full_name: values.full_name,
			html_url: values.html_url,
			owner: { ...prevItem.owner, login: values.login },
			stargazers_count: values.stargazers_count,
			forks: values.forks
		}));
  };

  return (
    <Modal
			title="Edit item"
			centered
			open={modal}
			okButtonProps={{ htmlType: 'submit' }}
			onCancel={() => {
				form.resetFields();
				setModal(false);
			}}
			modalRender={(dom) => (
				<Form
					layout="vertical"
					form={form}
					name="form_in_modal"
					initialValues={{
						full_name: localItem.full_name,
						html_url: localItem.html_url,
						login: localItem.owner.login,
						stargazers_count: localItem.stargazers_count,
						forks: localItem.forks
					}}
					onFinish={(values) => {
						onEdit(values);
						setModal(false);
					}}
				>
					{dom}
				</Form>
			)}
		>
		
			<Form.Item
				name="full_name"
				label="Repository name"
				rules={[{ required: true, message: 'Please input the name of repository!' }]}
			>
				<Input/>
			</Form.Item>
			<Form.Item
				name="html_url"
				label="Url"
				rules={[{ required: true, message: 'Please input the URL of repository!' }]}
			>
				<Input type="url" />
			</Form.Item>
			<Form.Item
				name="login"
				label="Owner"
				rules={[{ required: true, message: 'Please input the owner login!' }]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				name="stargazers_count"
				label="Stars"
				rules={[{ required: true, message: 'Please input count of stars!' }]}
			>
				<Input type="number" />
			</Form.Item>
			<Form.Item
				name="forks"
				label="Forks"
				rules={[{ required: true, message: 'Please input count of forks!' }]}
			>
				<Input type="number" />
			</Form.Item>
	</Modal>

  );
}
