import axios from 'axios'
import './App.css'
import Header from './components/Header/Header'
import Item from './components/Item/Item'
import { useEffect, useState } from 'react'
import { IItem } from './models'

function App() {
	const [items, setItems] = useState<IItem[]>([])
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

	async function fetchItems(page: number) {
		try{
			setLoading(true)
			const response = await axios.get(`https://api.github.com/search/repositories?q=javascript&sort=stars&order=asc&page=${page}`);
			setItems((prev) => [...prev, ...response.data.items])
			setHasMore(response.data.items.length > 0);
		}catch (error:unknown){
			console.error(error);
		}finally{
			setLoading(false)
		}
	}

	useEffect(()=>{
		fetchItems(page)
	}, [page]);

	useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 100 && hasMore && !loading
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  return (
    <>
      <Header />
			<main className='main'>
				<section className='items'>
					{items.map((item, index) => <Item item={item} key={`${item.id}-${index}`}/>)}
					{loading && <p className="loading">Loading...</p>}
				</section>
			</main>
    </>
  )
}

export default App
