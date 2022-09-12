import './Korzinka.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useMutation, gql } from '@apollo/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import { useState } from 'react';

const NEW_ORDER = gql`
	mutation newOrder(
		$name: String!
		$userName: String!
		$userNumber: String!
		$userLocation: String!
	) {
		newOrder(
			name: $name
			userName: $userName
			userNumber: $userNumber
			userLocation: $userLocation
		) {
			id
			name
			userName
			userNumber
			userLocation
			time
		}
	}
`;

function Korzinka() {
	const [order, setorder] = useState([]);
	const [corz, setCorz] = useState(
		JSON.parse(window.localStorage.getItem('corzinka')) || [],
	);

	const [variables, setVariables] = useState({
		name: '',
		userName: '',
		userNumber: '',
		userLocation: '',
	});
	const navigate = useNavigate();

	const handleCorzinka = (corzinkaID) => {
		let filteredCorzink = corz?.filter(
			(korzinka) => korzinka.id !== corzinkaID,
		);
		setCorz(filteredCorzink);
		window.localStorage.setItem(
			'corzinka',
			JSON.stringify(filteredCorzink),
		);
	};

	const handleChageInput = (inputValue, corzItem) => {
		corzItem.count = inputValue;
		const filteredOrders = order?.filter(
			(item) => item?.id !== corzItem?.id,
		);
		setorder([...filteredOrders, corzItem]);
	};

	// Order qoshish

	const [newOrder] = useMutation(NEW_ORDER);

	const handleSubmit = (e) => {
		e.preventDefault();

		let zakaz = '';
		for (let i = 0; i < order.length; i++) {
			if (i !== 0) {
				zakaz += `, ${order[i]?.count} ta ${order[i]?.name}`;
			} else {
				zakaz += `${order[i]?.count} ta ${order[i]?.name}`;
			}
		}
		variables.name = zakaz;

		if (zakaz.length) {
			newOrder({ variables });
			window.localStorage.removeItem('corzinka');
			navigate('/');
			alert("Zakazingiz qabul qilindi")
		} else {
			alert('Qiymat kiritilmagan');
		}
	};
	return (
		<div className='allwrapper'>
			<div className='wrappe'>
				{!corz[0] && (
					<img className='imageKarzinka'
						src={
							'https://i.pinimg.com/originals/ee/98/ef/ee98ef00b4034d491f858fe1c23c7431.png'
						}
						alt=''
					/>
				)}
				{corz?.map((corzItem, i) => (
					<div key={i}>
						<div className='wrapperKorzinka'>
							<Card sx={{ maxWidth: 600 }}>
								<CardActionArea>
									<CardMedia
										component='img'
										height='250'
										id={corzItem.id}
										image={corzItem.pic}
										alt='green iguana'
									/>
									<CardContent>
										<Typography
											gutterBottom
											variant='h5'
											component='div'>
											{corzItem.name}
										</Typography>
									</CardContent>
									<CardContent>
										<Typography
											gutterBottom
											variant='h5'
											component='div'>
											{corzItem.price + ' sum'}
										</Typography>
									</CardContent>
								</CardActionArea>
								<div className='cardWrapper'>
									<div className='wrappernumberOrder'>
										<h3 className='howmany'>
											How many you want to order?
										</h3>
										<input
											onChange={(item) =>
												handleChageInput(
													item.target.value,
													corzItem,
												)
											}
											placeholder='count'
											className='numberSoni'
											type='number'
											name='count'
										/>
									</div>
									<Stack
										className='outline'
										spacing={2}
										direction='row'>
										<Button
											id={corzItem.id}
											onClick={(evt) =>
												handleCorzinka(evt.target.id)
											}
											variant='outlined'
											color='primary'>
											delete
										</Button>
									</Stack>
								</div>
							</Card>
						</div>
					</div>
				))}
			</div>

			{corz[0] && (
				<button
					type='button'
					className='btn btn-primary btnn'
					data-bs-toggle='modal'
					data-bs-target='#staticBackdrop'>
					ORDER
				</button>
			)}
			<div
				className='modal fade modalka_u'
				id='staticBackdrop'
				data-bs-backdrop='static'
				data-bs-keyboard='false'
				tabIndex='-1'
				aria-labelledby='staticBackdropLabel'
				aria-hidden='true'>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5
								className='modal-title'
								id='staticBackdropLabel'>
								User Info
							</h5>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'></button>
						</div>

						<form onSubmit={(e) => handleSubmit(e)}>
							<div className='modal-body'>
								<div className='wrapperInput'>
									<input
										onChange={(e) =>
											setVariables({
												...variables,
												userName: e.target.value,
											})
										}
										required
										className='modalInput'
										placeholder='Name'
										type='text'
										name='name'
									/>
									<input
										onChange={(e) =>
											setVariables({
												...variables,
												userNumber: e.target.value,
											})
										}
										required
										className='modalInput'
										placeholder='Number'
										type='number'
										name='phone'
									/>
									<input
										onChange={(e) =>
											setVariables({
												...variables,
												userLocation: e.target.value,
											})
										}
										required
										className='modalInput'
										placeholder='Location'
										type='text'
										name='location'
									/>
								</div>
							</div>
							<div className='modal-footer'>
								<button
									type='button'
									className='btn btn-secondary'
									data-bs-dismiss='modal'>
									Cancel
								</button>
								<button
									data-bs-dismiss='modal'
									type='submit'
									className='btn btn-primary'>
									Order
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Korzinka;
