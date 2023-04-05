//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton() {
    console.log($('#navbarPlaceholder').load('/frame/nav.html'));
    console.log($('#footerPlaceholder').load('/frame/footer.html'));
    console.log($('#headerPlaceholder').load('/frame/header.html'));
}
loadSkeleton();  //invoke the function