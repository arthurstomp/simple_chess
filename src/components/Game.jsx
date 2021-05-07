/* eslint-disable import/first */
import React, { useContext, useEffect, useRef, useState } from 'react'
import Modal from 'react-modal';

import '@chrisoakman/chessboardjs/dist/chessboard-1.0.0.js'
import '@chrisoakman/chessboardjs/dist/chessboard-1.0.0.min.css'

import styled from 'styled-components'

import {
  CenteredContent,
  Button
} from "./../style_components"
import {
  AppContext,
} from './../contexts'

import Lichess from './../utils/lichess.js'

const BoardWrapper = styled.div`
  margin-top: 10px;
  min-width: 8%;
  width: 20%;
  margin: 0 auto;
  max-height: 30%;
`

const defaultBoardConfig = {
  draggable: true,
  showNotation: true,
  pieceTheme: '/img/chesspieces/wikipedia/{piece}.png',
  onDragStart: (source, piece, position, orientation) => {
    if ((orientation === 'white' && piece.search(/^w/) === -1) ||
      (orientation === 'black' && piece.search(/^b/) === -1)) {
      return false
    }
  }
}

const performLichessMove = (gameState, game, board) => {
  console.log('performLichessMove')
  const moves = gameState.moves.split(' ')
  const movesSize = moves.length
  const lastMove = moves[movesSize - 1]
  console.log('Last move', lastMove)
  const ai = game.player
  if(!lastMove) { return }
  const chessboardMove = `${lastMove.slice(0,2)}-${lastMove.slice(2,4)}`
  debugger
  if(board.orientation() === 'white' && movesSize % 2 === 0) {
    board.move(chessboardMove)
  }

  if(board.orientation() === 'black' && movesSize% 2 === 1) {
    board.move(chessboardMove)
  }
}

const startBoardForGame = (event, board) => {
  if (!event.white.aiLevel) {
    board.orientation('white')
  } else if (!event.black.aiLevel) {
    board.orientation('black')
  } else {
    throw new Error('Current user is not part of the game')
  }
  board.start()
}

const processGameEvent = (game, board, setWinner) => {
  // console.log('processGameEvent',)
  const doProcessGameEvent = (event) => {
    console.log('doProcessGameEvent', event)
    switch(event.type) {
      case 'gameState':
        if(event.winner) {
          return setWinner(event.winner)
        }
        // console.log('Event gameState')
        performLichessMove(event, game, board)
        break
      case 'gameFull':
        // console.log('Event gameFull')
        startBoardForGame(event,board)
        performLichessMove(event.state, game, board)
        break
      default:
    }
  }

  return doProcessGameEvent
}

const initBoard = (boardRef, game, onDrop) => {
  const config = Object.assign(defaultBoardConfig, { onDrop })
  const board = window.Chessboard(boardRef.current, defaultBoardConfig)
  const { player } = game

  board.start()

  return board
}

const modalStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const ModalHeader = styled.div`
  text-align: center;
  font-size: 2rem;
`

const ModalContent = styled.div`
  text-align: center;
  font-size: 1.5rem;
`

const WinnerModal = props => {
  const { winner, setWinner } = props
  const closeModal = () => setWinner(null)
  return (
    <Modal
      isOpen={winner !== null}
      style={modalStyles}
    >
      <ModalHeader>Winner</ModalHeader>
      <button onClick={closeModal}>close</button>
      <ModalContent>{winner}</ModalContent>
    </Modal>
  )
}

export default function Game(props) {
  const boardRef = useRef(null)
  const [board, setBoard] = useState(null)
  const [winner, setWinner] = useState(null)
  const appContext = useContext(AppContext)

  const { accessToken, game } = appContext

  const chessboardMove = async (src, dst) => {
    // console.log('chessboardMove', src, dst)
    const lichess = new Lichess(accessToken)
    try {
      const res = await lichess.move(game.id, `${src}${dst}`)
      let json = null
      if(res.status === 200) {
        json = await res.json()
        if(!json.ok) { return 'snapback' }
        // console.log(`Chessboard move: ${src} ${dst}`)
      } else {
        console.error('Failed to send move')
        return 'snapback'
      }
    } catch(err) {
      console.error(err)
      return 'snapback'
    }
  }

  const resign = () => {
    const lichess = new Lichess(accessToken)
    lichess.resign(game.id)
      .then(res => {
        if(res.status === 200) {
          return res.json()
        } else {
          throw new Error('Failed to resign')
        }
      })
      .then(data => {
        if(data.ok) {
          console.log(data)
          board.clear()
        } else {
          throw new Error('Failed to resign')
        }
      })
      .catch(console.error)
  }

  useEffect(() => {
    if(game && board) {
      const lichess = new Lichess(accessToken)
      lichess.listenGameEvents(game.id, processGameEvent(game, board, setWinner))
    }
  }, [game, board])

  useEffect(() => {
    if(board === null && boardRef && game) {
      const newBoard = initBoard(boardRef, game, chessboardMove)
      setBoard(newBoard)
    }
  }, [board, boardRef, game])

  useEffect(() => {
    const handleResize = () => {
      if(board) {
        board.resize()
      }
    }
    window.addEventListener('resize', handleResize)
  },[board])

  return (
    <CenteredContent>
      <WinnerModal winner={winner} setWinner={setWinner}/>
      <BoardWrapper ref={boardRef} />
      <Button style={{marginTop: '10px'}} onClick={resign}>Resign</Button>
    </CenteredContent>
  )
}
