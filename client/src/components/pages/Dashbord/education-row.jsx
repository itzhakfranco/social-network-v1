import React, { Component } from "react";
import { Link } from "react-router-dom";

import Moment from "react-moment";
import moment from "moment";

import { connect } from "react-redux";

import { deleteEducation } from "../../../store/profile/profileActions";

import { toast } from "react-toastify";
import { swalConfirmDelete } from "../../../config.json";
import Swal from "sweetalert2";

class EducationRow extends Component {
	handleDelete = async (educationId) => {
		const result = await Swal.fire(swalConfirmDelete);
		if (result.value) {
			toast("Experience was deleted successfully");
			this.props.deleteEducation(educationId);
		}
	};

	render() {
		const { education } = this.props;

		return education.map((edu, index) => (
			<tr key={index}>
				<th scope='row'>{++index}</th>
				<td>{edu.fieldofstudy}</td>
				<td className='hide-sm'>{edu.degree}</td>
				<td>
					<Moment format='DD/MM/YYYY'>{moment.utc(edu.from)}</Moment>-
					{edu.to === null ? (
						" Now"
					) : (
						<Moment format='DD/MM/YYYY'>{moment.utc(edu.to)}</Moment>
					)}
				</td>
				<td className='text-center'>
					<Link
						className='btn btn-dark mr-3'
						to={`/user/education/edit/${edu._id}`}
					>
						<i className='fas fa-user-edit'></i> Edit
					</Link>
					<button
						onClick={() => {
							this.handleDelete(edu._id);
						}}
						className='btn btn-danger'
					>
						<i className='fas fa-trash'></i> Delete
					</button>
				</td>
			</tr>
		));
	}
}

export default connect(null, { deleteEducation })(EducationRow);
