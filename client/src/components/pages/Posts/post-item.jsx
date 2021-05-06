import React, { Fragment } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { swalConfirmDelete } from "../../../config.json";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { deletePost } from "../../../store/posts/postsActions";
//import PostFooter from "./post-footer";

const PostItem = ({ post, userId, deletePost, setPosts, posts }) => {
	const onDelete = async (e, postId) => {
		e.preventDefault();
		const result = await Swal.fire(swalConfirmDelete);
		if (result.value) {
			handlePostDelete(postId);
			deletePost(postId);
			toast("Post was deleted successfully");
		}
	};

	const handlePostDelete = (postId) => {
		const test = posts.filter((post) => post._id !== postId);
		setPosts(test);
	};

	return (
		<Fragment>
			<div className='col-lg-12 mb-5'>
				<div className='card'>
					<div className='p-2'>
						<div className='row m-0'>
							<div className=''>
								<img
									className=''
									src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
									width='50'
									height='50'
									alt='...'
								/>
							</div>
							<div className='flex-grow-1 pl-2'>
								<Link to={`/profiles/${post.user_id._id}`}>
									<h2 className='text-capitalize h5 mb-0'>
										{post.user_id.name}{" "}
									</h2>
								</Link>

								<p className='small text-secondary m-0 mt-1'>
									<i className='fa fa-clock-o'></i> Posted on{" "}
									<Moment format='DD/MM/YY'>{post.date}</Moment>
								</p>
							</div>
							{userId === post.user_id._id && (
								<div className='dropdown float-right'>
									<Link
										className='dropdown-toggle no-underline'
										to='#'
										id='dropdownMenuLink'
										data-toggle='dropdown'
									>
										<i className='fas fa-ellipsis-h'></i>
									</Link>
									<div className='dropdown-menu dropdown-menu-right'>
										<button
											className='dropdown-item delete-post-btn'
											type='button'
											onClick={(e) => {
												onDelete(e, post._id);
											}}
										>
											<i className='fas fa-eraser'></i> Delete
										</button>
									</div>
								</div>
							)}
						</div>

						<div className='mt-2'>
							<p className='my-2'>{post.text}</p>
						</div>
						{/* {<PostFooter postID={post._id} />} */}
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default connect(null, { deletePost })(PostItem);
