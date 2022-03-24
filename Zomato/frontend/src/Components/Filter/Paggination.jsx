import React from "react";

function Paggination({ postsPerPage, totalPost, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPost / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li className="page-item " key={number}>
              <a
                className="page-link"
                onClick={() => paginate(number)}
                href="#s"
              >
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Paggination;
