const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;

// Save selected movie price and index
function setMovieData(movieIndex,moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}



// Update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map(function(seat) {
        return [...seats].indexOf(seat)
    });

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex)); // LOCAL STORAGE
    
    const selectedCount = selectedSeats.length;
    count.innerText = selectedCount;
    total.innerText = selectedCount * ticketPrice;
}

// gET data from local storage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    

    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }  
    
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}


// Movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    // lOCAL STORAGE
    setMovieData(e.target.selectedIndex, e.target.value);


    updateSelectedCount();
} )

// Seat click event
container.addEventListener('click', (e) => {
    //console.log(e.target); // - To see what is clicked

    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
    
    
        updateSelectedCount();
    }

});

// initial count and total count
updateSelectedCount();
