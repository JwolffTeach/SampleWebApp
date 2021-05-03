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

/*
    The code snippet below will show all options in our data list when you click the drop down.
    Solution from https://stackoverflow.com/a/42187207

*/

$('input').on('click', function() {
    $(this).attr('placeholder',$(this).val());
  $(this).val('');
});
$('input').on('mouseleave', function() {
  if ($(this).val() == '') {
    $(this).val($(this).attr('--Filter--'));
  }
});


/*
    Searchable Dropdown menu code. From JQuery documentation: https://jqueryui.com/autocomplete/#combobox

*/

$( function() {
    $.widget( "custom.combobox", {
      _create: function() {
        this.wrapper = $( "<span>" )
          .addClass( "custom-combobox" )
          .insertAfter( this.element );
 
        this.element.hide();
        this._createAutocomplete();
        this._createShowAllButton();
      },
 
      _createAutocomplete: function() {
        var selected = this.element.children( ":selected" ),
          value = selected.val() ? selected.text() : "";
 
        this.input = $( "<input>" )
          .appendTo( this.wrapper )
          .val( value )
          .attr( "title", "" )
          .addClass( "custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left" )
          .autocomplete({
            delay: 0,
            minLength: 0,
            source: $.proxy( this, "_source" )
          })
          .tooltip({
            classes: {
              "ui-tooltip": "ui-state-highlight"
            }
          });
 
        this._on( this.input, {
          autocompleteselect: function( event, ui ) {
            ui.item.option.selected = true;
            this._trigger( "select", event, {
              item: ui.item.option
            });
          },
 
          autocompletechange: "_removeIfInvalid"
        });
      },
 
      _createShowAllButton: function() {
        var input = this.input,
          wasOpen = false;
 
        $( "<a>" )
          .attr( "tabIndex", -1 )
          .attr( "title", "Show All Items" )
          .tooltip()
          .appendTo( this.wrapper )
          .button({
            icons: {
              primary: "ui-icon-triangle-1-s"
            },
            text: false
          })
          .removeClass( "ui-corner-all" )
          .addClass( "custom-combobox-toggle ui-corner-right" )
          .on( "mousedown", function() {
            wasOpen = input.autocomplete( "widget" ).is( ":visible" );
          })
          .on( "click", function() {
            input.trigger( "focus" );
 
            // Close if already visible
            if ( wasOpen ) {
              return;
            }
 
            // Pass empty string as value to search for, displaying all results
            input.autocomplete( "search", "" );
          });
      },
 
      _source: function( request, response ) {
        var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
        response( this.element.children( "option" ).map(function() {
          var text = $( this ).text();
          if ( this.value && ( !request.term || matcher.test(text) ) )
            return {
              label: text,
              value: text,
              option: this
            };
        }) );
      },
 
      _removeIfInvalid: function( event, ui ) {
 
        // Selected an item, nothing to do
        if ( ui.item ) {
          return;
        }
 
        // Search for a match (case-insensitive)
        var value = this.input.val(),
          valueLowerCase = value.toLowerCase(),
          valid = false;
        this.element.children( "option" ).each(function() {
          if ( $( this ).text().toLowerCase() === valueLowerCase ) {
            this.selected = valid = true;
            return false;
          }
        });
 
        // Found a match, nothing to do
        if ( valid ) {
          return;
        }
 
        // Remove invalid value
        this.input
          .val( "" )
          .attr( "title", value + " didn't match any item" )
          .tooltip( "open" );
        this.element.val( "" );
        this._delay(function() {
          this.input.tooltip( "close" ).attr( "title", "" );
        }, 2500 );
        this.input.autocomplete( "instance" ).term = "";
      },
 
      _destroy: function() {
        this.wrapper.remove();
        this.element.show();
      }
    });
 
    $( "#combobox" ).combobox();
    $( "#toggle" ).on( "click", function() {
      $( "#combobox" ).toggle();
    });
  } );