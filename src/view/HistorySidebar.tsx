import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import TaskList from './TaskList';
import controllerObj from '../controller/controller';


function HistorySidebar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline" onClick={handleShow} className="me-2 borderless">
      <i className="fa fa-list-check fa-2x"></i>
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement='end'>
        <Offcanvas.Header>
          <Offcanvas.Title id='offcanvasRightLabel'>History</Offcanvas.Title>
          <Button variant="outline" onClick={() =>{controllerObj.delete_history; handleClose()}} className="me-2 borderless"><i className="fa fa-trash-can fa-2x"></i></Button>
        </Offcanvas.Header>
        <Offcanvas.Body className='history'>
          <TaskList/>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}





export default HistorySidebar;
