import Icons from './components/Icons';
import { useEffect, useState } from 'react';
import './App.css';



function App() {

	const [search, setSearch] = useState('roma')
	const [values, setValues] = useState('')
	const [icon, setIcon] = useState('')

	const URL = `https://api.openweathermap.org/data/2.5/weather?q=${search}&lang=es&units=metric&appid=${process.env.REACT_APP_API_KEY}`

	const getData = async () => {
		await fetch(URL)
			.then(response => { return response.json() })
			.then(data => {
				if (data.cod >= 400) {
					setValues(false)
				} else {
					console.log(data)
					console.log(data.weather[0].main)
					setIcon(data.weather[0].main)
					setValues(data)
				}
				//console.log(data.name)
			})
			.catch(error => {
				console.log(error)
			})
	}

	const handleSearch = (e) => {
		if (e.key === 'Enter') {
			//console.log(e.target.value)
			setSearch(e.target.value)
		}
	}


	useEffect(() => {
		getData()
	}, [search])

	return (
		<>
			<div className="container">
				<h3>¡Bienvenido a nuestra aplicación de clima, donde las estaciones cambian, pero nuestra precisión es constante!</h3>
				<div className='row'>
					<input
						onKeyDown={handleSearch}
						type="text"
						autoFocus
					/>
				</div>
			</div>
			< div className='card'>

				{(values) ? (
					<div className='card-container'>
						<h1 className='city-name'>{values.name}</h1>
						<p className='temp'>{values.main.temp.toFixed(0)}&deg;</p>
						<img className='icon' src={Icons(icon)} alt='icon-weather' />
						<div className='card-footer'>
							<p className='temp-max-min'>{values.main.temp_min.toFixed(0)}&deg; | {values.main.temp_max.toFixed(0)}&deg; </p>
						</div>
					</div>
				) : (
					<h1>{"City not found"}</h1>
				)}

			</div>
		</>
	);
}

export default App;
