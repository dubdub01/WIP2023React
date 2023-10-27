import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

  const HomePage = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <div className="bg-gradient-to-r from-blue-950 to-teal-900 text-white min-h-screen flex flex-col justify-center items-center">
        <div className="container mx-auto">
      <section className="text-center p-6">
        <h1 className="text-4xl font-bold mb-4">
          {t("homepage.title")}
        </h1>
        <p className="text-lg">
          {t("homepage.presentation")}
        </p>
        <div className="mt-8 flex justify-center space-x-4">
  <Link
    to="/companies"
    className="bg-gray-600 text-gray-300 hover:bg-gray-700 rounded-md px-3 py-2 text-sm font-medium"
  >
    {t("homepage.boutonCompanies")}
  </Link>
  <Link
    to="/workers"
    className="bg-gray-600 text-gray-300 hover:bg-gray-700 rounded-md px-3 py-2 text-sm font-medium"
  >
    {t("homepage.boutonWorkers")}
  </Link>
</div>

      </section>

      <section className="text-center py-12">
        <h2 className="text-3xl font-bold mb-4">{t("homepage.apropos.text1")}</h2>
        <p className="text-lg">
        {t("homepage.apropos.text2")}
        </p>
        <p className="text-lg">
        {t("homepage.apropos.text3")}
        </p>
      </section>
    </div>
    </div>
  );
}

export default HomePage;
