'use strict'

module Game {
  interface Block {
    pos: Pos
    type: string
    node: HTMLElement
  }
  
  interface Pos {
    x: number
    y: number
  }
  
  const enum Direction {
    left, up, right, down
  }
  
  const enum KeyCode {
    left  = 37,
    up    = 38,
    right = 39,
    down  = 40
  }
  
  const FLOOR = {
    SPACE: 'space',
    BODY: 'body',
    FOOD: 'food'
  }
  
  class Model {
    private blocks: Block[]
    private row: number
    private col: number
    private offsets: Array<number[]>
    
    constructor(blocks: Block[], row: number, col: number) {
      this.blocks = blocks
      this.row = row
      this.col = col
      this.offsets = [[-1, 0], [0, -1], [+1, 0], [0, +1]]
    }
    
    public get all() {
      return this.blocks;
    }
    
    private getBlock(pos: Pos): Block {
      return this.blocks.filter((block) => {
        if (block.pos.x === pos.x && block.pos.y === pos.y) {
          return true
        }
      })[0]
    }
    
    public sbling(source: Block, direction: Direction): Block {
      return this.blocks.filter((block) => {
        if (source.pos.x + this.offsets[direction][0] === block.pos.x
          && source.pos.y + this.offsets[direction][1] === block.pos.y) {
          return true
        }
      })[0]
    }
    
    private random(): Block {
      let pos: Pos = {
        x: Math.floor(Math.random() * this.col),
        y: Math.floor(Math.random() * this.row)
      }
      let block: Block = this.getBlock(pos)
      
      return block;
    }
    
    public genFood(): void {
      let block: Block = this.random()
      
      // re-random
      if (block.type === FLOOR.BODY) {
        block = this.random()
      }
      
      block.type = FLOOR.FOOD
      this.render([block])
    }
    
    public render(blocks: Block[]): void {
      blocks.forEach(block => {
        block.node.className = block.type
      })
    }
  }
  
  export class Floor {
    private table: HTMLTableElement
    private parent: HTMLElement
    private row: number
    private col: number
    public blocks: Block[]
    
    constructor(options?) {
      options = options || {};
      this.table = document.createElement('table')
      this.table.cellPadding = '0'
      this.table.cellSpacing = '0'
      this.parent = options.parent || document.body
      this.row = options.row || 20
      this.col = options.col || 20
      this.blocks = []
    }
    
    get model() {
      return new Model(this.blocks, this.row, this.col);
    }
    
    initialize() {
      let y: number
      let x: number
  
      for (y = 0; y < this.row; y++) {
        let tr = <HTMLTableRowElement>this.table.insertRow(-1)
        for (x = 0; x < this.col; x++) {
          let td = <HTMLTableCellElement>tr.insertCell(-1)
          td.className = FLOOR.SPACE
          this.blocks.push({
            node: td,
            type: FLOOR.SPACE,
            pos: {x: x, y: y}
          })
        }
      }
  
      this.parent.appendChild(this.table)
    }
  }
  
  export class Snake {
    private model: Model
    private initLength: number
    private direction: Direction
    private bodies: Block[]
    private speed: number
    private timer: number
    public score: number
    public step: number
    
    constructor(floor: Floor, options?) {
      options = options || {}
      this.model = floor.model
      this.initLength = options.initLength || 3
      this.direction = Direction.right
      this.bodies = []
      this.speed = options.speed || 300
      this.timer = null
      this.score = 0
      this.step = 0
    }
    
    public born() {
      var lastStep: number
      var lastKeyCode: number
      var setDirectionTimer: number
      let setDirection = (keyCode: number): void => {
        switch (keyCode) {
          case KeyCode.left:
            if (this.direction !== Direction.right) {
              this.direction = Direction.left
            }
            break
          case KeyCode.up:
            if (this.direction !== Direction.down) {
              this.direction = Direction.up
            }
            break
          case KeyCode.right:
            if (this.direction !== Direction.left) {
              this.direction = Direction.right
            }
            break
          case KeyCode.down:
            if (this.direction !== Direction.up) {
              this.direction = Direction.down
            }
            break
        }
      }
      let keyHandler = (e: KeyboardEvent): void  => {
        const keyCode: number = e.keyCode || e.which || e.charCode
        
        e.preventDefault()
        
        if (setDirectionTimer) {
          clearTimeout(setDirectionTimer)
        }
        
        // within single step
        if (this.step === lastStep) {
          
          // reserve current keycode
          lastKeyCode = keyCode
          
          // next step will call this
          setDirectionTimer = setTimeout(function() {
            setDirection(lastKeyCode)
          }.bind(this), this.speed)
          
          return
        }
        
        setDirection(keyCode)

        // reserve current step count
        lastStep = this.step
      }
  
      document.addEventListener('keydown', keyHandler, false)
  
      for (let i = this.initLength - 1; i >= 0; i--) {
        this.bodies.push(this.model.all[i])
      }
  
      this.bodies.forEach(body => {
        body['type'] = FLOOR.BODY
      })
      
      this.model.render(this.bodies)
      this.model.genFood()
      this.timer = setInterval(function() { this.move(); }.bind(this), this.speed)
    }
    
    private move() {
      let head: Block = this.bodies[0]
      let tail: Block = this.bodies[this.bodies.length - 1]
      let next: Block = this.model.sbling(head, this.direction)
      
      if (!next || next.type === FLOOR.BODY) {
        this.die()
        return
      }
      
      if (next.type === FLOOR.FOOD) {
        this.eat(next)
      }
      
      // body move
      for (let i = this.bodies.length - 1; i > 0; i--) {
        this.bodies[i] = this.bodies[i - 1]
      }
      
      next.type = FLOOR.BODY
      this.bodies[0] = next
      
      // clear original tail
      tail.type = FLOOR.SPACE
      this.model.render([tail])
      this.model.render(this.bodies)
      
      this.step++
    }
    
    private die() {
      clearInterval(this.timer)
      alert('Game Over!')
    }
    
    private eat(block: Block) {
      this.bodies.push(block)
      this.model.genFood()
      this.score++
    }
  }
}