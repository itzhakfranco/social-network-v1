import React from "react";
import Form from "../../common/form";
import Joi from "joi-browser";
import { toast } from "react-toastify";

import PreLoader from "../../../utils/pre-loader";
import { connect } from "react-redux";
import {
	addEducation,
	updateEducation,
	fetchEducationById,
} from "../../../store/profile/profileActions";

class EducationForm extends Form {
	state = {
		data: {
			school: "",
			degree: "",
			fieldofstudy: "",
			from: "",
			to: "",
			current: false,
			description: "",
		},

		errors: {},
	};

	async componentDidMount() {
		const { match, fetchEducationById } = this.props;
		if (match.params.id) {
			const education = await fetchEducationById(match.params.id);
			this.setState({ data: this.mapToView(education) });
		}
	}

	mapToView(education) {
		return {
			school: education.school,
			degree: education.degree,
			fieldofstudy: education.fieldofstudy,
			current: education.current,
			from: education.from.slice(0, education.from.indexOf("T")),
			to: education.to ? education.to.slice(0, education.to.indexOf("T")) : "",
			current: education.current,
		};
	}

	schema = {
		school: Joi.string().min(2).max(30).required().label("School"),
		degree: Joi.string().min(2).max(255).required().label("Degree"),
		fieldofstudy: Joi.string().min(2).max(50).label("Field Of Study"),
		from: Joi.string().required().label("From"),
		to: Joi.any().label("To"),
		current: Joi.bool().label("Current"),
		description: Joi.string().min(2).max(500).label("Description"),
	};

	toggleCurrentBtn = () => {
		this.setState({
			data: { ...this.state.data, current: !this.state.data.current },
		});
	};

	doSubmit = () => {
		const { data } = this.state;
		const { addEducation, updateEducation, match, history } = this.props;

		if (!match.params.id) {
			addEducation(data);
			history.replace("/user/dashboard");
			toast.success("Education was added successfully");
		} else {
			updateEducation(match.params.id, data);
			history.replace("/user/dashboard");
			toast.success("Education was Updated successfully");
		}
	};
	render() {
		this.props.loading && <PreLoader />;
		return (
			<>
				<form
					onSubmit={this.handleSubmit}
					action=''
					method='POST'
					className='mt-4'
					autoComplete='off'
				>
					<div className='form-row'>
						<div className='col-md-9 m-auto'>
							<div className='row'>
								<div className=' col-md-6 '>
									{this.renderInput(
										"school",
										"School or Bootcamp",
										"text",
										"School or Bootcamp",
										true,
										"far fa-building"
									)}
								</div>
								<div className='col-md-6'>
									{this.renderInput(
										"degree",
										"Degree Of Certified",
										"text",
										"Degree Of Certified",
										true
									)}
								</div>
							</div>
							<div className='row'>
								<div className='form-group col-lg-12'>
									{this.renderInput(
										"fieldofstudy",
										"Fields Of Study",
										"text",
										"Fields Of Study",
										true
									)}{" "}
								</div>
							</div>
							<div className='row'>
								<div className='form-group col-lg-12'>
									{this.renderInput("from", "From", "date", "", true)}
								</div>
							</div>
							<div className='row'>
								<div className='form-group col-lg-12'>
									<button
										onClick={this.toggleCurrentBtn}
										type='button'
										className='btn btn-secondary'
										data-toggle='button'
									>
										Still Learning
									</button>
								</div>
							</div>
							<div className='row'>
								<div className='form-group col-lg-12'>
									{this.renderDateInput(
										"to",
										"To Date",
										Boolean(this.state.data.current)
									)}
								</div>
							</div>
							<div className='row'>
								<div className='form-group col-lg-12'>
									{this.renderTextArea(
										"description",
										"description",
										"Bootcamp Description"
									)}
								</div>
							</div>

							<div className='row'>
								<div className='col-lg-12'>
									{this.props.match.params.id ? (
										<>
											<input
												type='submit'
												className='btn btn-primary'
												value='Update Education'
											/>
										</>
									) : (
										<>{this.renderButton("Add Education")}</>
									)}
									{this.renderLinkButton(
										"Cancel",
										"/user/dashboard",
										"btn btn-dark ml-4"
									)}
								</div>
							</div>
						</div>
					</div>
				</form>
			</>
		);
	}
}

const mapStateToProps = (state) => ({
	loading: state.profile.loading,
});
export default connect(mapStateToProps, {
	addEducation,
	fetchEducationById,
	updateEducation,
})(EducationForm);
