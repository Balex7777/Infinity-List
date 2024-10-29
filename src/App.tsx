import axios from 'axios'
import './App.css'
import Header from './components/Header/Header'
import Item from './components/Item/Item'
import { useEffect, useState } from 'react'
import { IItem } from './models'
import { List, Skeleton } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'

function App() {
	const [items, setItems] = useState<IItem[]>([])
	const [page, setPage] = useState(1);
	// const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

	async function fetchItems(page: number) {
		try{
			const response = await axios.get(`https://api.github.com/search/repositories?q=javascript&order=asc&page=${page}`);
			setItems((prev) => [...prev, ...response.data.items])
			setHasMore(response.data.items.length > 0);
		}catch (error:unknown){
			console.log(error);
		}
	}

	const deleteItem = (id:number) => {
		setItems(prev => prev.filter(item => item.id !== id))
	}

	useEffect(()=>{
		fetchItems(page)
	}, [page]);

  return (
    <>
      <Header />
			<main className='main'>
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
							<Item item={item} key={item.id} deleteItem={deleteItem}/>
						)}
						className='items'
					/>
				</InfiniteScroll>
			</main>
    </>
  )
}

export default App
