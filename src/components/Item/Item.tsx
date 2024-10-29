import React, { useState } from 'react'
import styles from "./Item.module.css"
import { IItem } from '../../models'
import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { Form, Input, Modal, Popconfirm } from 'antd'

interface ItemProps{
	item: IItem
	deleteItem: (id: number) => void
}

interface IFormItem{
	full_name:string
	html_url: string
	login: string
	stargazers_count: number
}

export default function Item({ item, deleteItem }: ItemProps) {
	const [modal, setModal] = useState(false)
	const [form] = Form.useForm()
	const [localItem, setLocalItem] = useState<IItem>(item)

	const handleDelete = () => {
		deleteItem(localItem.id)
	}

	const onEdit = (values: IFormItem) => {
		setLocalItem((prevItem) => ({
			...prevItem,
			full_name: values.full_name,
			html_url: values.html_url,
			owner: { ...prevItem.owner, login: values.login },
			stargazers_count: values.stargazers_count,
		}))
	}

	return (
		<div className={styles.item}>
			<div>
				<h2 className={styles.item__title}><a href={localItem.html_url} target="_blank">{localItem.full_name}</a></h2>
				<div className={styles.item__owner}>
					<img src={localItem.owner.avatar_url} alt={localItem.owner.login} className={styles.item__avatar}/>
					<h3>{localItem.owner.login}</h3>
					<div className={styles.item__stars}>
						<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className={styles.item__star}>
							<path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path>
						</svg>
						<span>{localItem.stargazers_count}</span>
					</div>
				</div>
			</div>
			<div>
				<EditOutlined 
					onClick={() => setModal(true)}
					className={styles.item__icon}
				/>
				<Modal
					title="Edit item"
					centered
					open={modal}
					okButtonProps={{ autoFocus: true, htmlType: 'submit' }}
					onCancel={() => {
						form.resetFields()
						setModal(false)
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
							}}
							onFinish={() => {
								form
									.validateFields()
									.then((values) => {
										onEdit(values);
										setModal(false);
									})
									.catch(() => {});
							}}
						>
							{dom}
						</Form>
					)}
				>
					
						<Form.Item
							name="full_name"
							label="Full name"
							rules={[{ required: true, message: 'Please input the name of repository!' }]}
						>
							<Input />
						</Form.Item>
						<Form.Item 
							name="html_url" 
							label="Url"
							rules={[{ required: true, message: 'Please input the url of repository!' }]}
						>
							<Input type="link" />
						</Form.Item>
						<Form.Item 
							name="login" 
							label="Login"
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
				</Modal>

				<Popconfirm 
					title="Delete the item"
					description="Are you sure to delete this item?"
					icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
					onConfirm={handleDelete}
				>
					<DeleteOutlined className={styles.item__icon}/>
				</Popconfirm>
			</div>
		</div>
	)
}
