import axios from "axios";
import { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import filterFactory, { dateFilter, textFilter } from "react-bootstrap-table2-filter";
import { ArrowRight } from 'react-bootstrap-icons';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


function App() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axios("https://my-json-server.typicode.com/gmfoster/fakeData/posts/").then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  };

  const arrow = (cell, row) => {
    return <ArrowRight/>;
  }

  const selectRow = {
    mode: 'checkbox',
    clickToSelect: true,
    onSelect: (row, isSelect, rowIndex, e) => {
      console.log("select", row)
    }
  };

  const columns = [
    {
      dataField: "studentId",
      text: "Student ID ",
      sort: true,
      //style: {width: "10%"},
      filter: textFilter(),
      // formatter: emailFormatter,
    },
    {
      dataField: "lastName",
      text: "Last Name",
      sort: true,
      filter: textFilter(),

    },
    {
      dataField: "firstName",
      text: "First Name",
      sort: true,
      filter: textFilter(),

    },
    {
      dataField: "graduation_date",
      text: "Graduation Date",
      sort: true,
      filter: dateFilter()
    },
    {
      dataField: "battalion",
      text: "Battalion",
      sort: true,
      filter: textFilter(),

    },
    {
      dataField: "company",
      text: "Company",
      sort: true,
      filter: textFilter(),

    },
    {
      dataField: "edit",
      formatter: arrow,
      text: "Edit",
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => { handleShow() },
      }
    }
  ];


  return (
    <div className="App">
      <BootstrapTable
        keyField="studentId"
        data={data}
        columns={columns}
        hover
        bordered
        pagination={paginationFactory()}
        cellEdit={cellEditFactory({
          mode: "dbclick",
          blurToSave: true,
          nonEditableRows: () => [1, 2, 3],
        })}
        selectRow={selectRow}
        filter={filterFactory()}
        filterPosition={"top"}
      />
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
