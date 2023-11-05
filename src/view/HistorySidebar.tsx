import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import TaskList from './TaskList';


function HistorySidebar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline" onClick={handleShow} className="me-2 borderless">
      <i className="fa fa-list-ul fa-2x"></i>
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id='offcanvasRightLabel'>History</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='history'>
          <TaskList/>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}





export default HistorySidebar;
