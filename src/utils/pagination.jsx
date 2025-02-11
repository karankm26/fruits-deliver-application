import React from "react";
// import "./styles.css";

const Pagination = (props) => {
  const handlePagination = (current) => {
    props.pagination(current);
  };

  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <button
              className={`page-link ${
                props.current === 1 ? "disabled" : props.current > 1 ? "" : ""
              }`}
              onClick={() => handlePagination(props.current - 1)}
            >
              Previous
            </button>
          </li>
          {props.total < 7 ? (
            <>
              {Array.apply(0, Array(props.total)).map((arr, i) => (
                <div key={i}>
                  <li
                    // key={i}
                    className={`page-item ${
                      props.current === i + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePagination(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                </div>
              ))}
            </>
          ) : props.current % 5 >= 0 &&
            props.current > 4 &&
            props.current + 2 < props.total ? (
            <>
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => handlePagination(1)}
                >
                  1
                </button>
              </li>
              <li className="page-item">
                <a className="page-link disabled">...</a>
              </li>
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => handlePagination(props.current - 1)}
                >
                  {props.current - 1}
                </button>
              </li>
              <li className="page-item active">
                <button
                  className="page-link"
                  onClick={() => handlePagination(props.current)}
                >
                  {props.current}
                </button>
              </li>
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => handlePagination(props.current + 1)}
                >
                  {props.current + 1}
                </button>
              </li>
              <li className="page-item">
                <a className="page-link disabled">...</a>
              </li>
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => handlePagination(props.total)}
                >
                  {props.total}
                </button>
              </li>
            </>
          ) : props.current % 5 >= 0 &&
            props.current > 4 &&
            props.current + 2 >= props.total ? (
            <>
              <li className="page-item">
                <a className="page-link" onClick={() => handlePagination(1)}>
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link disabled">...</a>
              </li>
              <li
                className={`page-item ${
                  props.current === props.total - 3 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePagination(props.total - 3)}
                >
                  {props.total - 3}
                </button>
              </li>
              <li
                className={`page-item ${
                  props.current === props.total - 2 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePagination(props.total - 2)}
                >
                  {props.total - 2}
                </button>
              </li>
              <li
                className={`page-item ${
                  props.current === props.total - 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePagination(props.total - 1)}
                >
                  {props.total - 1}
                </button>
              </li>
              <li
                className={`page-item ${
                  props.current === props.total ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePagination(props.total)}
                >
                  {props.total}
                </button>
              </li>
            </>
          ) : (
            <>
              {Array.apply(0, Array(5)).map((arr, i) => (
                <>
                  <li
                    className={`page-item ${
                      props.current === i + 1 ? "active" : ""
                    }`}
                    key={i}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePagination(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                </>
              ))}
              <li className="page-item">
                <a className="page-link disabled">...</a>
              </li>
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => handlePagination(props.total)}
                >
                  {props.total}
                </button>
              </li>
            </>
          )}
          <li className="page-item">
            <button
              className={`page-link ${
                props.current === props.total
                  ? "disabled"
                  : props.current < props.total
                  ? ""
                  : ""
              }`}
              onClick={() => handlePagination(props.current + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
