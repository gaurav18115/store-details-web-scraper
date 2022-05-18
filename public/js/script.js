$(document).ready(function () {

   var search = "";
   var city = "";

   $("#search").keyup(function() {
      search = $(this).val();
   });

   $("#city").keyup(function() {
      city = $(this).val();
   });

   $('#results').hide();


   $("#submit").click(function () {

      if (search.trim().length == 0) {
         alert("Enter search");
         return;
      }

      $.get("/api/getCompanyDetails",
         {
            ss: search,
            city: city
         },
         function (resp, status) {

         var trHTML = '';
         $.each(resp.data, function (i, item) {
               trHTML +=   '<tr>' + 
                              '<td class="border border-slate-300 p-2 text-slate-500">' + i + '</td>'+ 
                              '<td class="border border-slate-300 p-2 text-slate-500">' + item.name + '</td>'+
                              '<td class="border border-slate-300 p-2 text-slate-500">' + item.address + '</td>'+
                              '<td class="border border-slate-300 p-2 text-slate-500">' + item.city + '</td>'+ 
                              '<td class="border border-slate-300 p-2 text-slate-500">' + item.phone + '</td>'+
                           '</tr>';
         });
         $('#table-body').empty();
         $('#table-body').append(trHTML);
         $('#results').show();

         });
   });



 });