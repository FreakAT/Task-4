const table2 = document.getElementById("table-2");

const table1_body = document.getElementById("table-1-body");
const table2_body = document.getElementById("table-2-body");

const search_input = document.getElementById("search-input");
const search_btn = document.getElementById("search-btn");

const sort_az_btn = document.getElementById("sort-az");
const sort_za_btn = document.getElementById("sort-za");
const sort_marks_btn = document.getElementById("sort-marks");
const sort_passing_btn = document.getElementById("sort-passing");
const sort_class_btn = document.getElementById("sort-class");
const sort_gender_btn = document.getElementById("sort-gender");
let data_array = [];

async function dataFetch() {
	const url =
		"https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json";
	const response = await fetch(url);
	const data = await response.json();
	return data;
}

async function caller() {
	data_array = await dataFetch();

	function searchBar() {}

	function display_data(arr, table_body) {
		let temp = "";
		arr.forEach((item) => {
			temp += `<tr id="${item.id}">`;
			temp += `<td>${item.id}</td>`;
			temp += `<td> <div class="name-display"><img src="${item.img_src}"/> <p>${item.first_name} ${item.last_name}</p></div></td>`;
			temp += `<td> ${item.gender}</td>`;
			temp += `<td> ${item.class}</td>`;
			temp += `<td> ${item.marks}</td>`;
			temp += `<td> ${item.passing ? "Passing" : "Failed"}</td>`;
			temp += `<td> ${item.email}</td>`;
		});
		table_body.innerHTML = temp;
	}

	display_data(data_array, table1_body);

	// searching
	search_btn.addEventListener("click", () => {
		table2.hidden = true;
		const input_val = search_input.value.toLowerCase();
		if (input_val) console.log(input_val);
		let new_array = data_array.filter(
			(student) =>
				student.id === +input_val ||
				`${student.first_name.toLowerCase()} ${student.last_name.toLowerCase()}` ===
					input_val ||
				student.gender.toLowerCase() === input_val ||
				student.class === +input_val ||
				student.marks === +input_val ||
				((input_val === "passing" || input_val === "failed") &&
					student.passing == (input_val === "passing")) ||
				student.email.toLowerCase() === input_val
		);
		// console.log(new_array);
		display_data(new_array, table1_body);
	});

	// sorting
	sort_az_btn.addEventListener("click", () => {
		table2.hidden = true;
		data_array.sort((a, b) => {
			const a_name = `${a.first_name.toLowerCase()} ${a.last_name.toLowerCase()}`;
			const b_name = `${b.first_name.toLowerCase()} ${b.last_name.toLowerCase()}`;
			if (a_name < b_name) return -1;
			if (a_name > b_name) return 1;
			return 0;
		});
		display_data(data_array, table1_body);
	});

	sort_za_btn.addEventListener("click", () => {
		table2.hidden = true;
		data_array.sort((a, b) => {
			const a_name = `${a.first_name.toLowerCase()} ${a.last_name.toLowerCase()}`;
			const b_name = `${b.first_name.toLowerCase()} ${b.last_name.toLowerCase()}`;
			if (a_name > b_name) return -1;
			if (a_name < b_name) return 1;
			return 0;
		});
		display_data(data_array, table1_body);
	});

	sort_marks_btn.addEventListener("click", () => {
		table2.hidden = true;
		data_array.sort((a, b) => {
			const a_marks = +a.marks;
			const b_marks = +b.marks;
			if (a_marks < b_marks) return -1;
			if (a_marks > b_marks) return 1;
			return 0;
		});
		display_data(data_array, table1_body);
	});

	sort_passing_btn.addEventListener("click", () => {
		table2.hidden = true;
		let new_array = data_array.filter((student) => student.passing === true);
		display_data(new_array, table1_body);
	});

	sort_class_btn.addEventListener("click", () => {
		table2.hidden = true;
		data_array.sort((a, b) => {
			const a_class = a.class;
			const b_class = b.class;
			if (a_class < b_class) return -1;
			if (a_class > b_class) return 1;
			return 0;
		});
		display_data(data_array, table1_body);
	});

	sort_gender_btn.addEventListener("click", () => {
		const male_array = data_array.filter(
			(student) => student.gender === "Male"
		);
		const female_array = data_array.filter(
			(student) => student.gender === "Female"
		);

		table2.hidden = false;

		display_data(female_array, table1_body);
		display_data(male_array, table2_body);
	});
}

caller();
