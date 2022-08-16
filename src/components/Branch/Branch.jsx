import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import './Branch.css';

const Branch = gql`
	query branches($id: ID!) {
		branches(resId: $id) {
			id
			name
			pic
		}
	}
`;
const Branches = () => {
	const { id } = useParams();
	const { data } = useQuery(Branch, {
		variables: { id: id },
	});

	const handleClick = (id) => {
		return (window.location.href = `https://gregarious-seahorse-d9c2b4.netlify.app/${id}`);
	};
	return (
		<div className='branchWrapper'>
			{data &&
				data.branches.map((e, i) => (
					<div onClick={(e) => handleClick(e.target.id)} key={i}>
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
											className='link'
											gutterBottom
											variant='h5'
											component='div'>
											{e.name}
										</Typography>
									</CardContent>
								</CardActionArea>
							</Card>
						</div>
					</div>
				))}
		</div>
	);
};

export default Branches;
