/// <reference path="snake.ts"/>

'use strict'

module Game {
  const start: HTMLElement = document.getElementById('start')
  const score: HTMLElement = document.getElementById('score')
  
  const floor: Floor = new Floor({
    parent: document.getElementById('container')
  })
  floor.initialize()
  
  const snake: Snake = new Snake(floor)
  
  start.onclick = function() {
    snake.born()
    this.setAttribute('disabled', 'true')
  }
  
  const observer = (changes) => {
    changes.forEach((change) => {
      if (change.name === 'score') {
        score.textContent = change.object[change.name]
      }
    })
  }
  
  Object['observe'](snake, observer)
}