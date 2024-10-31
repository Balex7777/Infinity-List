import React, { useState } from 'react';
import './CustomItem.css';
import { IItem } from '../../models';
import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Flex, Form, Image, Popconfirm, Space, Typography } from 'antd';
import CustomModal from '../CustomModal/CustomModal';


const { Title } = Typography;

interface ItemProps {
  item: IItem;
  deleteItem: (id: number) => void;
}

export default function CustomItem({ item, deleteItem }: ItemProps) {
  const [modal, setModal] = useState(false);
  const [localItem, setLocalItem] = useState<IItem>(item);
	const [form] = Form.useForm()

  const handleDelete = () => {
    deleteItem(localItem.id);
  };

  return (
		<React.Fragment>
    <Flex className="item" justify="space-between">
      <Space direction='vertical' size='small'>
				<Title level={3} className="item__title">
					<a href={localItem.html_url} target="_blank" rel="noopener noreferrer">
						{localItem.full_name}
					</a>
				</Title>
        <Flex className="item__owner">
          <Image width={30} preview={false} src={localItem.owner.avatar_url} alt={localItem.owner.login} className="item__avatar" />
          <p style={{marginLeft: 10}}>{localItem.owner.login}</p>
          <div className="item__stars">
            <svg
              aria-hidden="true"
              height="16"
              viewBox="0 0 16 16"
              version="1.1"
              width="16"
              data-view-component="true"
              className="item__star"
            >
              <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path>
            </svg>
            <span>{localItem.stargazers_count}</span>
          </div>
					<div className="item__stars">
						<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="item__star">
								<path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
						</svg>
            <span>{localItem.forks}</span>
          </div>
        </Flex>
      </Space>
      <div>
        <EditOutlined data-testid="edit-icon" onClick={() => setModal(true)} className="item__icon" />
        <CustomModal modal={modal} setModal={setModal} localItem={localItem} setLocalItem={setLocalItem} form={form}/>
        <Popconfirm
          title="Delete the item"
          description="Are you sure to delete this item?"
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          onConfirm={handleDelete}
        >
          <DeleteOutlined data-testid="delete-icon" className="item__icon" />
        </Popconfirm>
      </div>
    </Flex>
		</React.Fragment>
  );
}
