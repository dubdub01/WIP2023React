import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HomePage = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <div className=" min-h-[calc(100vh-96px)] flex flex-col justify-center items-center">
      <div className="container mx-auto">
        <section className=" p-6">
          <h1 className="text-white text-4xl font-medium mb-4 ">
            {t("homepage.title1")}
          </h1>
          <h1 className="text-teal-400 text-7xl font-medium mb-4">
            {t("homepage.title2")}
          </h1>
          <p className="text-white text-lg max-w-5xl font-light">
            {t("homepage.presentation")}
          </p>
        </section>
        <section className="px-6">
          <p className="text-lg font-light text-white">{t("homepage.apropos.text2")}</p>
          <p className="text-lg font-light text-white">{t("homepage.apropos.text3")}</p>
        </section>
          <div className="mt-10 flex justify-center space-x-4 ">
            <Link
              to="/workers"
              className="text-teal-400 rounded-[30px] border border-teal-400 h-52 w-1/6 bg-white"
            >
              <div className="align-middle">

              {t("homepage.boutonWorkers")}
              </div>
            </Link>
            <Link
              to="/companies"
              className="text-white rounded-[30px] border border-teal-400 h-52 w-1/6 bg-teal-400"
            >
              {t("homepage.boutonCompanies")}
            </Link>
            
          </div>

        
      </div>
    </div>
  );
};

export default HomePage;
