import { useState } from "react";
import Field from "../components/forms/Field";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { toast } from "react-toastify";
import { USER_API } from "../config";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "../config";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [user, setUser] = useState({
    username: "",
    eMail: "",
    password: "",
    image: null,
  });

  const [errors, setErrors] = useState({
    username: "",
    eMail: "",
    password: "",
    image: "",
  });

  const handleChange = (event) => {
    const { name, value, type } = event.currentTarget;
    if (type === "file") {
      setUser({ ...user, [name]: event.currentTarget.files[0] });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiErrors = {};

    try {
      const formData = new FormData();
      formData.append("username", user.username);
      formData.append("eMail", user.eMail);
      formData.append("password", user.password);
      formData.append("image", user.image);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      await Axios({
        method: "post",
        url: `${BASE_URL}api/users/upload`,
        data: formData,
        headers: {
          "Content-type":
            "multipart/form-data; charset=utf-8; boundary=" +
            Math.random().toString().substring(2),
        },
      }).then((response) => {
      });
      setErrors({});
      toast.success("Vous êtes inscrit, vous pouvez vous connecter");
      navigate("/login", { replace: true });
    } catch ({ response }) {
      const { violations } = response.data;
      if (violations) {
        const apiErrors = {};
        violations.forEach(({ propertyPath, message }) => {
          apiErrors[propertyPath] = message;
        });
        setErrors(apiErrors);
      }
      toast.error("Des erreurs dans votre formulaire");

    }
  };

  const handleFileChange = (event) => {
    const name = event.currentTarget.name;
    const myFile = event.currentTarget.files[0];
    setUser({ ...user, [name]: myFile });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-white text-3xl font-semibold mb-4">{t("creation.title")}</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
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
          <input
            type="file"
            name="image"
            id="image"
            className="form-control"
            onChange={handleFileChange}
          />
          {errors.image && <p className="text-danger">{errors.image}</p>}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            {t("creation.confirmation")}
          </button>
          <Link to="/login"                    
            className="text-gray-500 font-bold hover:text-gray-700">
            {t("creation.annulerInscription")}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
