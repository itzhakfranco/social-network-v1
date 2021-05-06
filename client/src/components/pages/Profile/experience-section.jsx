import React from "react";
import Moment from "react-moment";
import moment from "moment";

const ExperienceSection = ({ experience }) => {
	return (
		experience?.length > 0 && (
			<>
				<div className='row'>
					<div class='col-lg-12'>
						<h4 class='font-weight-bold text-dark my-4'>Experiences</h4>
					</div>
				</div>
				<div className='row'>
					<div className='col-lg-12'>
						{experience.map((exp) => (
							<div key={exp._id} className='card'>
								<div className='card-header'>
									<Moment format='YYYY/MM/DD'>{moment.utc(exp.from)}</Moment>-
									{!exp.to ? (
										" Now"
									) : (
										<Moment format='YYYY/MM/DD'>{moment.utc(exp.to)}</Moment>
									)}
								</div>
								<div className='card-body'>
									<h4>Worked {exp.company}</h4>
									<span>
										<strong>Description</strong>
									</span>
									<p>{exp.description}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</>
		)
	);
};

export default ExperienceSection;
