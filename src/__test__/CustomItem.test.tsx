import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import CustomItem from '../components/CustomItem/CustomItem';
import { IItem } from '../models';
import '@testing-library/jest-dom';

const mockDeleteItem = jest.fn();
const item: IItem = {
  id: 1,
  full_name: 'Test Repository',
  html_url: 'https://github.com/test/repo',
  owner: {
    avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
    login: 'test_owner',
  },
  stargazers_count: 123,
  forks: 45,
};

describe('CustomItem', () => {
  beforeEach(() => {
    mockDeleteItem.mockClear();
  });

  test('отображение основного контента', () => {
    render(
			<React.Fragment>
				<CustomItem item={item} deleteItem={mockDeleteItem} />
			</React.Fragment>
		);

    // Проверка наличия ссылки на репозиторий
    const repoLink = screen.getByRole('link', { name: 'Test Repository' });
    expect(repoLink).toHaveAttribute('href', item.html_url);

    // Проверка отображения информации владельца
    expect(screen.getByText(item.owner.login)).toBeInTheDocument();
    expect(screen.getByAltText(item.owner.login)).toHaveAttribute('src', item.owner.avatar_url);

    // Проверка количества звезд и форков
    expect(screen.getByText(item.stargazers_count.toString())).toBeInTheDocument();
    expect(screen.getByText(item.forks.toString())).toBeInTheDocument();
  });

  test('удаление элемента через Popconfirm', () => {
    render(<CustomItem item={item} deleteItem={mockDeleteItem} />);

    // Нажимаем на иконку удаления
    fireEvent.click(screen.getByTestId('delete-icon'));

    // Подтверждаем удаление
    fireEvent.click(screen.getByText('OK'));

    // Проверяем, что deleteItem был вызван с правильным ID
    expect(mockDeleteItem).toHaveBeenCalledWith(item.id);
  });

  test('открытие модального окна при нажатии на иконку редактирования', () => {
    render(
			<React.Fragment>
				<CustomItem item={item} deleteItem={mockDeleteItem} />
			</React.Fragment>
		);

    // Нажимаем на иконку редактирования
    fireEvent.click(screen.getByTestId('edit-icon'));

    // Ожидаем появления текста "Редактирование" в модальном окне
    expect(screen.getByText('Edit item')).toBeInTheDocument();
		// expect(true).toBe(true)
  });
});
