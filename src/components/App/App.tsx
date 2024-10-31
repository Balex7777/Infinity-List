import React from 'react';
import axios from 'axios'
import './App.css'
import CustomItem from '../CustomItem/CustomItem'
import { useEffect, useState } from 'react'
import { IItem } from '../../models'
import { ConfigProvider, List, Skeleton, theme, Layout, Flex, Radio, Typography } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'
import { RadioChangeEvent } from 'antd/lib/radio/interface';

const { Content, Footer, Header } = Layout;
const { Title } = Typography;

function App() {
	const [items, setItems] = useState<IItem[]>([])
	const [sortValue, setSortValue] = useState("a")
	const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

	const sortMap: Record<string, string> = {
			a: "",
			b: "sort=forks&",
			c: "sort=stars&",
	};

	async function fetchItems(page: number, sort: string) {
		try{
			const response = await axios.get(`https://api.github.com/search/repositories?q=javascript&${sort}order=asc&page=${page}`);
			setItems((prev) => [...prev, ...response.data.items])
			setHasMore(response.data.items.length > 0);
		}catch (error:unknown){
			console.log(error);
		}
	}

	const deleteItem = (id:number) => {
		setItems(prev => prev.filter(item => item.id !== id))
	}

	const radioHandler = (e: RadioChangeEvent) => {
		setSortValue(e.target.value)
		setPage(1)
		setItems([])
	}

	useEffect(() => {
    fetchItems(page, sortMap[sortValue]);
	}, [page, sortValue]);


  return (
    <ConfigProvider
			theme={{
				components: {
					Layout: {
						headerBg: "#000",
						headerColor: "#fff"
					},
				},
				algorithm: theme.darkAlgorithm,
			}}
		>
			<Layout className='layout'>
				<Header className='header'>
					<Title level={1} className='header__title'>The Infinity List</Title>	
				</Header>
				<Content className='main'>
					<Flex className='sorting' justify='end'>
						<p className='sorting__text'>Sorted by:</p>
						<Radio.Group onChange={radioHandler} defaultValue="a" value={sortValue} buttonStyle="solid" className='radio'>
							<Radio.Button value={"a"}>X</Radio.Button>
							<Radio.Button value={"b"}>Forks</Radio.Button>
							<Radio.Button value={"c"}>Stars</Radio.Button>
						</Radio.Group>
					</Flex>

					<InfiniteScroll
						dataLength={items.length}
						next={() => setPage(prev => prev + 1)}
						hasMore={hasMore}
						loader={<Skeleton active paragraph={{ rows: 2 }} className='loading' />}
					>
						<List 
							locale={{emptyText: " "}}
							dataSource={items}
							renderItem={(item) => (
								<List.Item>
									<CustomItem item={item} key={item.id} deleteItem={deleteItem}/>
								</List.Item>
							)}
							className='items'
						/>
					</InfiniteScroll>
				</Content>
				<Footer className='footer'>
					<Flex justify='space-between'>
						<p>© 2024 Morev Aleksey</p>
						<p>My <a href='https://github.com/Balex7777' className='footer__github'>GitHub</a></p>
					</Flex>
				</Footer>
			</Layout>
    </ConfigProvider>
  )
}

export default App
