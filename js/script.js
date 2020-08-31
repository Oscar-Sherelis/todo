const input_el = document.querySelector("input[type=text]");
const add_to_do = document.querySelector("input[type=submit]");
const section_el = document.querySelector("section");

let ul_el = document.createElement("ul");

let data_store = [];
let checked_arr = [];


function deleteToDo (data, btn_value) {
	if (typeof document.querySelectorAll('span') != 'undefined' && typeof document.querySelectorAll('li') != 'undefined') {
		let selected_li_to_del = document.querySelectorAll('li');

		if (typeof selected_li_to_del[btn_value].querySelectorAll('span') != 'undefined') {
			let selectedSpan = selected_li_to_del[btn_value].querySelectorAll('span');
			let selectedImg = selectedSpan[2].querySelector('button img')
			console.log('img ' + selectedImg.src)
			if (selectedImg.src.includes('/images/checked.svg')) {

				let findIndex = checked_arr.findIndex(value => value === btn_value)
				selectedImg.src = './images/unchecked.svg';
				selectedSpan[0].style.textDecoration = 'none';

				checked_arr.splice(findIndex, 1);

			}
		}
}
	data.filter(function (v, i) {  
		if(btn_value == i) {
			data.splice(btn_value, 1);
		}
		ul_el.innerHTML = '';
	});
	showData()
}

function checkToDo (data, checkbox_button_value) {
	let selected_li = document.querySelectorAll('li');
	let selected_span = selected_li[checkbox_button_value].querySelectorAll('span');
	let selected_image = selected_span[2].querySelector('.check_button img')

	data.filter(function (v, i) {  

		if(checkbox_button_value == i && selected_image.src.includes('/images/unchecked.svg')) {
			if (checked_arr.length > 0) {
					if (!checked_arr.includes(checkbox_button_value)) {
						checked_arr.push(checkbox_button_value);
						selected_image.src = './images/checked.svg';
					}
			} else {
				checked_arr.push(checkbox_button_value);
				selected_image.src = './images/checked.svg';
			}

		} else if (checkbox_button_value == i && selected_image.src.includes('/images/checked.svg')) {
			let item_to_remove = checked_arr.indexOf(checkbox_button_value);
			if (item_to_remove > -1) {
				checked_arr.splice(item_to_remove, 1);
				selected_image.src = './images/unchecked.svg';
			  }
		}
	});
	ul_el.innerHTML = '';
	showData()
}

function addToDo () {
	let arr = [];

	if (input_el.value.trim() != '') {

		// add data
		arr.push(input_el.value);
		data_store.push(arr);

		ul_el.innerHTML = '';
		showData();
		input_el.value = '';
	}
}

function showData () {
	data_store.forEach(function (element, index) {
		let del_button = document.createElement('button');
		del_button.setAttribute('value', index);
		del_button.append('X');
		del_button.setAttribute('class', 'del_button');

		let check_button = document.createElement('button');
		check_button.setAttribute('class', 'check_button');
		let unchecked_image = document.createElement('img');
		unchecked_image.setAttribute('src', './images/unchecked.svg');

		check_button.setAttribute('value', index);
		check_button.append(unchecked_image);
		let span1 = document.createElement('span');
		let span2 = document.createElement('span');
		let span3 = document.createElement('span')
		let li1 = document.createElement('li');

		span1.append(element[0]);
		span2.append(del_button);
		span3.append(check_button);
		li1.append(span1, span2, span3);
		ul_el.append(li1);

		section_el.append(ul_el);

		if (data_store.length > 0) {

		del_button.addEventListener("click", () => {
			deleteToDo(data_store, del_button.value);
			});

			check_button.addEventListener("click", () => {
				checkToDo(data_store, check_button.value);
			})
		}
	});

	if (typeof document.querySelectorAll('li') != 'undefined' && document.querySelector('span') != 'undefined' && checked_arr.length > 0) {
		let selected_li = document.querySelectorAll('li');
			checked_arr.forEach(index => {
				if (typeof selected_li[index].querySelectorAll('span') != 'undefined') {
					let text = selected_li[index].querySelectorAll('span');
					text[0].style.textDecoration = 'line-through';
					text[2].querySelector('button img').src = './images/checked.svg'
				}
			})
	}
}

add_to_do.addEventListener("click", (e) => {
	e.preventDefault()
	addToDo()
});