import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import './Home.css';

const RESTAURANT = gql`
	query {
		restaurants {
			id
			name
			pic
		}
	}
`;

const Home = () => {
	const { data, loading, error } = useQuery(RESTAURANT);
	return (
		<>
			<div className='wrapper'>
				{loading && <>Loading...</>}
				{error && <>error...</>}
				{data &&
					data.restaurants.map((e, i) => (
						<div className='nm' key={i}>
							<Link className='link' to={`branches/${e.id}`}>
								<Card sx={{ maxWidth: 600 }}>
									<CardActionArea>
										<CardMedia
											component='img'
											height='250'
											image={e.pic}
											alt='green iguana'
										/>
										<CardContent>
											<Typography className='heading'
												gutterBottom
												variant='h5'
												component='div'>
												{e.name}
										
											</Typography>
										</CardContent>
									</CardActionArea>
								</Card>
							</Link>
						</div>
					))}
			</div>
		</>
	);
};

export default Home;