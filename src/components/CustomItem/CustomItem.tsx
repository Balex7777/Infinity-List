import React, { useState } from 'react';
import styles from './CustomItem.module.css';
import { IItem } from '../../models';
import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Flex, Form, Popconfirm } from 'antd';
import CustomModal from '../CustomModal/CustomModal';

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
    <Flex className={styles.item} justify="space-between">
      <div>
        <h2 className={styles.item__title}>
          <a href={localItem.html_url} target="_blank" rel="noopener noreferrer">
            {localItem.full_name}
          </a>
        </h2>
        <div className={styles.item__owner}>
          <img src={localItem.owner.avatar_url} alt={localItem.owner.login} className={styles.item__avatar} />
          <h3>{localItem.owner.login}</h3>
          <div className={styles.item__stars}>
            <svg
              aria-hidden="true"
              height="16"
              viewBox="0 0 16 16"
              version="1.1"
              width="16"
              data-view-component="true"
              className={styles.item__star}
            >
              <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path>
            </svg>
            <span>{localItem.stargazers_count}</span>
          </div>
        </div>
      </div>
      <div>
        <EditOutlined onClick={() => setModal(true)} className={styles.item__icon} />
        <CustomModal modal={modal} setModal={setModal} localItem={localItem} setLocalItem={setLocalItem} form={form}/>
        <Popconfirm
          title="Delete the item"
          description="Are you sure to delete this item?"
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          onConfirm={handleDelete}
        >
          <DeleteOutlined className={styles.item__icon} />
        </Popconfirm>
      </div>
    </Flex>
  );
}
