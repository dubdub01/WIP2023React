import { COMPANIES_API } from "../config";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";
import { toast } from "react-toastify";


const UploadImage = () => {
    const [cover, setCover] = useState(null);
    const {id} = useParams();
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setCover(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append("cover", cover);
      
            await Axios.post(`${COMPANIES_API}/${id}/upload`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
      
            toast.success("CV ajouté avec succès !");
            navigate(`/companies/${id}`);
          } catch (error) {
            console.error("Erreur lors de l'ajout du CV :", error);
            toast.error("Une erreur s'est produite lors de l'ajout du CV.");
          }
        };

        return (
            <div className="container mx-auto p-4">
              <h1 className="text-3xl font-semibold mb-4">Ajouter une image</h1>
              <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              >
                <div className="my-3">
                        <label htmlFor="image">image de l'entreprise</label>
                        <input type="file" name="cover" id="cover" className='form-control' onChange={handleFileChange} />
                </div>
        
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Ajouter une image
                  </button>
                  <button
                    type="button"
                    className="text-gray-500 font-bold hover:text-gray-700"
                    onClick={() => navigate(`/worker/${id}`)}
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          );


}

export default UploadImage;