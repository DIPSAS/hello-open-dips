import { Link } from "react-router-dom";

const NotFound: React.FC = () => {

    return(
        <div className="notFound">
            <p>Ops! You seem to be lost.</p>
            <Link to='/'>Go back to safety here</Link>
        </div>
    );
}
export default NotFound;