const Field = ({
  name,
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  error = "",
}) => {
  return (
    <div className="mt-3">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder || label}
        name={name}
        id={name}
        className={
          "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-3 pl-2"
        }
      />
      {error && (
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-3" role="alert">
        <span class="block sm:inline">{error}</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
          
        </span>
      </div>
      )}
    </div>
  );
};

export default Field;
