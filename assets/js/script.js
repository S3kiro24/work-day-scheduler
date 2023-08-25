$(function () {
    // Display current day
    var currentDayEl = $("#currentDay");
    currentDayEl.text(dayjs().format("dddd, MMMM D"));
  
    // Save event to local storage
    $(".saveBtn").on("click", function () {
      var timeblockId = $(this).parent().attr("id");
      var eventText = $(this).siblings(".description").val();
      localStorage.setItem(timeblockId, eventText);
    });
  
    // Apply past, present, or future classes based on current time
    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);
      var currentHour = dayjs().hour();
  
      if (blockHour < currentHour) {
        $(this).addClass("past").removeClass("present future");
      } else if (blockHour === currentHour) {
        $(this).addClass("present").removeClass("past future");
      } else {
        $(this).addClass("future").removeClass("past present");
      }
    });
  
    // Load saved events from local storage
    $(".time-block").each(function () {
      var timeblockId = $(this).attr("id");
      var savedEvent = localStorage.getItem(timeblockId);
  
      if (savedEvent) {
        $(this).find(".description").val(savedEvent);
      }
    });
  });
  