(function() {
	'use strict';

	// Variables
	const iconTemplate = `
		<svg class="icon" width="30px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="-5 -5 520 520" style="enable-background:new 0 0 495.916 495.916;" xml:space="preserve">
			<g><g><path d="M495.852,86.916c-0.04-0.312-0.128-0.608-0.2-0.92l-0.048-0.216c-0.048-0.176,0-0.352-0.088-0.528l-0.048-0.096 c-0.143-0.313-0.303-0.617-0.48-0.912c-0.088-0.16-0.096-0.344-0.192-0.504c-0.096-0.16-0.192-0.184-0.264-0.296 c-0.124-0.213-0.26-0.419-0.408-0.616c-0.16-0.192-0.368-0.328-0.544-0.504c-0.176-0.176-0.264-0.248-0.4-0.368 s-0.36-0.376-0.568-0.528c-0.072-0.048-0.112-0.12-0.184-0.168c-0.072-0.048-0.224-0.088-0.328-0.152 c-0.641-0.299-1.284-0.595-1.928-0.888c-0.168-0.04-0.344,0-0.512-0.064c-0.33-0.063-0.664-0.106-1-0.128 c-0.363-0.047-0.73-0.065-1.096-0.056c-0.242,0.025-0.482,0.062-0.72,0.112c-0.176,0-0.352,0-0.528,0l-480,104 c-4.319,0.931-7.066,5.187-6.135,9.506c0.539,2.502,2.243,4.594,4.583,5.63l139.872,62.16l15.44,123.52 c0,0.144,0.096,0.264,0.12,0.408c0.083,0.395,0.195,0.782,0.336,1.16c0.149,0.458,0.336,0.902,0.56,1.328 c0.191,0.324,0.405,0.634,0.64,0.928c0.315,0.409,0.666,0.789,1.048,1.136c0.144,0.12,0.232,0.296,0.384,0.408 c0.152,0.112,0.36,0.176,0.528,0.288c0.385,0.244,0.789,0.455,1.208,0.632c0.383,0.167,0.779,0.303,1.184,0.408 c0.2,0.048,0.368,0.16,0.576,0.2c0.434,0.071,0.872,0.109,1.312,0.112c0.873-0.016,1.737-0.173,2.56-0.464 c0.232-0.08,0.448-0.2,0.68-0.304c0.613-0.272,1.188-0.621,1.712-1.04c0.12-0.104,0.28-0.136,0.4-0.248l78.144-70.328 l152.264,95.2c3.744,2.346,8.681,1.214,11.027-2.53c0.44-0.702,0.768-1.467,0.973-2.27l80-320c0.004-0.077,0.004-0.155,0-0.232 c0.056-0.264,0.04-0.536,0.072-0.8c0.065-0.359,0.103-0.723,0.112-1.088C495.915,87.507,495.894,87.21,495.852,86.916z M151.772,247.06l-118.2-52.52l393.936-85.344L151.772,247.06z M172.636,356.708l-12-96.168l247.112-123.576L211.236,281.46 c-0.064,0.048-0.144,0.144-0.224,0.208c-0.12,0.096-0.208,0.208-0.328,0.312c-0.726,0.631-1.331,1.391-1.784,2.24 c0,0.048-0.064,0.072-0.088,0.112L172.636,356.708z M194.02,349.7l25.152-50.344l18.16,11.352L194.02,349.7z M402.876,395.3 l-148-92.52l-24.664-15.408l206.992-152.208l37.6-27.664L402.876,395.3z"/></g></g>
		</svg>
	`;
	const chatOpen    = document.querySelector('.chat-open');
	const chatHolder  = document.querySelector('.chat-holder');
	let   lastMessage = '';
	let   openedChats = 0;
	let   botMsgCount = 0;


	// App
	const app = {};


	// Template
	app.chatTemplate = (id) => {
		let template = `
			<section class="chat" data-id="${id}">
				<header class="chat__title title">
					Chat ${id}

					<button class="close" data-id="${id}">x</button>
				</header>

				<div class="chat__container">
					<ul class="chat-list">
						<li class="chat-list__item">Hello!</li>
					</ul>
				</div>

				<footer class="chat__footer">
					<div class="loader">
						<span class="point is--01"></span>
						<span class="point is--02"></span>
						<span class="point is--03"></span>
					</div>
					<form method="#" class="chat-form" data-id="${id}">
						<input class="chat-form__input" type="text" name="formmessage" placeholder="Digite sua mensagem" autofocus autocomplete="off" />
						<button class="chat-form__send" type="submit">
							${iconTemplate}
							Enviar
						</button>
					</form>
				</footer>
			</section>
		`;

		return template;
	};


	// [ CTA ] - Start a new chat
	app.chatOpen = () => {
		chatOpen.addEventListener('click', () => {
			let chatId = ++openedChats;

			chatHolder.insertAdjacentHTML('beforeend', app.chatTemplate(chatId));
			app.startMessage();
			app.chatClose(chatId);
		});
	};


	// Render new messages to the chat
	app.renderNewMessage = (chat, message, user) => {
		let chatList = chat.querySelector('.chat-list');
		let messageTemplate = `<li class="chat-list__item ${user}">${message}</li>`;
		lastMessage = message;
		chatList.insertAdjacentHTML('beforeend', messageTemplate);
	};

	// Close chat
	app.chatClose = (id) => {
		const closeButton = document.querySelector(`.close[data-id="${id}"]`);
		const chatEl = document.querySelector(`.chat[data-id="${id}"]`);

		closeButton.addEventListener('click', (e) => {
			e.preventDefault();

			chatEl.outerHTML = '';
		});
	};


	// bot message
	app.startBotMessage = (chat) => {
		const botMessages = [
			`How can I help you?`,
			`First, please tell me your name.`,
			`Hi ${lastMessage}, What brought you here?`,
			`What's your dream job?`,
			`When you're not working, how do you like to spend your time?`,
			`What was your first job?`,
			`What is your most-used emoji?`,
			`This is mine ${lastMessage}`,
			`If you could win an Olympic medal for any sport, real or fake, what would it be?`,
			`If you could change your name, what would it be?`,
			`OK ${lastMessage}, What's your hidden talent?`
		];

		app.animateMessage(chat);

		setTimeout(() => {
			if (botMsgCount < botMessages.length) {
				app.renderNewMessage(chat, botMessages[botMsgCount], 'bot');
				app.scrollElement(chat);
				botMsgCount++;
			}
			else {
				console.log('Finish');
			}
		}, 1500);
	};


	// Animate messages
	app.animateMessage = (chat) => {
		let chatEl = chat.classList;

		chatEl.add('animate');
		app.scrollElement(chat);
		setTimeout(() => chatEl.remove('animate'), 1500);
	};


	// Scroll Element
	app.scrollElement = (chat) => {
		let scrollEl = chat.querySelector('.chat__container');
		scrollEl.scrollTop = 1500;
	};


	// Start message
	app.startMessage = () => {
		const chatForm = chatHolder.querySelectorAll('.chat-form');

		chatForm.forEach(form => {
			// Force focus
			form.querySelector('.chat-form__input').focus();

			form.addEventListener('submit', (e) => {
				e.preventDefault();

				let form = e.target;
				let chat = form.closest('.chat');
				let message = form.formmessage;

				if (message.value !== '') {
					app.renderNewMessage(chat, message.value, 'mine');
					message.value = '';

					app.startBotMessage(form.closest('.chat'));
				}
			});
		});
	};


	// Start app
	app.chatOpen();
})();