const main = (document => {

    function createElement(tag, props, ...children) {
        const element = document.createElement(tag);

        Object.keys(props).forEach(key => element[key] = props[key]);

        if (children.length > 0) {
            children.forEach(child => {
                if (typeof child === 'string') {
                    child = document.createTextNode(child);
                }

                element.appendChild(child);
            });
        }

        return element;
    }

    function createTodoItem(title) {
        const label = createElement('label', { className: 'title' }, title);
        const listItem = createElement('div', { className: 'todo-list' }, label);

        return listItem;
    }

    function searchByLength(event) {
        event.preventDefault();

        if (addInput.value === '') {
            return alert('You must enter a search term.');
        } else if (addInput.value >= 0){
            todoList.innerHTML = '';
            filterByLength(addInput.value);
        } else {
            return alert('You must enter a number.');
        }
    }

    function filterByLength(value) {

        testData.data.forEach(data => {
            if (data.length >= value){
                const todoItem = createTodoItem(data);
                todoList.appendChild(todoItem);
            }

            addInput.value = '';
        });
    }

    function searchByString(event) {
        event.preventDefault();

        if (addInput.value === '') {
            return alert('You must enter a search term.');
        } else {
            todoList.innerHTML = '';
            filterByString(addInput.value);
        }
    }

    function filterByString(value) {

        testData.data.forEach(data => {
            if (data.indexOf(value) >= 0 && checkboxValue){
                const todoItem = createTodoItem(data);
                todoList.appendChild(todoItem);
            }else if (data.toLowerCase().indexOf(value.toLowerCase()) >= 0 && !checkboxValue){
                const todoItem = createTodoItem(data);
                todoList.appendChild(todoItem);
            }

            addInput.value = '';
        });
    }

    function checkboxListner(){
        const checkbox = todoForm.querySelector('.checkbox');

        checkbox.addEventListener('change', function () {
            checkboxValue = !checkboxValue;
        });
    }

    function getData(){
        var xmlhttp = new XMLHttpRequest();
        var url = "https://cors-anywhere.herokuapp.com/http://www.mrsoft.by/data.json";

        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                testData = JSON.parse(this.responseText);
            }
        };

        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }

    const todoForm = document.getElementById('todo-form');
    const filterByLengthButton = document.getElementById('buttonLength');
    const filterByStringButton = document.getElementById('buttonString');
    const addInput = document.getElementById('add-input');
    const todoList = document.getElementById('todo-list');

    let checkboxValue = false;
    let testData;

    function main() {
        filterByLengthButton.addEventListener('click', searchByLength);
        filterByStringButton.addEventListener('click', searchByString);
        getData();
        checkboxListner();
    }

    return main;

})(document);

main();