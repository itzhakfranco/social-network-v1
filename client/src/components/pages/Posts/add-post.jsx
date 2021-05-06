import React from "react";
import { connect } from "react-redux";
import Joi from "joi-browser";
import { toast } from "react-toastify";

import PageHeader from "../../common/page-header";
import Form from "../../common/form";
import { addPost } from "../../../store/posts/postsActions";

class AddPost extends Form {
	state = {
		data: {},
		errors: {},
	};

	handleSubmit = async (e) => {
		e.preventDefault();
		const { history, addPost } = this.props;
		const { text } = this.state.data;
		const payload = { text };
		addPost(payload);
		toast.success("You post was successfully posted");
		history.push("/posts");
	};

	onChange = (e) => {
		this.setState({
			data: { ...this.state.data, [e.target.name]: e.target.value },
		});
	};
	schema = {
		text: Joi.string().min(6).max(255).label("Post"),
	};
	render() {
		return (
			<div className='container'>
				<div className='row'>
					<div className='col-md-9 m-auto'>
						<PageHeader
							title='Add Post Page'
							desc='Here you can share with everyone your thought'
						/>
					</div>
				</div>
				<div className='row'>
					<div className='col-md-9 m-auto'>
						<div className='card gedf-card mt-5'>
							<div className='card-header'>
								<ul
									className='nav nav-tabs card-header-tabs'
									id='myTab'
									role='tablist'
								>
									<li className='nav-item'>
										<a
											className='nav-link active'
											id='posts-tab'
											data-toggle='tab'
											href='#posts'
											role='tab'
										>
											Add Post
										</a>
									</li>
								</ul>
							</div>

							<div className='card-body'>
								<div className='tab-content' id='myTabContent'>
									<div
										className='tab-pane fade show active'
										id='posts'
										role='tabpanel'
										aria-labelledby='posts-tab'
									>
										<form className='form-group' onSubmit={this.handleSubmit}>
											<label className='sr-only' htmlFor='Post'>
												post
											</label>

											{this.renderTextArea(
												"text",
												"Post",
												"What are you thinking?"
											)}

											<div className='btn-toolbar justify-content-between'>
												<div className='btn-group mt-2'>
													{this.renderButton("Publish")}
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(null, { addPost })(AddPost);
