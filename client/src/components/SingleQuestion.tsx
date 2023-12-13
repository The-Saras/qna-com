import { Typography,Card,CardContent } from "@mui/material";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

const SingleQuestion = (props:any)=>{
    return(
        <>
        <Card variant="outlined" sx={{ minWidth: 275, margin: 2 }}>
        <CardContent>

        <Typography component="div" variant="h6">Question: {props.text}</Typography>
        <br></br>
        <ArrowCircleUpIcon color="success" />
        </CardContent>
        </Card>
        </>
    )
}

export default SingleQuestion