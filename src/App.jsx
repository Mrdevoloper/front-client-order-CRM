import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Branches from './components/Branch/Branch';
import Foods from './components/Food/Food';
import Hero from './components/Hero/Hero'
import Korzinka from './components/Korzinka/Korzinka';
import './App.css'

function App() {
	return (
		<>
			<div>
				<Hero/>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/branches/:id' element={<Branches />} />
					<Route path='/foods/:id' element={<Foods />} />
					<Route path='/korzinka' element={<Korzinka />}/>
				</Routes>
			</div>
		</>
	);
}
export default App;
