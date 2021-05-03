// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

"use strict";

function showBooks() {

    fetch("js/books.json")
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        generateBooks(data["Books"]);
    });

    function generateBooks(book_data) {
        book_data.forEach (function(book) {
            makeBook(book);
        });
    }
    
    
    function makeBook(book) {
        const base_html = 
        `
        <div class="book-img">
            <a href="#" class="book-img-link"><img src="img/books/${book.image}.png"></img></a>
        </div>
        <div class="book-info">
            <div class="book-title">
                <a href="#" class="book-link">${book.title}</a>
            </div>
            <div class="book-author">
                By <a href="#" class="author-link">${book.author}</a>
            </div>
            <div class="book-rating">
                <div id="${book.title}-stars" class="stars">
                </div>
            </div>
        </div>
        `;
        const star_full = `<i class="fas fa-star"></i>`
        const star_half = `<i class="fas fa-star-half-alt"></i>`
        const star_empty = `<i class="far fa-star"></i>`
    
        var bookTitlesSection = document.getElementById("book-titles")
        var div = document.createElement("div");

        div.className="book";
        div.innerHTML = base_html;
        bookTitlesSection.appendChild(div);

        const stars = document.getElementById(`${book.title}-stars`);

        // Add full stars until we either have a remainder (half star) or no more stars (empty star).
        for(let i=0; i < 5; i++) {
            let newStar = document.createElement("i");
            if(book.rating - i > 1)
                generateStar(newStar, "full-star");
            else if (book.rating - i > 0)
                generateStar(newStar, "half-star");
            else 
                generateStar(newStar, "empty-star");
        }

        function generateStar(starElement, starType) {
            if(starType == "full-star")
                starElement.innerHTML = star_full;
            if(starType == "half-star")
                starElement.innerHTML = star_half;
            if(starType == "empty-star")
                starElement.innerHTML = star_empty;
            starElement.classList.add(starType);
            stars.appendChild(starElement);
        }
    }


}