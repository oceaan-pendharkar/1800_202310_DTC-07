//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton() {
    console.log($('#navbarPlaceholder').load('./frame/nav.html'));
    console.log($('#footerPlaceholder').load('./frame/footer.html'));
    console.log($('#informationPlaceholder').load('./messageTab/information.html'));
    console.log($('#seekHelpPlaceholder').load('./messageTab/seekHelp.html'));
}
loadSkeleton();  //invoke the function