import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HomePage = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <div className=" min-h-[calc(100vh-96px)] flex flex-col justify-center items-center max-h-full">
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
          <p className="text-lg font-light text-white">
            {t("homepage.apropos.text2")}
          </p>
          <p className="text-lg font-light text-white">
            {t("homepage.apropos.text3")}
          </p>
        </section>
        <div className="flex mt-10 justify-center items-center flex-col md:flex-row">
  <Link
    to="/workers"
    className="text-teal-400 rounded-[30px] border border-teal-400 h-52 w-64 bg-white flex items-center justify-center mb-4 md:mb-0 mx-11"
  >
    {t("homepage.boutonWorkers")}
  </Link>
  <Link
    to="/companies"
    className="text-white rounded-[30px] border border-teal-400 h-52 w-64 bg-teal-400 flex items-center justify-center mx-11"
  >
    {t("homepage.boutonCompanies")}
  </Link>
</div>
      </div>
    </div>
  );
};

export default HomePage;
