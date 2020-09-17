/* Copyright 2020 Kieran Sukachevin - All rights reserved. */

// Specify the Thumbnail class and its properties
function Thumbnail (container, x, y) {
    this.container = container;
    this.image = null;
    this.x = x;
    this.y = y;
    this.init();
}

Thumbnail.prototype.init = function () {
    // Retrieve the thumbnail
    let img = this.container.querySelector('.thumbnail');

    // Create new html with an anchor that wraps the original thumbnail html
    let html = '<a target="_blank" href="';
    html += img.src;
    html += '" title="';
    html += img.alt;
    html += '">';
    html += this.container.innerHTML;
    html += '</a>';
    
    // Set new thumbnail html for container and assign the image property
    this.container.innerHTML = html;
    this.image = img;
};

Thumbnail.prototype.getWidth = function () {
     return this.container.clientWidth;
};

Thumbnail.generateDelta = function () {
    // Create value for the max displacement
    const MAX_DELTA = 10;

    // Create random value that is less than the max displacement
    let delta = Math.round(MAX_DELTA * Math.random());
    // Randomly set delta to a negative displacement
    if (Math.round(Math.random()) == 0) {
        delta *= -1;
    }

    return delta;
};

Thumbnail.prototype.move = function () {
    // Generate an x and y displacement
    let xDelta = Thumbnail.generateDelta();
    let yDelta = Thumbnail.generateDelta();

    // Varify x and y are greater than 0
    this.x = Math.max(this.x + xDelta, 0);
    this.y = Math.max(this.y + yDelta, 0);

    // Set thumbnails position to the x and y
    this.container.style.left = this.x + 'px';
    this.container.style.top = this.y + 'px';
}

/*
 * Initializes the thumbnails 
 */
function initThumbnails () {
    // Retrieve the thumbnail containers and create corresponding thumbnails
    let thumbnails = [];
    let thumbnailContainers = document.querySelectorAll('.thumbnailContainer');
    let x = 0;
    let y = 0;

    // Create a thumbnail for each image and set its initial x and y positioning
    for (let i = 0; i < thumbnailContainers.length; i++) {
        let container = thumbnailContainers[i];
        let thumbnail = new Thumbnail(container, x, y);
        let width = thumbnail.getWidth();
        thumbnails.push(thumbnail);
        x += width / 2;
        y += width / 4;
    }

    return thumbnails;
}

function moveThumbnails (thumbnails) {
    // Set each thumbnails x and y to a new x and y
    for (let i = 0; i < thumbnails.length; i++) {
        let thumbnail = thumbnails[i];
        thumbnail.move();
    }
}

function handlePageLoad () {
    // Create array of initialized thumbnails
    let thumbnails = initThumbnails();

    // Position of the thumbnails is repeatedly updated 
    window.setInterval(function () {
        moveThumbnails(thumbnails);
    }, 250);
}

// Initialize thumbnails when page loads
window.addEventListener('load', handlePageLoad);
