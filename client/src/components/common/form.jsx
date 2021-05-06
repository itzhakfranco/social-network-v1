import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Input from "./input";
import InputGroupButton from "./input-group-button";
import InputGroupInput from "./input-group-input";
import TextArea from "./text-area";
import WrappedInput from "./wrapped-input";
import Joi from "joi-browser";
import Select from "./select";

class Form extends Component {
	state = {
		data: {},
		errors: {},
	};

	validate() {
		const options = { abortEarly: false };
		const { error } = Joi.validate(this.state.data, this.schema, options);
		if (!error) return null;
		const errors = {};
		for (let item of error.details) errors[item.path[0]] = item.message;
		return errors;
	}

	handleSubmit = (event) => {
		event.preventDefault();
		const errors = this.validate();
		this.setState({ errors: errors || {} });
		if (errors) return;
		this.doSubmit();
	};

	validateProperty({ name, value }) {
		const obj = { [name]: value };
		const schema = { [name]: this.schema[name] };
		const { error } = Joi.validate(obj, schema);
		return error ? error.details[0].message : null;
	}

	handleChange = ({ currentTarget: input }) => {
		const errors = { ...this.state.errors };
		const errorMessage = this.validateProperty(input);
		if (errorMessage) errors[input.name] = errorMessage;
		else delete errors[input.name];
		const data = { ...this.state.data };
		data[input.name] = input.value;
		this.setState({ data, errors });
	};

	renderAddCommentInputs(name) {
		const { data, errors } = this.state;

		return (
			<div className='input-group'>
				<InputGroupInput
					onChange={this.handleChange}
					name='comment'
					value={data[name]}
					error={errors[name]}
				/>
				<InputGroupButton error={errors[name]} disabled={this.validate()} />
			</div>
		);
	}

	renderExperienceForm() {
		return (
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
									<Fragment>
										<input
											type='submit'
											className='btn btn-primary'
											value='Update Experience'
										/>
									</Fragment>
								) : (
									<Fragment>{this.renderButton("Add Experience")}</Fragment>
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
		);
	}

	renderEducationForm() {
		return (
			<div className='container'>
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
										<Fragment>
											<input
												type='submit'
												className='btn btn-primary'
												value='Update Education'
											/>
										</Fragment>
									) : (
										<Fragment>{this.renderButton("Add Education")}</Fragment>
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
			</div>
		);
	}
	renderInput(name, label, type = "text", placeholder, wrapped = false, icon) {
		const { data, errors } = this.state;

		return !wrapped ? (
			<Input
				onChange={this.handleChange}
				type={type}
				name={name}
				label={label}
				placeholder={placeholder}
				value={data[name]}
				error={errors[name]}
			/>
		) : (
			<WrappedInput
				onChange={this.handleChange}
				type={type}
				name={name}
				label={label}
				placeholder={placeholder}
				value={data[name]}
				error={errors[name]}
				icon={icon}
			/>
		);
	}
	renderDateInput(name, label, disabled) {
		const { data, errors } = this.state;
		return disabled ? (
			<Input
				onChange={this.handleChange}
				type='date'
				name={name}
				label={label}
				value={data[name]}
				error={errors[name]}
				disabled
			/>
		) : (
			<Input
				onChange={this.handleChange}
				type='date'
				name={name}
				label={label}
				value={data[name]}
				error={errors[name]}
			/>
		);
	}
	renderSelect(options, name, label) {
		const { data, errors } = this.state;

		return (
			<Select
				onChange={this.handleChange}
				options={options}
				name={name}
				label={label}
				value={data[name]}
				error={errors[name]}
			/>
		);
	}

	renderTextArea(name, label, placeholder) {
		const { data, errors } = this.state;

		return (
			<TextArea
				onChange={this.handleChange}
				placeholder={placeholder}
				name={name}
				label={label}
				value={data[name]}
				error={errors[name]}
			/>
		);
	}
	renderButton(label) {
		return (
			<button
				disabled={this.validate()}
				type='submit'
				className='btn btn-primary'
			>
				{label}
			</button>
		);
	}
	renderLinkButton(label, to, className) {
		return (
			<Link to={to} type='submit' className={className}>
				{label}
			</Link>
		);
	}
}

export default Form;
