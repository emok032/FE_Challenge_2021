$(document).ready(function () {

  let toggleSelected = "#email-toggle";

  const submitSearch = () => {
    /**
       * Makes a request to ltv API to search an specific email address.
       * If there's a response, it gets stored in the local storage and redirects to results page
       */
      event.preventDefault();
      localStorage.clear(); //Clears storage for next request
      let type = toggleSelected === "#email-toggle" ? "email" : "phone";
      
      var x;
      // Email Input Validation
      if(type === "email") {
        $("#search-box").attr("placeholder", "Enter an Email Address");
        $(".error-msg").text("Please enter a valid email address");
        typeInput = $('input[type="text"]').val().toLowerCase();
    
        regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (typeInput.match(regEx)) {
          x = true;
        } else {
          x = false;
        }
      }

      // Phone Number Input Validation
      if(type === "phone") {
        $("#search-box").attr("placeholder", "Enter a Phone Number");
        $(".error-msg").text("Please enter a valid phone number");
        typeInput = $('input[type="text"]').val();
    
        regEx = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/g;
        if (typeInput.match(regEx)) {
          x = true;
        } else {
          x = false;
        }
      }

      if (x === true) {
        // When search is submitted, hide content while displaying the spinner
        $("#content").addClass("hidden");
        $("#spinner").removeClass("hidden");

        document.querySelector('input[type="text"]').parentNode.classList.remove("error");
        const proxyurl = "";
        const url =
          `https://ltv-data-api.herokuapp.com/api/v1/records.json?${type}=` + typeInput;
        fetch(proxyurl + url)
          .then((response) => response.text())
          .then(function (contents) {
            localStorage.setItem("userObject", contents);
            window.location.href = "result.html";
          })
          .catch((e) => console.log(e));
      } else if (x !== true) {
        document.querySelector('input[type="text"]').parentNode.classList.add("error");
      }
  }

  $("#btn-search").on("click", function (e) {
    submitSearch();
  });

  $('input[type="text"]').keypress(function (event) {
    keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
      submitSearch();
    }
  });

  const activateToggle = (toggleClass, buttonOn, buttonOff) => {
    if(toggleClass.indexOf("btn-toggle-off") > -1) {
      toggleSelected = buttonOn;
      $(buttonOn).addClass("btn-toggle-on");
      $(buttonOn).removeClass("btn-toggle-off");

      $(buttonOff).addClass("btn-toggle-off");
      $(buttonOff).removeClass("btn-toggle-on");
    }
  }

  $("#email-toggle").on("click", function (e) {
    e.preventDefault();
    var toggleClass = $('#email-toggle').attr('class');
    activateToggle(toggleClass, "#email-toggle", "#phone-toggle");
  });

  $("#phone-toggle").on("click", function (e) {
    e.preventDefault();
    var toggleClass = $('#phone-toggle').attr('class');
    activateToggle(toggleClass, "#phone-toggle", "#email-toggle");
  });

});
