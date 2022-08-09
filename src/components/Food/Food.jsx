import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import './Food.css';
// button

const FOOD = gql`
	query foods($id: ID!) {
		foods(branchId: $id) {
			id
			name
			pic
			price
		}
	}
`;
const Foods = () => {
	const { id } = useParams();
	const { data } = useQuery(FOOD, {
		variables: { id: id },
	});
	const handleCorzinka = (e) => {
		const corzinkalar =
			JSON.parse(window.localStorage.getItem('corzinka')) || [];
		const foundE = corzinkalar.find((corzinka) => corzinka?.id == e.id);
		if (foundE) {
			alert(`Karzinkaga ${e.name} qo'shilgan 👉🏻`);
		} else {
			alert('Zakazni tasdiqlash uchun bosing!');
			corzinkalar.push(e);
		}
		window.localStorage.setItem('corzinka', JSON.stringify(corzinkalar));
	};
	return (
		<>
			<div className='wrapperFood'>
				{data &&
					data.foods.map((e, i) => (
						<div className='nm' key={i}>
							<Card sx={{ maxWidth: 600 }}>
								<CardActionArea>
									<CardMedia
										component='img'
										height='250'
										id={e.id}
										image={e.pic}
										alt='green iguana'
									/>
									<CardContent>
										<Typography
											gutterBottom
											variant='h5'
											component='div'>
											{e.name}
										</Typography>
									</CardContent>
									<CardContent>
										<Typography
											gutterBottom
											variant='h5'
											component='div'>
											{e.price + ' sum'}
										</Typography>
									</CardContent>
								</CardActionArea>

								<Stack className='outline' spacing={2} direction='row'>
									<Button 
										onClick={() => handleCorzinka(e)}
										variant='outlined'>
										buyurtama berish
									</Button>
								</Stack>
							</Card>
						</div>
					))}
			</div>
		</>
	);
};

export default Foods;
