$(document).ready(function(){

	let containerEl = document.querySelector('#project-card');

    let mixer = mixitup(containerEl);

	// form placeholder
	const formItems = document.querySelectorAll('.form-field');
	
	for(let item of formItems){
		const thisParent = item.closest('.form-item');
		const thisPlaceholder = thisParent.querySelector('.fake-placeholder');
		// Если инпут в фокусе		
		item.addEventListener('focus', function(){
			thisPlaceholder.classList.add('active');
		});

		// Если инпут теряет фокус
		item.addEventListener('blur', function(){

			if(item.value.length > 0){
				thisPlaceholder.classList.add('active');
			}
			else{
				thisPlaceholder.classList.remove('active');
			}
		})
	}
	//FORM VALIDATE
	$('.contact-form').validate({
		rules: {
			email: {
				required: true,
				email: true
			},
			subject: {
				required: true
			},
			message: {
				required: true
			}
		},
		messages: {
			email: {
				required: 'Введите email',
				email: 'отсутсвует символ @'
			},
			subject: {
				required: 'Введите тему'
			},
			message: {
				required: 'Введите текст'
			}
		},
		submitHandler: function (form) {
			ajaxFormSubmit();
		}

	})


	// Функция AJAX запрса на сервер

	function ajaxFormSubmit() {

		let string = $(".contact-form").serialize(); // Соханяем данные введенные в форму в строку.

		//Формируем ajax запрос
		$.ajax({
			type: "POST", // Тип запроса - POST
			url: "php/mail.php", // Куда отправляем запрос
			data: string, // Какие даные отправляем, в данном случае отправляем переменную string

			// Функция если все прошло успешно
			success: function (html) {
				$(".contact-form").slideUp(800);
				$('#answer').html(html);
			}
		});
		// Чтобы по Submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепчку срабатывания остальных функций
		return false;
	}


	
})

const toggleMenu = document.querySelector('.toggle-menu'); //иконка гамбургер
const mobMenu = document.querySelector('.mobile-menu'); //mob menu
const overlay = document.querySelector('#overlay'); //overlay
const bodyEl = document.body; //


//прослушиваем событие клик по гамбургеру
toggleMenu.addEventListener('click', function(){
	this.classList.toggle('active'); //  переключаем класс active  у гамбургера
	mobMenu.classList.toggle('active'); //  переключаем класс active  у mobMenu
	overlay.classList.toggle('active'); //  переключаем класс active  у overlay
	bodyEl.classList.toggle('noscroll'); //  переключаем класс noscroll  у body
});

//прослушиваем событие клик по mob menu
mobMenu.addEventListener('click', function(){
	this.classList.remove('active');
	toggleMenu.classList.remove('active');
	overlay.classList.remove('active');
	bodyEl.classList.remove('noscroll');
})

//прослушиваем событие клик по overlay
overlay.addEventListener('click', function(){
	this.classList.remove('active');
	toggleMenu.classList.remove('active');
	mobMenu.classList.remove('active');
	bodyEl.classList.remove('noscroll');
})
