import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

const Qna = (props: any) => {
  return (
    <>
      <Card style={{ maxWidth: '300px', margin: '10px' }}>
        <CardHeader title={props.name} />
        <Typography style={{ paddingLeft: '15px', fontWeight: 'bold' }}>Creator: {props.creator}</Typography>
        <CardActions>
          <Button variant="contained" color="primary">
            Visit
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default Qna;
