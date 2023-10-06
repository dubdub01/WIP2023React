import { useState } from "react"
import Field from "../components/forms/Field"
import { Link, useNavigate } from 'react-router-dom'
import Axios from 'axios'
import { toast } from "react-toastify";
import { USER_API } from "../config";

const RegisterPage = () => {

    const navigate = useNavigate()

    const [user, setUser] = useState({
        username: "",
        eMail: "",
        password: "",
        image: null,
    })

    const [errors, setErrors] = useState({
        username: "",
        eMail: "",
        password: "",
        image: "",
    })

    const handleChange = event => {
        const {name,value,type} = event.currentTarget
        if(type === "file"){
            setUser({...user, [name]:event.currentTarget.files[0]})
        }else{
            setUser({...user, [name]:value})
        }
    }

    const handleSubmit = async event => {
        event.preventDefault()
        const apiErrors = {}
        try{
            const formData = new FormData()
            formData.append("username", user.username)
            formData.append("eMail", user.eMail)
            formData.append("password", user.password)
            formData.append("image", user.image)
            const config = {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            };

            await Axios({
              method: "post",
              url: "http://127.0.0.1:8000/api/users/upload",
              data: formData,
              headers: { "Content-type":"multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substring(2)}
            }).then(response => {
            console.log(response)
          })            
            setErrors({})
            toast.success("Vous êtes inscrit, vous pouvez vous connecter")
            navigate("/login", {replace: true})
        }catch({response})
        {
            const {violations} = response.data
            if(violations){
                violations.forEach(({propertyPath, message})=>{
                    apiErrors[propertyPath] = message
                })
                setErrors(apiErrors)
            }
            toast.error("Une erreur est survenue")
        }
    }

    const handleFileChange = (event) => {
      const name = event.currentTarget.name 
      const myFile = event.currentTarget.files[0]
      console.log(myFile)
      setUser({...user, [name]:myFile})
      console.log(user)
  }

    return (
        <>
            <h1>Inscription</h1>
            <form onSubmit={handleSubmit}>
                <Field 
                    name="username"
                    label="username"
                    placeholder="username"
                    error={errors.username}
                    value={user.username}
                    onChange={handleChange}
                />
                <Field 
                    type="eMail"
                    name="eMail"
                    label="Adresse E-mail"
                    placeholder="Votre adresse E-mail"
                    error={errors.eMail}
                    value={user.eMail}
                    onChange={handleChange}
                />
                <Field 
                    type="password"
                    name="password"
                    label="Mot de passe"
                    placeholder="Votre mot de passe"
                    error={errors.password}
                    value={user.password}
                    onChange={handleChange}
                />
                <div className="my-3">
                        <label htmlFor="image">Image: </label>
                        <input type="file" name="image" id="image" className='form-control' onChange={handleFileChange} />
                    </div>
                <div className="my-3">
                    <button type="submit" className="btn btn-success">Confirmation</button>
                    <Link to="/login" className="btn btn-secondary">J'ai déjà un compte</Link>
                </div>
            </form>
        </>
    )
}

export default RegisterPage