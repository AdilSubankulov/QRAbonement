import Navbar from '../components/Navbar.jsx';
import ClientForm from '../components/ClientForm.jsx';
import AddClientTariff from '../components/AddClientTariff.jsx';
import '../styles/ClientFormPage.css'

function ClientFormPage() {
    return (
        <>
            <Navbar />
            <ClientForm />
        </>
    );
}

export default ClientFormPage;
