import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minwidth: '400px !important',
    heigth:100,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: 3,
    pt: 2,
    px: 4,
    pb: 3,
};

const ModalView = ({open, handleClose, win}) => {
 
    return (
        <React.Fragment>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 200, textAlign:'center' }}>
                    {
                        win ? <h1 id="child-modal-title"  style={{color:"green"}}>You Win! ✨</h1> : <h1 id="child-modal-title" style={{color:"red"}}>You Loss ☹️</h1>
                    }
                    
                    <Button onClick={handleClose} color={win ? 'success' : 'error'}>Play Again</Button>
                </Box>
            </Modal>
        </React.Fragment>
    );
}


export default ModalView