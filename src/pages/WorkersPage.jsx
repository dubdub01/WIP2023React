import { useState, useEffect } from 'react';
import Axios from "axios"

const WorkersPage = (props) => {

    const [workers, setWorkers] = useState([])

    useEffect(()=>{
        Axios.get("http://127.0.0.1:8000/api/workers")
            .then(response => response.data['hydra:member'])
            .then(data => setWorkers(data))
            .catch(error => console.log(error.response))
    },[])

    return ( 
        <>
            <h1>Liste des clients</h1>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th className='text-center'>Description</th>
                        <th className='text-center'>Slug</th>
                        <th className='text-center'>Skills</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {workers.map(worker => (
                        <tr key={worker.id}>
                            <td>{worker.id}</td>
                            <td>{worker.firstname} </td>
                            <td>{worker.lastname} </td>
                            <td>{worker.age}</td>
                            <td>{worker.gender}</td>
                            <td>{worker.description}</td>
                            <td>{worker.slug}</td>
                            <td className='text-center'>
                                <span className='badge bg-primary badge-primary'>
                                    {worker.skills.length}
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

export default WorkersPage;