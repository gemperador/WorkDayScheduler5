// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
//$(function () {
    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    //
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.
 // });

 $(document).ready(function() {
  // Display the current day at the top of the calendar
  const currentDay = textmoment().format('dddd, MMMM D, YYYY');
  $('#currentDay').text(currentDay);

  // Business hours from 9 AM to 5 PM
  const businessHours = [
    { time: '9AM', hour: 9 },
    { time: '10AM', hour: 10 },
    { time: '11AM', hour: 11 },
    { time: '12PM', hour: 12 },
    { time: '1PM', hour: 13 },
    { time: '2PM', hour: 14 },
    { time: '3PM', hour: 15 },
    { time: '4PM', hour: 16 },
    { time: '5PM', hour: 17 },
  ];

  // Generate time blocks
  businessHours.forEach(({ time, hour }) => {
    const currentHour = dayjs().hour();

    let timeBlockClass = '';
    if (hour < currentHour) {
      timeBlockClass = 'past';
    } else if (hour === currentHour) {  
      timeBlockClass = 'present';
    } else {
      timeBlockClass = 'future';
    }

    const timeBlock = `
      <div id="hour-${hour}" class="row time-block ${timeBlockClass}">
        <div class="col-2 col-md-1 hour text-center py-3">${time}</div>
        <textarea class="col-8 col-md-10 description" rows="3"></textarea>
        <button class="btn saveBtn col-2 col-md-1" aria-label="save">
          <i class="fas fa-save" aria-hidden="true"></i>
        </button>
      </div>
    `;

    $('.container-fluid').append(timeBlock);
  });

  // Load saved events from local storage
  businessHours.forEach(({ hour }) => {
    const savedEvent = localStorage.getItem(`event-${hour}`);
    if (savedEvent) {
      $(`#hour-${hour} .description`).val(savedEvent);
    }
  });

  // Save event to local storage
  $('.container-fluid').on('click', '.saveBtn', function() {
    const hour = $(this).parent().attr('id').split('-')[1];
    const event = $(this).siblings('.description').val();
    localStorage.setItem(`event-${hour}`, event);
  });
});
