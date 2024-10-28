import axios from 'axios'
import './App.css'
import Header from './components/Header/Header'
import Item from './components/Item/Item'
import { useEffect, useState } from 'react'
import { IItem } from './models'

function App() {
	const [items, setItems] = useState<IItem[]>([])

	async function fetchItems() {
		try{
			const response = await axios.get('https://api.github.com/search/repositories?q=javascript&sort=stars&order=asc&page=1');
			setItems(response.data.items)
		}catch (error:unknown){
			console.error(error);
		}
	}

	useEffect(()=>{
		fetchItems()
	}, []);

  return (
    <>
      <Header />
			<main className='main'>
				<section className='items'>
					{items.map(item => <Item item={item} key={item.id}/>)}
				</section>
			</main>
    </>
  )
}

export default App
