// css
import '../assets/css/notfound.css'
import { Link } from "react-router-dom";
const NotFound = () => {
    return(
        <div className='not_found'>
            <h1>404</h1>
            <h2>Page not found</h2>
            <h4>We could not find the above page on our servers.</h4>
            <h4>Alternatively, you can visit the <Link className='not_found_link' to='/'>Main Page</Link> or read <Link className='not_found_link' to='https://en.wikipedia.org/wiki/HTTP_404'>more information</Link> about this type of error.</h4>

        </div>
    );
}
export default NotFound;