import React, { useEffect, useState } from "react";
import Card from './Card';
import cards from "../constant";
import ModalView from "./ModalView";
import RuleModal from "./RulesModal";
import { useDispatch, useSelector } from "react-redux";
import { increment, loadUser, loadUserData } from "../redux/slice/userSlice";
import { json, useNavigate } from 'react-router-dom'
import LeaderBoard from "./LeaderBord";

const Playground = () => {

    const user = useSelector(state => state.user)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [desk, setDesk] = useState([])

    const [cCard, setCCard] = useState(null)

    const [defuceCard, setDefuseCard] = useState([])

    const [win, setWin] = useState(false)

    const [open, setOpen] = useState(false);

    const [ruleModal, setRuleModal] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        startGame()
    };

    const handleRoleModalOpen = () => {
        setRuleModal(true);
    };

    const handleRoleModalClose = () => {
        setRuleModal(false);
        startGame()
    };

    const logout = () => {
        localStorage.clear()
        navigate('/')
    }
    const getCard = () => {
        let index = Math.floor(Math.random() * cards.length)
        return cards[index]
    }

    const getGame = () => {
        const desk = JSON.parse(localStorage.getItem('desk'))
        const cCard = JSON.parse(localStorage.getItem('currentCard'))
        const defuceCard = JSON.parse(localStorage.getItem('defuceCard'))
        if (desk) {
            setDesk(desk)
        }
        if (cCard) {
            setCCard(cCard)
        }
        if (defuceCard) {
            setDefuseCard(defuceCard)
        }
    }
    useEffect(() => {
        getGame()
        dispatch(loadUserData())
    }, [])

    const startGame = () => {
        localStorage.setItem('desk', JSON.stringify([]))
        localStorage.setItem('currentCard', JSON.stringify(null))
        localStorage.setItem('defuceCard', JSON.stringify([]))
        let deskE = [
            getCard(),
            getCard(),
            getCard(),
            getCard(),
            getCard()
        ]
     
        setDesk(deskE)
        setCCard(null)
        setDefuseCard([])
        setWin(false)
    }


    const saveDesk = (desk) => {
        localStorage.setItem('desk', JSON.stringify(desk))
        return
    }

    const saveCurretCard = (card) => {
        localStorage.setItem('currentCard', JSON.stringify(card))
        return
    }
    const saveDefuseCard = (card) => {
        localStorage.setItem('defuceCard', JSON.stringify(card))
        return
    }


    function getCardFromDesk() {
        let existingCard = [...desk]
        let card = existingCard.pop()
        setDesk(() => {
            saveDesk(existingCard)
            return existingCard
        })

        //Bomb card
        if (card.cardId == 4) {
            setCCard(() => {
                saveCurretCard(card)
                return card
            })
            if (!checkForDefuseCard()) {
                setWin(false)
                setTimeout(() => {
                    handleOpen(true)
                }, 500);
            }
        } //Defuse card
        else if (card.cardId === 2) {
            setCCard(() => {
                saveCurretCard(card)
                return card
            })
            setTimeout(() => {
                setCCard(() => {
                    saveCurretCard(null)
                    return null
                })
                let newCard = [...defuceCard]
                newCard.push(card)
                setDefuseCard(() => {
                    saveDefuseCard(newCard)
                    return newCard
                })
            }, 500)
        } else if (card.cardId === 3) { //Shuffle card
            setCCard(() => {
                saveCurretCard(card)
                return card
            })
            setTimeout(() => {
                startGame()
            }, 500)
        }
        else if (card.cardId === 1) { //Cat card 
            setCCard(() => {
                saveCurretCard(card)
                return card
            })
        }

        if (existingCard.length === 0) {
            if (card.cardId === 1 || card.cardId === 2) {
                dispatch(increment({ name: user?.userData?.Member }))
                setWin(true)
                setTimeout(() => {
                    handleOpen(true)
                }, 500);

            }else if(card.cardId === 4) {
                if (!checkForDefuseCard) {
                    setWin(false)
                    setTimeout(() => {
                        handleOpen(true)
                    }, 500);
                } else {

                    setWin(true)
                    setTimeout(() => {
                        handleOpen(true)
                    }, 500);
                }
            }else if(card.cardId === 3) {

                setTimeout(() => {
                    startGame()
                }, 500)
            }
            else {
                setWin(false)
                setTimeout(() => {
                    handleOpen(true)
                }, 500);
            }
            return
        }

        return
    }

    //Checking for any defuse card present or not
    function checkForDefuseCard() {
        if (defuceCard.length) {
            let newdecard = [...defuceCard]
            newdecard.pop()
            setTimeout(() => {
                setDefuseCard(() => {
                    saveDefuseCard(newdecard)
                    return newdecard
                })
                setCCard(() => {
                    saveCurretCard(null)
                    return null
                })
            }, 500)
            return true
        } else {
            return false
        }
    }



    return (
        <div style={{ backgroundColor: '#2b523c', height: '100vh' }}>
            <LeaderBoard />
            <div className="header">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button onClick={startGame} className="button button_primary">Start Game</button>
                    <div className="user_score_board">
                        <div className="user_name">
                            <span>Hi, {user?.userData?.Member}</span>
                        </div>
                        <div className="user_name">
                            <span>Score - {user?.userData?.Score}</span>
                        </div>
                    </div>
                </div>
                <div className="menu-list">
                    <button className="button button_transparent" onClick={handleRoleModalOpen}>Rules</button>
                    <button className="button button_transparent" onClick={logout}>Exit</button>
                </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }} onClick={() => !win && getCardFromDesk()}>
                <div style={{ width: '50%', height: 'auto' }}>
                    {
                        desk.map((card, index) => {
                            return <Card show={false} left={index} />
                        }
                        )
                    }
                </div>
            </div>

            <div style={{ width: '100vw', height: '100px', display: 'flex', position: 'relative', top: '50vh' }}>
                <div style={{ width: '50%', height: '100%', display: 'flex', justifyContent: 'center' }}>
                    {
                        cCard && <Card show={true} data={cCard} />

                    }
                </div>
                <div style={{ width: '50%', height: '100%', display: 'flex', justifyContent: 'center' }}>
                    {
                        defuceCard.map((card, index) => {
                            return (
                                <Card show={true} data={card} />
                            )
                        })
                    }
                </div>
            </div>

            <ModalView open={open} handleClose={handleClose} win={win} />
            <RuleModal open={ruleModal} handleRoleModalClose={handleRoleModalClose} />
        </div>
    )
}


export default Playground