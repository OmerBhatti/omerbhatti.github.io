$("body").css("overflow", "hidden");
document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
     $(".loader-wrapper").fadeOut("slow");
     $("body").css("overflow", "auto");
  }
};