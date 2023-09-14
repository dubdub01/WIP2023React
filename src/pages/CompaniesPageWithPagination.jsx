import { useState, useEffect } from 'react';
import Axios from "axios"
import Pagination from '../components/Pagination';

const CompaniesPageWithPagination = (props) => {

    const [companies, setCompanies] = useState([])

    // pour la pagination 
    const [currentPage, setCurrentPage] = useState(1)
    const [totalItems, settotalItems] = useState(0)
    // définir le nombre d'items par page 
    const itemsPerPage = 10

    const handlePageChange = (page) => {
        setCompanies([])
        setCurrentPage(page)
    }

    useEffect(()=>{
        Axios.get(`http://127.0.0.1:8000/api/companies?pagination=true&count=${itemsPerPage}&page=${currentPage}`)
            .then(response => {
                setCompanies(response.data['hydra:member'])
                settotalItems(response.data['hydra:totalItems'])
            }) 
            .catch(error => console.log(error.response))
    },[currentPage])

    return ( 
        <>
            <h1>Liste des clients</h1>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Company name</th>
                        <th>Email</th>
                        <th>Cover</th>
                        <th className='text-center'>Description</th>
                        <th className='text-center'>Slug</th>
                        <th className='text-center'>Sector</th>
                        <th className='text-center'>Province</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/* Et logique (&&) expr1 && expr2 renvoire expr1 si cette expression peut être conrtie en false, sinon renvoie expre2 */}

                    {companies.length === 0 && (
                        <tr>
                            <td colSpan="8" className='text-center'>Chargement...</td>
                        </tr>
                    )}

                    {companies.map(company => (
                        <tr key={company.id}>
                        <td>{company.id}</td>
                        <td>{company.name} </td>
                        <td>{company.eMail}</td>
                        <td>{company.cover}</td>
                        <td>{company.description}</td>
                        <td>{company.slug}</td>
                        <td className='text-center'>
                            <span className='badge bg-primary badge-primary'>
                                {company.sector.length}
                            </span>
                        </td>
                        <td className='text-center'>
                            <span className='badge bg-primary badge-primary'>
                                {company.provinceName.length}
                            </span>
                        </td>
                        <td>
                            <button className='btn btn-sm btn-danger'>Supprimer</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <Pagination 
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                length={totalItems}
                onPageChanged={handlePageChange}
            />
        </>
     );
}

export default CompaniesPageWithPagination;