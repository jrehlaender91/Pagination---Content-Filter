// Global variables
const studentContainer = document.querySelector(".student-list");
const paginationList = document.querySelector(".link-list");
const search = document.querySelector("#search");
const studentsPerPage = 9;
let currentList = data; 


search.addEventListener("keyup", (e) => {
   const newList = [];
   const userInput = e.target.value.toLowerCase();

   for(let i = 0; i < data.length; i++) {
      const studentName = data[i].name.first.concat(" ", data[i].name.last).toLowerCase();

      if(studentName.includes(userInput)) {
         newList.push(data[i]);
      }
   }

   if(newList.length > 0) {
      currentList = newList;
      addPagination(currentList);
      showPage(currentList, 1);
   } else {
      const message = '<h3>No results found...</h3>';
      studentContainer.innerHTML = message;
      paginationList.innerHTML = "";
   }
});


/* This function will handle calculating how many and which
authors to show on the current page and dynamically add them */

function showPage(list, page) {
   const firstStudent = (page * studentsPerPage) - studentsPerPage;
   const lastStudent = (page * studentsPerPage) - 1;
   studentContainer.innerHTML = "";  

   for(let i = 0; i < list.length; i++) {
      if(i <= lastStudent && i >= firstStudent) {
         const studentList = `
         <li class="student-item cf">
            <div class="student-details">
            <img class="avatar" src="${list[i].picture.thumbnail}" alt="Profile Picture">
            <h3>${list[i].name.first} ${list[i].name.last}</h3>
            <span class="email">${list[i].email}</span>
            </div>
            <div class="joined-details">
            <span class="date">Joined ${list[i].registered.date}</span>
            </div>
         </li>`;
         studentContainer.insertAdjacentHTML("beforeend", studentList);
      }
   }
 }


/*
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list) {
   const numberOfPages = Math.ceil(list.length / studentsPerPage);
   paginationList.innerHTML = "";

   for(let i = 0; i < numberOfPages; i++) {
      let pageButton = `
      <li>
         <button type="button">${i+1}</button>
      </li>`;
      paginationList.insertAdjacentHTML("beforeend", pageButton);
   }
   paginationList.querySelector('.link-list li:first-child button').classList.add('active');
}


/* This event listener will handle calling our function
above to change the page & add the `active` class  */

paginationList.addEventListener("click", (e) => {
   const active = document.querySelector('.active');

   if(e.target.closest("button")) {
      active.classList.remove('active');
      e.target.closest("button").classList.add('active');
      showPage(currentList, e.target.innerHTML);
   }
});

/* These function calls are needed to initialize the page */
addPagination(data);
showPage(data, 1);


