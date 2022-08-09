import { Link } from 'react-router-dom';
import './Hero.css';
function Hero() {
	return (
		<div className='containerr'>
			<div className='navbar'>
				<Link className='link' to={'/'}>
					<h1 className='delivery'>Delivery</h1>
				</Link>
				<div className='clk'>
					<Link to={'/korzinka'}>
						<img
							className='imageKorzina'
							src={
								'https://i.pinimg.com/originals/ee/98/ef/ee98ef00b4034d491f858fe1c23c7431.png'
							}
							alt=''
						/>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Hero;
