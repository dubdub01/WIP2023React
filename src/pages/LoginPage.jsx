import { useState, useContext } from 'react'
import AuthAPI from '../services/AuthAPI'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'
import Field from '../components/forms/Field'
import { toast } from 'react-toastify'

const LoginPage = (props) => {
    const navigate = useNavigate()
    const { setIsAuthenticated } = useContext(AuthContext)

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })

    const [error, setError] = useState("")

    const handleChange = (event) => {
        const value = event.currentTarget.value
        const name = event.currentTarget.name

        setCredentials({ ...credentials, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await AuthAPI.authenticate(credentials)
            setError("")
            setIsAuthenticated(true)
            toast.success("Vous êtes désormais connecté")
            navigate('/', { replace: true })
        } catch (error) {
            setError("Aucun compte ne possède cette adresse e-mail ou les informations ne correspondent pas")
        }
    }

    return (
        <div className="bg-gradient-to-r from-blue-950 to-teal-900 h-screen flex items-center justify-center">
            <div className="bg-white p-8 shadow-md rounded-md w-full sm:w-96">
                <h1 className="text-2xl font-semibold mb-4">Connexion</h1>
                <form onSubmit={handleSubmit}>
                    <Field
                        label="Adresse Email"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        placeholder="Adresse E-mail de connexion"
                        error={error}
                    />
                    <Field
                        label="Mot de passe"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        placeholder="Mot de passe"
                        error={error}
                        type="password"
                    />
                    <div className="mt-4">
                        <button className="bg-gray-600 hover:bg-gray-300 text-white py-2 px-4 rounded-md w-full">Connexion</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;
