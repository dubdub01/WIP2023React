const Pagination = (props) => {
    const pagesCount = Math.ceil(props.length / props.itemsPerPage);
    const pages = [];
  
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
  
    return (
      <div className="flex items-center justify-center mt-4">
        <ul className="flex space-x-2">
          <li
            className={`${
              props.currentPage === 1 ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <button
              onClick={() => props.onPageChanged(props.currentPage - 1)}
              className="px-2 py-1 rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-100"
            >
              &laquo;
            </button>
          </li>
          {pages.map((page) => (
            <li
              key={page}
              className={`${
                props.currentPage === page
                  ? "opacity-50 pointer-events-none"
                  : ""
              }`}
            >
              <button
                onClick={() => props.onPageChanged(page)}
                className={`px-2 py-1 rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 ${
                  props.currentPage === page ? "bg-blue-500 " : ""
                }`}
              >
                {page}
              </button>
            </li>
          ))}
          <li
            className={`${
              props.currentPage === pagesCount
                ? "opacity-50 pointer-events-none"
                : ""
            }`}
          >
            <button
              onClick={() => props.onPageChanged(props.currentPage + 1)}
              className="px-2 py-1 rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-100"
            >
              &raquo;
            </button>
          </li>
        </ul>
      </div>
    );
  };
  
  Pagination.getData = (items, currentPage, itemsPerPage) => {
    const start = currentPage * itemsPerPage - itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  };
  
  export default Pagination;
  