import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

const RuleModal = ({ open, handleRoleModalClose }) => {

    return (
        <React.Fragment>
            <Modal
                open={open}
                onClose={handleRoleModalClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, textAlign: 'center' }}>
                    <h1>Rules</h1>
                    <div style={{ width: '100%' }}>
                        <ul className='rule_list'>
                            <li>
                                If the card drawn from the deck is a cat card, then the card is removed from the deck.
                            </li>
                            <li>
                                If the card is exploding kitten (bomb) then the player loses the game.
                            </li>
                            <li>
                                If the card is a defusing card, then the card is removed from the deck. This card can be used to defuse one bomb that may come in subsequent cards drawn from the deck.
                            </li>
                            <li>
                                If the card is a shuffle card, then the game is restarted and the deck is filled with 5 cards again.
                            </li>
                        </ul>
                    </div>

                    <Button onClick={handleRoleModalClose} variant='contained' color='error'>Play Now</Button>
                </Box>
            </Modal>
        </React.Fragment>
    );
}


export default RuleModal