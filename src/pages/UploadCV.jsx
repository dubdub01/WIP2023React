import React, { useState } from 'react';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL, WORKERS_API } from '../config';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';


const UploadCV = () => {
    const { id } = useParams();
    const navigate = useNavigate();
  const [cv, setCv] = useState(null);
  const { t, i18n } = useTranslation();


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setCv(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("cv", cv);

      await Axios.post(`${WORKERS_API}/${id}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("CV ajouté avec succès !");
      navigate(`/workers/${id}`);
    } catch (error) {
      console.error("Erreur lors de l'ajout du CV :", error);
      toast.error("Une erreur s'est produite lors de l'ajout du CV.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4 text-white">{t("upload.titre")}
</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-6">
          <label htmlFor="cv" className="block text-gray-700 mb-2">
          {t("upload.cvLabel")}
          </label>
          <input
            type="file"
            id="cv"
            name="cv"
            onChange={handleFileChange}
            accept=".pdf"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {t("upload.cvAdd")}
          </button>
          <button
            type="button"
            className="text-gray-500 font-bold hover:text-gray-700"
            onClick={() => navigate(`/worker/${id}`)}
          >
            {t("upload.annuler")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadCV;
