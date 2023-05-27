import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { add } from '../redux/action/listAction';
import { filter } from '../redux/action/listAction';
import { useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Grid } from '@mui/material';
import Modal from 'react-bootstrap/Modal'
import { useState } from 'react';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



export default function Test() {
  const [modalShow, setModalShow] = React.useState(false);

  const list = useSelector((state) => state.allLists.lists);
  console.log(list);
  let page = useSelector((state) => state.allLists.page);
  page = parseInt(page) - 1;
  page = String(page);
  //console.log(page);
  const dispatch = useDispatch();

  useEffect(() => {
    const url = "https://rickandmortyapi.com/api/character?page=" + page
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: url,
      headers: {}
    };

    async function makeRequest() {
      try {
        const response = await axios.request(config);
        //console.log((response.data));
        dispatch(add(response.data))
      }
      catch (error) {
        console.log(error);
      }
    }

    makeRequest();

  }, [])

  function createData(id, name, status, gender) {
    return { id, name, status, gender };
  }


  const rows = [];
  if (list != "") {
    for (let i = 0; i < list.results.length; i++) {
      rows.push(createData(list.results[i].id, list.results[i].name, list.results[i].status, list.results[i].gender))
    }
    //console.log(rows);

  }

  function MyVerticallyCenteredModal(props) {
    const submit = () => {
      let addb = {
        name: name,
        gender:gender,
        status:status

      }
      console.log(addb);
      dispatch(filter(addb))
      setModalShow(false)

    }
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [status, setStatus] = useState("");
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Filter
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Grid container rowSpacing={3}>
            <Grid item md={6}>
              <TextField id="outlined-number" label="Name" value={name} onChange={(e) => setName(e.target.value)} InputLabelProps={{ shrink: true, }} />
            </Grid>
            <Grid item md={6}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={gender}
                    label="Gender"
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item md={6}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    label="Status"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <MenuItem value={"Alive"}>Alive</MenuItem>
                    <MenuItem value={"Dead"}>Dead</MenuItem>
                    <MenuItem value={"unknown"}>Unknown</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>

          </Grid>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='contained' onClick={submit}>Submit</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={5}></Grid>

        <Grid item md={2}>
          <div>
            <Button variant='contained' onClick={() => setModalShow(true)}>Filters</Button>
          </div>
        </Grid>
        <Grid item md={5}></Grid>
        <Grid item md={12} sx={{ padding: "10px" }}>

          <div>

            {list ? <>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" sx={{ backgroundColor: "#8c7deecc", borderTopLeftRadius: '23px' }}>ID</TableCell>
                      <TableCell align="center" sx={{ backgroundColor: "#8c7deecc" }}>Name</TableCell>
                      <TableCell align="center" sx={{ backgroundColor: "#8c7deecc" }}>Status</TableCell>
                      <TableCell align="center" sx={{ backgroundColor: "#8c7deecc", borderTopRightRadius: '23px' }}>Gender</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center">{row.status}</TableCell>
                        <TableCell align="center">{row.gender}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>


              <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </> : <></>}

          </div>

        </Grid>
      </Grid>


    </>
  )
}
