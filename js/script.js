
/*** 
   GLOBAL VARIABLES
***/

let fullList = $('.student-list').children()
let list = [];

/*** 
   showPage function that shows 10 students per page.
***/

const showPage = (list, page) => {
   let pagination = (page-1)*(10);
   let min = pagination;
   let max = pagination + 9;

   $(list).each(function(index) {
      
      if (index >= min && index <= max) {
         $(this).show();
      } else {
         $(this).hide();
      }
   })
};

/*** 
   appendPageLinks function that creates pagination depending on the number of students.
***/

let appendPageLinks = (list) => {
   let pages = Math.ceil(list.length/ 10);
   
   $(".pagination").empty();

   for(let i = 0; i < pages; i++) {
      $('.pagination').append(`<li><a>${i+1}</a></li>`);
   }
   $(".pagination li:first-child a").addClass("active");
   let primero = $('.pagination li:first-child');
   showPage(list, 1);

   $('.pagination li a').click(function() {
      $('.pagination li a').each(function(index) {
         $(this).removeClass("active")
      })
      showPage(list, $(this).text());
      $(this).addClass("active")
   });
};



/*** 
   Input and Button functionality
***/

$('.student-search').children().on("click keyup", function(e) {
   let search = $('.student-search input').val().toLowerCase();
   let count = 0;
   let countS = 0;
   list = [];

   if(search === "") {
      showPage(fullList, 1);
      appendPageLinks(fullList);
      $('h1').hide();
   } else {
      $('.student-item').each(function(index) {
         if ($(this).children().children()[1].innerHTML.includes(search)) {  
            $(this).show(); 
            list.push($(this));
         } else {
            $(this).hide();
            count++;
            console.log(count)
               if(count === 54) {
                  $('h1').show();
               } else {
                  $('h1').hide();
               }
         }
      }) 
      appendPageLinks(list);
   }     
});

appendPageLinks(fullList);

