'use strict';

import Board from './board';
import server from './sendToServer.js';
import createCanvasGame from './createCanvasGame.js';
import displayDisconnectMessage from './displayDisconnectMessage.js';
import * as constant from './constant';
import $ from 'jquery';

document.addEventListener('DOMContentLoaded', function () {

	server.on('connection', function(){

		$('form.username').submit(function(e) {
			e.preventDefault();
			var name = $(this).find('input.username')[0].value;

			$('div.username').remove();

			let context = createCanvasGame();
			let board = new Board(context);
			board.createScoreboard();

			server.sendSnakeNew(name);
      
			server.on('new_apple', function(data){
				let apple = board.newApple(data.x, data.y);
				apple.draw();
			});

			var clientLocaleSnake;

			server.on('new_snake', function(data){
				clientLocaleSnake = board.newSnake(data.x, data.y, data.name);
				
			});

			console.log(clientLocaleSnake);

			server.on('setDirection', data => {
				board.snakes.forEach(snake => {
					if (snake.name === data.name) {
						snake.direction = data.direction;
					}
				});
			});
			server.sendNewUser();
			//server.sendDeleteUser();
			server.sendMove();

			//server.sendAppleEaten(x, y);

			board.render();
			board.on('appleEaten', function(position){
				server.sendAppleEaten(position);
			});

			server.on('disconnect', function(){
				board.stopRendering();
				displayDisconnectMessage();
			});

			$('body').keydown((e) => {
				if (e.keyCode === 37 && clientLocaleSnake.direction !== 'right') {
					server.changeDirection(clientLocaleSnake.name, 'left');
				}
				else if (e.keyCode === 38 && clientLocaleSnake.direction !== 'down') {
					server.changeDirection(clientLocaleSnake.name, 'up');
				}
				else if (e.keyCode === 39 && clientLocaleSnake.direction !== 'left') {
					server.changeDirection(clientLocaleSnake.name, 'right');
				}
				else if (e.keyCode === 40 && clientLocaleSnake.direction !== 'up') {
					server.changeDirection(clientLocaleSnake.name, 'down');
				}
			});
		});
	});
});
