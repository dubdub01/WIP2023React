import React, { useState } from "react";
import i18n from "i18next";

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("fr"); // Langue sélectionnée
  const [showDropdown, setShowDropdown] = useState(false);

  // Fonction pour changer la langue
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang); // Utilisez i18n.changeLanguage(lang) pour changer la langue
    setShowDropdown(false); // Fermez le menu déroulant après avoir sélectionné une langue
    setSelectedLanguage(lang);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none"
        >
          {selectedLanguage === "en" ? "English" : selectedLanguage === "fr" ? "Français" : "Nederlands"}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
               d="M7 10l5 5 5-5"
            />
          </svg>
        </button>
      </div>
      {showDropdown && (
        <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              onClick={() => changeLanguage("en")}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              English
            </button>
            <button
              onClick={() => changeLanguage("fr")}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Français
            </button>
            <button
              onClick={() => changeLanguage("nl")}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Neederlands
            </button>
            {/* Ajoutez des boutons pour d'autres langues si nécessaire */}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
