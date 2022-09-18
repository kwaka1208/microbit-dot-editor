input.onButtonPressed(Button.A, function () {
    LoopBlock = 1
    SetLED()
    position += -1
    if (position < 0) {
        position = const_max_col * const_max_row - 1
    }
    led.plot(GetX(), GetY())
    LoopBlock = 0
})
function GetY () {
    return (position - position % const_max_col) / const_max_row
}
input.onGesture(Gesture.Shake, function () {
    Reset()
})
input.onButtonPressed(Button.AB, function () {
    canvas[position] = 1 - canvas[position]
})
input.onButtonPressed(Button.B, function () {
    LoopBlock = 1
    SetLED()
    position += 1
    if (position > const_max_col * const_max_row - 1) {
        position = 0
    }
    led.plot(GetX(), GetY())
    LoopBlock = 0
})
function InitialCanvas () {
    canvas = []
    for (let index = 0; index < const_max_col * const_max_row; index++) {
        canvas.push(0)
    }
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
}
function Reset () {
    position = 0
    InitialCanvas()
}
function SetLED () {
    if (canvas[position] == 1) {
        led.plot(GetX(), GetY())
    } else {
        led.unplot(GetX(), GetY())
    }
}
function GetX () {
    return position % const_max_col
}
let canvas: number[] = []
let position = 0
let LoopBlock = 0
let const_max_row = 0
let const_max_col = 0
const_max_col = 5
const_max_row = 5
Reset()
led.plot(GetX(), GetY())
LoopBlock = 0
basic.forever(function () {
    if (LoopBlock == 0) {
        led.toggle(GetX(), GetY())
        basic.pause(500)
    }
})
