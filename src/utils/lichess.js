export default class Lichess {
  constructor(token) {
    this.token = token
  }

  readStream(res, callback) {
    const reader = res.body.getReader()
    const read = result => {
      if(result.done) {
        console.log('events: Done.')
        return
      } else {
        const events = this.processNDJSON(result.value)
        events.forEach(callback)
      }
      reader.read().then(read, console.err)
    }
    reader.read().then(read, console.err)
  }

  processNDJSON(value) {
    const decodedValue = new TextDecoder().decode(value)
    return decodedValue
      .split('\n')
      .filter(l => l !== '\n' && l.length !== 0)
      .map(JSON.parse)
  }

  account() {
    const url = 'https://lichess.org/api/account'
    const params = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    }

    return fetch(url, params)
  }

  listenUserEvents(callback) {
    console.log('Listen lichess user events')
    fetch('https://lichess.org/api/stream/event',{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    })
    .then(res => { this.readStream(res, callback) })
    .catch(err => { console.log(err) })
  }
  
  listenGameEvents(gameId, callback) {
    const url = `https://lichess.org/api/board/game/stream/${gameId}`
    const params = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    }
    fetch(url, params)
      .then(res => { this.readStream(res, callback) })
      .catch(err => { console.log(err) })
  }

  move(gameId, move) {
    const url = `https://lichess.org/api/board/game/${gameId}/move/${move}`
    const params = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    }

    return fetch(url, params)
  }

  resign(gameId) {
    const url = `https://lichess.org/api/board/game/${gameId}/resign`
    const params = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    }

    return fetch(url, params)
  }

  challengeAI(level) {
    const url = `https://lichess.org/api/challenge/ai`
    const params = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `level=${level}`
    }

    return fetch(url, params)
  }

  challengeOpponent(username) {
    const url = `https://lichess.org/api/challenge/${username}`
    const params = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    }

    return fetch(url, params)
  }

  acceptChallenge(challengeId) {
    const url = `https://lichess.org/api/challenge/${challengeId}/accept`
    const params = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    }
    return fetch(url, params)
  }

  cancelChallege(challengeId) {
    const url = `https://lichess.org/api/challenge/${challengeId}/accept`
    const params = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    }
    return fetch(url, params)
  }

  declineChallenge(challengeId) {
    const url = `https://lichess.org/api/challenge/${challengeId}/accept`
    const params = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    }
    fetch(url, params)
  }
}
