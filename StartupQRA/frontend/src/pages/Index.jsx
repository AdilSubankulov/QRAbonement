import Navbar from '../components/Navbar.jsx';
import Client from '../components/Client.jsx';
import AddClientTariff from '../components/AddClientTariff.jsx';
import '../styles/Index.css'

function Index() {
    return (
        <>
            <Navbar />
            <div className='components-container'>
                <Client />
                <AddClientTariff />
            </div>
        </>
    );
}

export default Index;
