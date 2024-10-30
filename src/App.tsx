import axios from 'axios'
import './App.css'
import CustomItem from './components/CustomItem/CustomItem'
import { ChangeEvent, useEffect, useState } from 'react'
import { IItem } from './models'
import { ConfigProvider, List, Skeleton, theme, Layout, Flex, Radio } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Content, Footer, Header } from 'antd/es/layout/layout'

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

	const radioHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setSortValue(e.target.value)
		setPage(1)
		setItems([])
		console.log(e.target.value)
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
				<Header>
					<h1 className='header__title'>The Infinity List</h1>	
				</Header>
				<Content className='main'>
					<div className='sorting'>
						<p className='sorting__text'>Sorted by: </p>
						<Radio.Group defaultValue="a" value={sortValue} buttonStyle="solid" className='radio' onChange={radioHandler}>
							<Radio.Button value={"a"}>X</Radio.Button>
							<Radio.Button value={"b"}>Forks</Radio.Button>
							<Radio.Button value={"c"}>Stars</Radio.Button>
						</Radio.Group>
					</div>

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
