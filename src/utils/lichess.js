export default class Lichess {
  constructor(token) {
    this.token = token
  }

  readStream(res, callback) {
    const reader = res.body.getReader()
    const read = result => {
      if(result.done) {
        console.log('User events: Done.')
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

  challengeAI(level) {
    const url = `https://lichess.org/api/challenge/ai`
    const body = { level }
    const params = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify(body)
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
