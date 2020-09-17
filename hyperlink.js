// set each image as a hyperlink to seperate window
function addHyperLink() {

    // Create new html with an anchor that wraps the original thumbnail html
    var containers = document.querySelectorAll(".column");
    for (var i = 0; i < containers.length; i++) {
        var img = containers[i].querySelector(".img-fluid")
        var html = '<a target="_blank" href="';
        html += img.src;
        html += '">';
        html += containers[i].innerHTML;
        html += '</a>';
        containers[i].innerHTML = html;
    }

}

addHyperLink();
