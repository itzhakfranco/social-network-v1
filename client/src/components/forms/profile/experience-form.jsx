import React from "react";
import Form from "../../common/form";
import Joi from "joi-browser";
import { toast } from "react-toastify";

import PreLoader from "../../../utils/pre-loader";
import { connect } from "react-redux";
import {
	addExperience,
	updateExperience,
	fetchExperienceById,
} from "../../../store/profile/profileActions";

class ExperienceForm extends Form {
	state = {
		data: {
			company: "",
			title: "",
			location: "",
			from: "",
			to: "",
			current: false,
			description: "",
		},

		errors: {},
	};

	async componentDidMount() {
		const { match, fetchExperienceById } = this.props;
		if (match.params.id) {
			const experience = await fetchExperienceById(match.params.id);
			this.setState({ data: this.mapToView(experience) });
		}
	}

	mapToView(experience) {
		return {
			title: experience.title,
			company: experience.company,
			location: experience.location,
			current: experience.current,
			from: experience.from.slice(0, experience.from.indexOf("T")),
			to: experience.to
				? experience.to.slice(0, experience.to.indexOf("T"))
				: "",
			description: experience.description,
		};
	}

	schema = {
		title: Joi.string().required().min(2).max(30).label("Title"),
		company: Joi.string().required().min(5).max(255).label("Company"),
		location: Joi.string().min(5).max(50).label("Location"),
		from: Joi.date().required().label("From"),
		to: Joi.any().label("To"),
		current: Joi.bool().label("Current"),
		description: Joi.string().min(2).max(500).label("Job description"),
	};

	toggleCurrentBtn = () => {
		this.setState({
			data: { ...this.state.data, current: !this.state.data.current },
		});
	};

	doSubmit = () => {
		const { data } = this.state;
		const { addExperience, updateExperience, match, history } = this.props;

		if (!match.params.id) {
			addExperience(data);
			history.replace("/user/dashboard");
			toast.success("Experience was added successfully");
		} else {
			updateExperience(match.params.id, data);
			history.replace("/user/dashboard");
			toast.success("Experience was Updated successfully");
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
										"title",
										"Job Title",
										"text",
										"Job Title",
										true
									)}
								</div>
								<div className='col-md-6'>
									{this.renderInput(
										"company",
										"Company",
										"text",
										"Comapny",
										true
									)}
								</div>
							</div>
							<div className='row'>
								<div className='form-group col-lg-12'>
									{this.renderInput("from", "From", "date", "", false)}
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
										Current Job
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
									{this.renderInput("location", "Location", "text", "", true)}
								</div>
							</div>
							<div className='row'>
								<div className='form-group col-lg-12'>
									{this.renderTextArea(
										"description",
										"description",
										"Job Description"
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
												value='Update Experience'
											/>
										</>
									) : (
										<>{this.renderButton("Add Experience")}</>
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
	addExperience,
	fetchExperienceById,
	updateExperience,
})(ExperienceForm);
