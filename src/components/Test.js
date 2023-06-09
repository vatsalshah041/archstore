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
import { Button, Grid, IconButton } from '@mui/material';
import Modal from 'react-bootstrap/Modal'
import { useState } from 'react';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AssignmentIcon from '@mui/icons-material/Assignment';



export default function Test() {
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow1, setModalShow1] = React.useState(false);

  const list = useSelector((state) => state.allLists.lists);
  console.log(list);
  const fil=useSelector((state)=>state.allLists.filterlist)
  console.log(fil);
  let page = useSelector((state) => state.allLists.page);
  page = parseInt(page) - 1;
  page = String(page);
  const [p,setP]=useState(page)
  //console.log(page);
  const dispatch = useDispatch();

  useEffect(() => {
    const url = "https://rickandmortyapi.com/api/character?page=" + p
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

  }, [p])

  function createData(id, name, status, gender) {
    return { id, name, status, gender };
  }


  const rows = [];
  if (list != "") {
    if(fil!="")
    {
      for (let i = 0; i < fil.length; i++) {
        rows.push(createData(fil[i].id, fil[i].name, fil[i].status, fil[i].gender))
      }
    }
    else{
      for (let i = 0; i < list.results.length; i++) {
        rows.push(createData(list.results[i].id, list.results[i].name, list.results[i].status, list.results[i].gender))
      }
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
  function MyVerticallyCenteredModal1(props) {
    

    let x=localStorage.getItem("id")
    x=String(parseInt(x)-1)
    let y=parseInt(x)+1
    let u="https://rickandmortyapi.com/api/character/avatar/"+y+".jpeg"
    
    console.log(x);
    return (
      <>
      {(list && list.results && list.results[x])?<>
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Grid container>
            <Grid item md={3}></Grid>
            <Grid item md={6}>
            <img src={u} alt="Girl in a jacket" style={{width:"80%"}}/>
            </Grid>
            <Grid item md={3}></Grid>
            <hr></hr>
            <br></br>
            <Grid item md={6}>
              Name:{list.results[x].name}
            </Grid>
            <Grid item md={6}>
              Created:{list.results[x].created}
            </Grid>
            <Grid item md={6}>
              Gender:{list.results[x].gender}
            </Grid>
            <Grid item md={6}>
              Origin:{list.results[x].origin.name}
            </Grid>
          </Grid>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='contained' onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
        
        </>:<></>}
      
      </>
    );
  }
  const next=()=>{
    page = parseInt(page) +1;
  page = String(page);
  console.log(page)
  setP(page)
  }
  const prev=()=>{
   if(page=="1")
   {

   } 
   else{
    page = parseInt(page) -1;
  page = String(page);
  console.log(page)
  setP(page)
   }
  }
  const details=(e)=>{
    console.log(e);
    localStorage.setItem("id",e);
    setModalShow1(true)
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
        <Grid item md={4}></Grid>
        <Grid item md={1}>
        
        </Grid>
        <Grid item md={11}></Grid>
        <Grid item md={1}>
          <IconButton onClick={prev}><ArrowBackIosIcon/></IconButton>
          <IconButton onClick={next}><ArrowForwardIosIcon/></IconButton>
        
        </Grid>
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
                      <TableCell align="center" sx={{ backgroundColor: "#8c7deecc" }}>Gender</TableCell>
                      <TableCell align="center" sx={{ backgroundColor: "#8c7deecc", borderTopRightRadius: '23px' }}>Details</TableCell>
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
                        <TableCell align="center"><IconButton onClick={()=>{details(row.id)}}><AssignmentIcon/></IconButton></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>


              <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
              <MyVerticallyCenteredModal1
                show={modalShow1}
                onHide={() => setModalShow1(false)}
              />
            </> : <></>}

          </div>

        </Grid>
      </Grid>


    </>
  )
}
