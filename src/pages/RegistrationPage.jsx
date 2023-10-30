import { useState } from "react"
import Field from "../components/forms/Field"
import { Link, useNavigate } from 'react-router-dom'
import Axios from 'axios'
import { toast } from "react-toastify";
import { USER_API } from "../config";
import { useTranslation } from "react-i18next";

const RegisterPage = () => {

    const navigate = useNavigate()
    const { t, i18n } = useTranslation();

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
            }

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
                const apiErrors = {}
                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message
                })
                setErrors(apiErrors)
            }
            toast.error("Des erreurs dans votre formulaire")
            


            console.log(response.data)
            
            
        }
    }

    const handleFileChange = (event) => {
      const name = event.currentTarget.name 
      const myFile = event.currentTarget.files[0]
      console.log(myFile)
      setUser({...user, [name]:myFile})
  }

    return (
        <>
            <h1>{t("creation.title")}</h1>
            <form onSubmit={handleSubmit}>
                <Field 
                    name="username"
                    label={t("creation.username")}
                    placeholder={t("creation.votreUsername")}
                    error={errors.username}
                    value={user.username}
                    onChange={handleChange}
                />
                <Field 
                    type="eMail"
                    name="eMail"
                    label={t("creation.email")}
                    placeholder={t("creation.votreEmail")}
                    error={errors.eMail}
                    value={user.eMail}
                    onChange={handleChange}
                />
                <Field 
                    type="password"
                    name="password"
                    label={t("creation.password")}
                    placeholder={t("creation.votrePassword")}
                    error={errors.password}
                    value={user.password}
                    onChange={handleChange}
                />
                <div className="my-3">
                        <label htmlFor="image">{t("creation.image")} </label>
                        <input type="file" name="image" id="image" className='form-control' onChange={handleFileChange} />
                        {errors.image && <p className="text-danger">{errors.image}</p>}
                    </div>
                <div className="my-3">
                    <button type="submit" className="btn btn-success">{t("creation.confirmation")}</button>
                    <Link to="/login" className="btn btn-secondary">{t("creation.annulerInscription")}</Link>
                </div>
            </form>
        </>
    )
}

export default RegisterPage