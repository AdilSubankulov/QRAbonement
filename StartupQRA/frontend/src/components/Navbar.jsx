import "../styles/Navbar.css"
import logo from '../assets/logo.svg'; 
function Navbar() {
    const handleSearch = (event) => {
        console.log('Search query:', event.target.value);
    };

    return (
        <nav className="nav-container">
            <img src={logo} className="nav-logo" />
            <div className="getUser">
                <i className="fas fa-search"></i>
                <input
                    className="nav-input"
                    type="text"
                    placeholder="Search"
                    onChange={handleSearch}
                />
            </div>
            <h1 className="nav-h1">Adminka</h1>
        </nav>
    );
}

export default Navbar;