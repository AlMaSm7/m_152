import {Grid, Typography} from "@mui/material"
import ImageList from "@mui/material/ImageList"
import ImageListItem from "@mui/material/ImageListItem"
import Modal from "@mui/material/Modal"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import LinearProgress from '@mui/material/LinearProgress'
import {useEffect, useState, useRef} from "react"

const images = require.context("./images", false, /\.(png|jpe?g|JPG)$/)
const imageKeys = images.keys()

const descriptionsImages = ["Meet my little Bolonka Cora", "Beautiful view on the lake of Ticino", "Sky scrapers in NYC, a story in itself", "Grand Central, one of the busiest places NYC", "A view from the World Trade Center, the most iconic memorial in NYC", "The washington memorial in DC", "Nauders, Austria, very cool sky vacation", "The Marketplace in Belgium, Brussels", "manneken pis, gravity, the true side of brussels"]

const Photos = () => {
    const [open, setOpen] = useState(false)
    const [selectedImage, setSelectedImage] = useState('')
    const [imagesSrc, setImagesSrc] = useState([])
    const [intervalId, setIntervalId] = useState(0)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [selectedDiscription, setSelectedDiscription] = useState('')
    const autoPlayRef = useRef()

    useEffect(() => {
        autoPlayRef.current = handleForward
    })


    useEffect(() => {
        const updatedImagesSrc = imageKeys.map((imageKey) => images(imageKey))
        setImagesSrc(updatedImagesSrc)
    }, [])

    const runCarousel = () => {
        const play = () => {
            autoPlayRef.current()
        }
        const id = setInterval(() => {
            play()
        }, 5000)
        setIntervalId(id)
    }
    const handleOpen = () => {
        clearInterval(intervalId)
        setOpen(true)
        runCarousel()
    }

    const handleClose = () => {
        setOpen(false)
        clearInterval(intervalId)
    }

    const handleForward = () => {
        clearInterval(intervalId)
        let index = imagesSrc.indexOf(selectedImage)
        console.log("current index: " + index)

        if (index < imagesSrc.length - 1) {
            console.log("changing to next image:  " + imagesSrc[index + 1])
            setSelectedImage(imagesSrc[index + 1])
            setSelectedIndex(index + 1)
            setSelectedDiscription(descriptionsImages[index + 1])
        } else {
            console.log("Changing to first image ...")
            setSelectedImage(imagesSrc[0])
            setSelectedIndex(0)
            setSelectedDiscription(descriptionsImages[0])
        }
        runCarousel()
    }
    const handleBackward = () => {
        clearInterval(intervalId)
        let index = imagesSrc.indexOf(selectedImage)
        if (index === -1 || index === 0) {
            setSelectedImage(imagesSrc[imagesSrc.length - 1])
            setSelectedIndex(imagesSrc.length - 1)
            setSelectedDiscription(descriptionsImages[index - 1])
        } else {
            setSelectedImage(imagesSrc[index - 1])
            setSelectedIndex(index - 1)
            setSelectedDiscription(descriptionsImages[index - 1])
        }
        runCarousel()
    }
    const progressValue = (selectedIndex + 1) * 10
    const showImage = (image, descriptionIndex) => {
        handleOpen()
        setSelectedImage(image)
        setSelectedDiscription(descriptionsImages[descriptionIndex])
        let index = imagesSrc.indexOf(image)
        setSelectedIndex(index + 1)
        console.log(progressValue)
    }
    return (<>
            <Typography variant="h1" color='white'>Photos</Typography>
            <ImageList sx={{borderRadius: '5px'}} variant='woven' cols={3} gap={8}>
                {imageKeys.map((imageKey, index) => {
                    const image = images(imageKey)
                    return (<ImageListItem key={image} sx={{
                            cursor: 'pointer'
                        }}>
                            <img
                                src={image}
                                key={index}
                                alt="img"
                                loading="lazy"
                                onClick={() => showImage(image, index)}
                            />
                        </ImageListItem>)
                })}
            </ImageList>
            <Modal open={open} onClose={handleClose}
                   sx={{
                       border: 'none', backdropFilter: 'blur(8px)'
                   }}
            >
                <>

                    <div
                        style={{
                            position: 'relative',
                            border: 'none',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        <Grid container alignContent='center' justifyContent='center' flexDirection='row' sx={{paddingBottom: '20px'}}>
                            <Grid container item xs={1} alignItems='center' justifyContent='center'>
                                <ArrowBackIosIcon sx={{
                                    color: 'white', transition: 'transform 0.2s', // Smooth transition effect
                                    '&:hover': {
                                        fontSize: 32, // Increased size of the icon when hovered
                                        transform: 'scale(1.2)', // Scale up the icon by 20%
                                        cursor: 'pointer'
                                    }
                                }} onClick={handleBackward}/>
                            </Grid>
                            <Grid item xs={10} container alignItems='center' justifyContent='center'
                                  style={{height: '70vh', width: '50vh'}}>
                                <img src={selectedImage} alt="Modal Image"
                                     style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}}/>
                            </Grid>
                            <Grid item xs={1} container alignItems='center' justifyContent='center'>
                                <ArrowForwardIosIcon sx={{
                                    color: 'white', transition: 'transform 0.2s', // Smooth transition effect
                                    '&:hover': {
                                        fontSize: 32, // Increased size of the icon when hovered
                                        transform: 'scale(1.2)', // Scale up the icon by 20%
                                        cursor: 'pointer'
                                    }
                                }} onClick={handleForward}/>
                            </Grid>
                        </Grid>
                        <Grid xs={12} item container alignItems='center' justifyContent='center'
                              sx={{marginTop: '20px'}}>
                            <Grid xs={8} item sx={{width: '80%'}}>
                                <LinearProgress value={progressValue} aria-valuemax={9} variant='determinate'
                                                color="success"/>
                            </Grid>
                        </Grid>
                        <Grid xs={12} item container alignItems='center' justifyContent='center'
                              sx={{marginTop: '20px'}}>
                            <Grid xs={8} item sx={{width: '80%'}}>
                                <Typography variant='subtitle1' sx={{
                                    color: 'white', textAlign: 'center', paddingBottom: '20px', fontSize: '20px'
                                }}>{selectedDiscription}</Typography>
                            </Grid>
                        </Grid>
                    </div>
                </>
            </Modal>
        </>)
}
export default Photos
