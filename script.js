
const TURNS = {
	X: "X",
	O: "O"
}
let gameState = {
	board: [
		["", "", ""],
		["", "", ""],
		["", "", ""]
	],
	currentTurn: TURNS.O,
	status: "RUNNING"
}
let position = {
	y: 0,
	x: 0
}

const GAME_STATES = {
	LOSS: 0,
	WIN: 1,
	DRAW: 2
}

const IS_WINNER = (gameState) => {
	for (let row = 0; row < gameState.board.length; row++) {
		if (gameState.board[row][0] === gameState.currentTurn &&
			gameState.board[row][1] === gameState.currentTurn &&
			gameState.board[row][2] === gameState.currentTurn) {
			return true
		}
	}
	for (let column = 0; column < gameState.board.length; column++) {
		if (gameState.board[0][column] === gameState.currentTurn &&
			gameState.board[1][column] === gameState.currentTurn &&
			gameState.board[2][column] === gameState.currentTurn) {
			return true
		}
	}

	if (gameState.board[0][2] === gameState.currentTurn &&
		gameState.board[1][1] === gameState.currentTurn &&
		gameState.board[2][0] === gameState.currentTurn) {
		return true
	}
	if (gameState.board[0][0] === gameState.currentTurn &&
		gameState.board[1][1] === gameState.currentTurn &&
		gameState.board[2][2] === gameState.currentTurn) {
		return true
	}
	return false
}

const IS_BOARD_FULL = (gameState) => {
	for (let row = 0; row < gameState.board.length; row++) {
		for (let column = 0; column < gameState.board[row].length; column++) {
			if (gameState.board[row][column] === "")
				return false
		}
	}
	return true
}

let renderASCIIBoard = (board) => {
	let row0 =
		`${board[0][0] === "" ? "   " : board[0][0]}|` +
		`${board[0][1] === "" ? "  " : board[0][1]}|` +
		`${board[0][2] === "" ? " " : board[0][2]}\n-+-+-\n`

	let row1 =
		`${board[1][0] === "" ? "   " : board[1][0]}|` +
		`${board[1][1] === "" ? "  " : board[1][1]}|` +
		`${board[1][2] === "" ? " " : board[1][2]}\n-+-+-\n`

	let row2 =
		`${board[2][0] === "" ? "   " : board[2][0]}|` +
		`${board[2][1] === "" ? "  " : board[2][1]}|` +
		`${board[2][2] === "" ? " " : board[2][2]}`


	let result = row0 + row1 + row2
	console.log(result)
}

let startBoard = (board) => {
	if (gameState.status === "RUNNING")
		renderASCIIBoard(board)
} 

startBoard(gameState.board)

let playTicTacToe = (gameState, position) => {
	if (gameState.status !== "RUNNING") return gameState.board

	let isOutOfBounds =
		position.y < 0 ||
		position.x < 0 ||
		position.y > gameState.board.length - 1 ||
		position.x > gameState.board.length - 1;

	if (isOutOfBounds) {
		console.log("Out of bound")
		return gameState.board
	}

	let isValidPosition = gameState.board[position.y][position.x] === ""

	if (!isValidPosition) {
		console.log("Invalid position")
		return gameState.board
	}
	gameState.board[position.y][position.x] = gameState.currentTurn

	renderASCIIBoard(gameState.board)

	let isWin = IS_WINNER(gameState)

	if (isWin) {
		console.log(`"${gameState.currentTurn}" Wins!`)
		gameState.status = "FINISHED"
		return gameState.board
	}

	let gameResultDraw = IS_BOARD_FULL(gameState)

	if (gameResultDraw) {
		console.log(`It's a draw!`)
		gameState.status = "FINISHED"
		return gameState.board
	}

	gameState.currentTurn = gameState.currentTurn === TURNS.X ? TURNS.O : TURNS.X

	return gameState.board
}

/*
// O wins:
playTicTacToe(gameState, { y: 0, x: 0 })
playTicTacToe(gameState, { y: 1, x: 1 })
playTicTacToe(gameState, { y: 1, x: 0 })
playTicTacToe(gameState, { y: 1, x: 2 })
playTicTacToe(gameState, { y: 2, x: 0 })
*/




