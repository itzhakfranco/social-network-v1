import React, { Component } from "react";
import { Link } from "react-router-dom";

import Moment from "react-moment";
import moment from "moment";

import { connect } from "react-redux";

import { deleteExperience } from "../../../store/profile/profileActions";

import { toast } from "react-toastify";
import { swalConfirmDelete } from "../../../config.json";
import Swal from "sweetalert2";

class ExperienceRow extends Component {
	handleDelete = async (experienceId) => {
		const result = await Swal.fire(swalConfirmDelete);
		if (result.value) {
			toast("Experience was deleted successfully");
			this.props.deleteExperience(experienceId);
		}
	};

	render() {
		const { experience } = this.props;

		return experience.map((exp, index) => (
			<tr key={index}>
				<th scope='row'>{++index}</th>
				<td>{exp.company}</td>
				<td className='hide-sm'>{exp.title}</td>
				<td>
					<Moment format='DD/MM/YYYY'>{moment.utc(exp.from)}</Moment>-
					{exp.to === null ? (
						" Now"
					) : (
						<Moment format='DD/MM/YYYY'>{moment.utc(exp.to)}</Moment>
					)}
				</td>
				<td className='text-center'>
					<Link
						className='btn btn-dark mr-3'
						to={`/user/experience/edit/${exp._id}`}
					>
						<i className='fas fa-user-edit'></i> Edit
					</Link>
					<button
						onClick={() => {
							this.handleDelete(exp._id);
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

export default connect(null, { deleteExperience })(ExperienceRow);
