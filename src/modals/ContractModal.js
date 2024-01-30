// ContractModal.js
import React, { useState, useRef, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import debounce from "lodash/debounce";
import { Document, Page, pdfjs } from "react-pdf";

function ContractModal(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const pdfContainerRef = useRef(null); // Use a separate ref for the container
  const [documentWidth, setDocumentWidth] = useState(400);
  //using create-react-app (webpack) so react-pdf needs this modification
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  const flipPage = (val) => {
    if (val > 0 && pageNumber < numPages) {
      setPageNumber(pageNumber + val);
    } else if (val < 0 && pageNumber > 1) {
      setPageNumber(pageNumber + val);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // useEffect to set document width based on modal width
  useEffect(() => {
    const updateDocumentWidth = () => {
      if (pdfContainerRef.current) {
        const width = pdfContainerRef.current.clientWidth;
        setDocumentWidth(width);
      }
    };
    updateDocumentWidth();
    // use debounce function for efficient handling of resize event
    const debouncedUpdateDocumentWidth = debounce(updateDocumentWidth, 75);
    window.addEventListener("resize", debouncedUpdateDocumentWidth);
    // clean up event listener on return
    return () => {
      window.removeEventListener("resize", debouncedUpdateDocumentWidth);
    };
  }, [pdfContainerRef]);

  return (
    <Modal show={props.show} onHide={props.handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Contract</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div ref={pdfContainerRef}>
          <Document
            file={props.contractPath}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page
              pageNumber={pageNumber}
              width={documentWidth}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              customTextRenderer={false}
            />
          </Document>
        </div>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => flipPage(-1)}>
          Previous Page
        </Button>
        <Button variant="secondary" onClick={() => flipPage(1)}>
          Next Page
        </Button>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        {/* Add a button to go to the next page if needed */}
      </Modal.Footer>
    </Modal>
  );
}

export default ContractModal;
