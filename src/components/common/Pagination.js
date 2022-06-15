import React, { useEffect, useState } from "react";

function Pagination({ data, page, count, pages, setPage, loading }) {
  return (
    <div>
      {!loading && count > 0 && (
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-8">
            <nav className="">
              <ul className="pagination">
                <li
                  className={
                    page == 1
                      ? `paginate_button page-item previous disabled`
                      : `paginate_button page-item previous`
                  }
                >
                  <a
                    className="page-link"
                    tabIndex={-1}
                    style={{ cursor: "pointer" }}
                    onClick={() => setPage(page - 1)}
                  >
                    Previous
                  </a>
                </li>
                {/* {pages &&
            pagesArray.map((item, index) => {
              return (
                <li
                  className={
                    current_page == index + 1
                      ? `paginate_button page-item active`
                      : `paginate_button page-item`
                  }
                  key={index}
                >
                  <a
                    className="page-link"
                    onClick={() => changePage(index + 1)}
                    style={{ cursor: "pointer" }}
                  >
                    {index + 1}
                  </a>
                </li>
              );
            })} */}
                <li className="paginate_button page-item">
                  <a className="page-link">{page}</a>
                </li>

                <li
                  className={
                    page == pages
                      ? `paginate_button page-item next disabled`
                      : `paginate_button page-item next`
                  }
                >
                  <a
                    className="page-link"
                    onClick={() => setPage(page + 1)}
                    style={{ cursor: "pointer" }}
                  >
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pagination;