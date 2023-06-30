const adduserbtn = document.getElementById("adduser");
const btnText = adduserbtn.innerText;
const usernameTextfield = document.getElementById("username");
const showlist = document.getElementById("ShowList");
const recordDisplay = document.getElementById('records');
const record_size = document.getElementById('records_size');
let userArray = [];
let edit_id = null;

let objStr = localStorage.getItem('users');

if (objStr != null) {
    userArray = JSON.parse(objStr);
}
let callback = () => {
    const name = usernameTextfield.value;
    // alert("yyy");
    if (name == '') return;
    if (edit_id != null) {
        userArray.splice(edit_id, 1, { 'name': name });
        edit_id = null;
    }
    else {
        userArray.push({ 'name': name })
        // alert(name);
    }
    SaveInfo(userArray);
    usernameTextfield.value = '';

    adduserbtn.innerText = btnText;
      usernameTextfield.value = '';
}
adduserbtn.onclick = callback;

usernameTextfield.onkeydown = (event) => {

    if (event.key === "Enter") {
        // alert("hello!");
        event.preventDefault();
        callback();

    }
}
var show=true;
showlist.addEventListener('click',function(e){
    
   show==true?document.getElementById('ShowList').innerText='ColllpaseList'
:document.getElementById('ShowList').innerText='Showlist';
if(show==false)
location.reload();
show=!show;

    DisplayInfo();
})
   

userArray.sort((i)=>
{
    console.log(i);
})
function SaveInfo(userArray) {

    let str = JSON.stringify(userArray);
    //  alert(str);
    localStorage.setItem('users', str);
    // DisplayInfo();

//      userArray.sort(function(a, b){
//     let x = a.name.toLowerCase();
//     let y = b.name.toLowerCase();
//     if (x < y) {return -1;}
//     if (x > y) {return 1;}
//     return 0;
//   });
}
DisplayInfo();
function DisplayInfo() {
    // location.reload();
    let statement = '';
   
    userArray.forEach((user, i) => {
        statement += `<tr>
                                <th scope="row">${i + 1}</th>
                                <td>${user.name}</td>
                                <td><i class="btn text-white btn-info fa fa-edit mx-2 "onclick='EditInfo(${i})'></i> <i
                                        class="btn text-white btn-danger fa fa-trash"onclick='DeleteInfo(${i})'></i></td>

                            </tr>`;
    });
    recordDisplay.innerHTML = statement; 
//    

}

function EditInfo(id) {
    edit_id = id;
    usernameTextfield.value = userArray[id].name;
    adduserbtn.innerText = 'Save Changes';
}
function DeleteInfo(id) {
    userArray.splice(id, 1);
    SaveInfo(userArray);
    DisplayInfo();
}
// DisplayInfo();

const alltr = document.getElementById('records tr');
//  console.log(alltr);
const searchInputField = document.querySelector('#search');

/*-------------------------SearchField-----------------------------*/

searchInputField.addEventListener('input', function (e) {
    console.log(e.target.value.toLowerCase());
    const searchStr = e.target.value.toLowerCase();
    recordDisplay.innerHTML = '';

    userArray.forEach((user, i) => {
        // console.log(i + 1);
        //  const td_in_tr = tr.querySelectorAll('td');

        if (user.name.toLowerCase().indexOf(searchStr) > -1) {
            let statement = '';
            console.log(i + 1);
            statement = `<tr>
                                <th scope="row">${i + 1}</th>
                                <td>${user.name}</td>
                                <td><i class="btn text-white btn-info fa fa-edit mx-2 "onclick='EditInfo(${i})'></i> <i
                                        class="btn text-white btn-danger fa fa-trash"onclick='DeleteInfo(${i})'></i></td>

                        </tr>`;


            // recordDisplay.innerHTML=statement; 
            //    recordDisplay.appendChild(statement);

            // recordDisplay.insertAdjacentHTML("beforeend", statement);
            recordDisplay.innerHTML += statement;
        }
    });
    if (recordDisplay.innerHTML == '') {
        recordDisplay.innerHTML = 'NO Records Found';
    }

});

/*-----------------------------------pagination-------------------------*/

const total_records_tr = document.querySelectorAll("#records tr");
let records_per_page = 6;
let page_number = 1;
const total_records = total_records_tr.length;
// console.log(total_records_tr);

let total_page = Math.ceil(total_records / records_per_page);
generatePage();
DisplayRecords();
function DisplayRecords() {
    recordDisplay.innerHTML ='';
    let start_index = (page_number - 1) * records_per_page;
    let end_index = start_index + (records_per_page - 1);
    if (end_index >= total_records)
        end_index = total_records - 1;
    let statement = '';
    for (let i = start_index; i <= end_index; i++) {
        statement += `<tr>${total_records_tr[i].innerHTML}</tr>`;
    }
    recordDisplay.innerHTML += statement;

    document.querySelectorAll('.dynamic-item').forEach(item => {
        item.classList.remove('active');
    })
    document.getElementById(`page${page_number}`).classList.add('active');
    if (page_number == 1) {
        document.getElementById('prevBtn').parentElement.classList.add('disabled');
    }
    else
        document.getElementById('nextBtn').parentElement.classList.remove('disabled');
    if (page_number == total_page) {
        document.getElementById('nextBtn').parentElement.classList.add('disabled');
    }
    else
        document.getElementById('prevBtn').parentElement.classList.remove('disabled');
    document.getElementById('page-details').innerHTML = `Showing ${start_index + 1} to ${end_index + 1} of ${total_records}`;

}
function generatePage() {
    let prevBtn = ` <li class="page-item">
                            <a class="page-link" id="prevBtn" onclick="prevBtn()" href="javascript:void(0)" >Previous</a>
                        </li>`;
    let nextBtn = `  <li class="page-item">
                            <a class="page-link" id="nextBtn" onclick="nextBtn()" href="javascript:void(0)">Next</a>
                        </li>`;


    let buttons = '', activeClass = '';
    for (let i = 1; i <= total_page; i++) {
        if (i == 1)
            activeClass = 'active';
        else
            activeClass = ''
        buttons += `<li class="dynamic-item page-item ${activeClass} "id="page${i}"><a class="page-link" href="javascript:void(0)">${i}</a></li>`;
    }
    document.getElementById('pagination').innerHTML = `${prevBtn} ${buttons} ${nextBtn}`;


}


function prevBtn() {

    page_number--;
    DisplayRecords();
    console.log(page_number);
}
function nextBtn() {

    page_number++;
    DisplayRecords();
    // console.log(page_number);
}
record_size.addEventListener('change',function(e){
    console.log(5);
    records_per_page=parseInt(records_size.value);
    total_page=Math.ceil(total_records/records_per_page);
    page_number=1;
    generatePage();
    DisplayRecords();
})
