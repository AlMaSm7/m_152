import { Grid, Typography } from '@mui/material';
import video from '../../video/day_in_the_life.mp4'

const Video = () => {
    return(
        <>
            <Typography variant='h1' color='white'>Video</Typography>
            <Grid container sx={{overflowY: 'hidden'}}>
                <Grid item xs={12}>
                <video controls className='video'>
                    <source src={video} type="video/mp4"/>
                </video>
                <img src='../../video/abgabe.png' alt=''/>
                </Grid>
            </Grid>
        </>
    )
}

export default Video;