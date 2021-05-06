import { Link } from "react-router-dom";

const LinkButton = ({ children, ...rest }) => {
	return (
		<Link {...rest} className='btn btn-info m-4'>
			{children}
		</Link>
	);
};

export default LinkButton;
