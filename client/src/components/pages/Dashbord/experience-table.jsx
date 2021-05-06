import React from "react";
import { Link } from "react-router-dom";

import ExperienceRow from "./experience-row";

const ExperienceTable = ({ experience }) => {
	return (
		<div className='container mt-4'>
			<div className='card'>
				<div className='card-header'>
					<strong className='card-title'>Experience Table</strong>
					<Link
						className='btn btn-success float-right'
						role='button'
						to='/user/create-experience'
					>
						<i className='fas fa-plus-circle text-white mr-2'></i>Add Experience
					</Link>
				</div>
				<div className='card-body'>
					<table className='table'>
						<thead>
							<tr>
								<th scope='col'>#</th>
								<th scope='col'>Company</th>
								<th scope='col'>Title</th>
								<th scope='col'>Years</th>
								<th className='text-center' scope='col'>
									Actions
								</th>
							</tr>
						</thead>
						<tbody>
							<ExperienceRow experience={experience} />
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default ExperienceTable;
