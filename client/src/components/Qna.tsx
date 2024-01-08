import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import "C:/Users/tx/Desktop/QNA.COM/qna-com/client/src/css files/home.css"

const Qna = (props: any) => {
  const navigate = useNavigate();
  return (
    <>
      <Card className="home-qna" style={{ maxWidth: '300px', margin: '10px' }} >
        <CardHeader className='home-qna-title' title={props.name} />
        <Typography  className='home-qna-subtitle'  style={{ paddingLeft: '15px', fontWeight: 'bold' }}>Creator: {props.creator}</Typography>
        <CardActions>
          <Button className='home-qna-visit-btn' variant="contained" color="primary" onClick={()=>{
            navigate(`/getallque/${props._id}`)
          }}>
            Visit
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default Qna;
