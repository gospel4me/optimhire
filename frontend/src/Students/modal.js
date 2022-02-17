import Close from "../times-solid-svgrepo-com.svg";
import "./modal.scss";

const Modal = ({ show, close, title, children }) => {
    return (
      <>
       {
       show ?
       
        <div
          className="modalContainer"
          onClick={() => close()}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <header className="modal_header">
              <h2 className="modal_header-title"> {title} </h2>
              <button className="close" onClick={() => close()}>
                <img src={Close} alt="close" />
              </button>
            </header>
            <main className="modal_content"> {children} </main>
            <footer className="modal_footer">
              <button className="modal-close" onClick={() => close()}>
                Cancel
              </button>
  
              <button className="submit">Submit</button>
            </footer>
          </div>
        </div>
        : null
       },
      </>
    );
  };
  export default Modal;
