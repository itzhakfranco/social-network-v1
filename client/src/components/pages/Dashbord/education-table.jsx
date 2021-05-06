import React from "react";
import { Link } from "react-router-dom";

import EducationRow from "./education-row";

const EducationTable = ({ education }) => {
	return (
		<div className='container mt-4'>
			<div className='card'>
				<div className='card-header'>
					<strong className='card-title'>Education Table</strong>
					<Link
						className='btn btn-success float-right'
						role='button'
						to='/user/create-education'
					>
						<i className='fas fa-plus-circle text-white mr-2'></i>Add Education
					</Link>
				</div>
				<div className='card-body'>
					<table className='table'>
						<thead>
							<tr>
								<th scope='col'>#</th>
								<th scope='col'>Field Of Study</th>
								<th scope='col'>Degree</th>
								<th scope='col'>Years</th>
								<th className='text-center' scope='col'>
									Actions
								</th>
							</tr>
						</thead>
						<tbody>
							<EducationRow education={education} />
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default EducationTable;
