const input_el = document.querySelector("input[type=text]");
const add_to_do = document.querySelector("input[type=submit]");

let tbody_el = document.querySelector("tbody");

let data_store = [];
let checked_arr = [];


function deleteToDo (data, btn_value) {
	if (typeof document.querySelectorAll('td') != 'undefined' && typeof document.querySelectorAll('tbody tr') != 'undefined') {
		let selected_tr_to_del = document.querySelectorAll('tbody tr');

		if (typeof selected_tr_to_del[btn_value].querySelectorAll('td') != 'undefined') {
			let selectedtd = selected_tr_to_del[btn_value].querySelectorAll('td');
			let selectedImg = selectedtd[2].querySelector('button img')
			if (selectedImg.src.includes('/images/checked.svg')) {

				let findIndex = checked_arr.findIndex(value => value === btn_value)
				selectedImg.src = './images/unchecked.svg';
				selectedtd[0].style.textDecoration = 'none';

				checked_arr.splice(findIndex, 1);

			}
		}
}
	data.filter(function (v, i) {  
		if(btn_value == i) {
			data.splice(btn_value, 1);
		}
		tbody_el.innerHTML = '';
	});

	if (data.length > 0) {
		document.querySelector('table').style.display = 'block';
	} else {
		document.querySelector('table').style.display = 'none';
	}
	showData()
}

function checkToDo (data, checkbox_button_value) {
	let selected_tr = document.querySelectorAll('tbody tr');
	let selected_td = selected_tr[checkbox_button_value].querySelectorAll('td');
	let selected_image = selected_td[2].querySelector('.check_button img')

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
	tbody_el.innerHTML = '';
	showData()
}

function addToDo () {
	let arr = [];

	if (input_el.value.trim() != '') {

		// add data
		arr.push(input_el.value);
		data_store.push(arr);

		tbody_el.innerHTML = '';
		showData();
		input_el.value = '';
	}
	document.querySelector('table').style.display = 'block';
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
		let td1 = document.createElement('td');
		let td2 = document.createElement('td');
		let td3 = document.createElement('td')
		let tr1 = document.createElement('tr');

		td1.append(element[0]);
		td2.append(del_button);
		td3.append(check_button);
		tr1.append(td1, td2, td3);
		tbody_el.append(tr1);

		if (data_store.length > 0) {

		del_button.addEventListener("click", () => {
			deleteToDo(data_store, del_button.value);
			});

			check_button.addEventListener("click", () => {
				checkToDo(data_store, check_button.value);
			})
		}
	});

	if (typeof document.querySelectorAll('tbody tr') != 'undefined' && document.querySelector('td') != 'undefined' && checked_arr.length > 0) {
		let selected_tr = document.querySelectorAll('tbody tr');
			checked_arr.forEach(index => {
				if (typeof selected_tr[index].querySelectorAll('td') != 'undefined') {
					let text = selected_tr[index].querySelectorAll('td');
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