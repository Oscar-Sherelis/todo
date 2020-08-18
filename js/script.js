const input_el = document.querySelector("input[type=text]");
const add_to_do = document.querySelector("input[type=submit]");
const section_el = document.querySelector("section");
let p_el = document.querySelector("p");

let ul_el = document.createElement("ul");

let data_store = [];

function deleteToDo (data, btn_value) {

	data.filter(function (v, i) {  
		if(btn_value == i) {
			data.splice(i, 1);
		}
		ul_el.innerHTML = '';
	});
	showData()
}

function addToDo () {
	p_el.innerHTML = '';
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
	// forEach start
	data_store.forEach(function (element, index) {
		let del_button = document.createElement("button");
		del_button.setAttribute("value", index);
		del_button.append("X");

		let span1 = document.createElement("span");
		let span2 = document.createElement("span");
		let li1 = document.createElement("li");

		span1.append(element[0]);
		span2.append(del_button);
		li1.append(span1, span2);
		ul_el.append(li1);

		section_el.append(ul_el);

		// check if arr is not empty
		if (data_store.length > 0) {

		del_button.addEventListener("click", function() {
			deleteToDo(data_store, del_button.value);
			});
		}
	});
}

add_to_do.addEventListener("click", (e) => {
	e.preventDefault()
	addToDo()
});