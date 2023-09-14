import { useState, useEffect } from 'react';
import Axios from "axios"

const CompaniesPage = (props) => {

    const [companies, setCompanies] = useState([])

    useEffect(()=>{
        Axios.get("http://127.0.0.1:8000/api/companies")
            .then(response => response.data['hydra:member'])
            .then(data => setCompanies(data))
            .catch(error => console.log(error.response))
    },[])

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
        </>
     );
}

export default CompaniesPage;