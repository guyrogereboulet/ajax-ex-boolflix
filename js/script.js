// API Key : 2497798e40ab8a3da50f2eb1da517d7c

// Milestone 1:
// Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il  bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
// 1.	Titolo
// 2.	Titolo Originale
// 3.	Lingua
// 4.	Voto

// "title": "Ritorno al futuro",
// "original_title": "Back to the Future",
// "original_language": "en",
// "vote_average": 8.2,

// Milestone 2:
// Trasformiamo il voto da 1 a 10 decimale in un numero intero da 1 a 5, così da permetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5, lasciando le restanti vuote (troviamo le icone in FontAwesome).
// Arrotondiamo sempre per eccesso all’unità successiva, non gestiamo icone mezze piene (o mezze vuote :P)
// Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera della nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera della nazione ritornata dall’API (le flag non ci sono in FontAwesome).


// Esempio richiesta AJAX
// {
//             "popularity": 24.954,
//             "vote_count": 12242,
//             "video": false,
//             "poster_path": "/zDXSE5xNzqD55w3bJjFXm9ct5aq.jpg",
//             "id": 105,
//             "adult": false,
//             "backdrop_path": "/x4N74cycZvKu5k3KDERJay4ajR3.jpg",
//             "original_language": "en",
//             "original_title": "Back to the Future",
//             "genre_ids": [
//                 12,
//                 35,
//                 878,
//                 10751
//             ],
//             "title": "Ritorno al futuro",
//             "vote_average": 8.2,
               // "overview": "Marty McFly è stato catapultato per errore nel 1955, grazie alla macchina del tempo ideata dal suo amico scienziato Doc. Non avendo più \"carburante\" per poter tornare nel futuro si rivolge alla versione più giovane di Doc, che nonostante l'incredulità iniziale si farà in quattro per aiutarlo. Ma nel 1955 non è solo Doc ad essere più giovane, Marty infatti si imbatte casualmente nei suoi genitori, all'epoca teenager, ma l'incontro aggiungerà altri problemi.",
//             "release_date": "1985-07-03"
//         },


$(document).ready(function(){
  $(".send-button").click(function () {
     var query = $(".send-text").val();
     resetSearch();
     getMovies(query);
  });



});

// FUNCTIONS //
function getMovies(string) {
  var api_Key = "2497798e40ab8a3da50f2eb1da517d7c";
  var url = "https://api.themoviedb.org/3/search/movie";
  $.ajax({
    url: url,
    method: "GET",
    data: {
      api_key: api_Key,
      query: string,
      language:"it-IT"

    },
    success: function(data) {
      // Controllo che ci siano risultati
      if (data.total_results > 0) {
        var films = data.results;
        printFilms(films);
      }
      else {
        resetSearch()
        printNoResult();
      }

    },
    error: function (request,state,errors) {
      console.log(errors);
    }
  });
}



function printFilms(films) {
  var source = $("#film-template").html();
  var template = Handlebars.compile(source);

    for (var i = 0; i < films.length; i++) {
      var thisFilm = films[i];
      // console.log(thisFilm);
      var flag = thisFilm.original_language;

      var context = {

        title: thisFilm.title,
        original_title : thisFilm.original_title,
        original_language : 'img/' +flag + '.png',

        specialChars: printStars(thisFilm.vote_average)
      }
      var html = template(context);
      $(".covers").append(html);
    }


}

function resetSearch() {
    $(".covers").html("");
    $(".send-text").val("");
}

function printNoResult() {
  var source = $("#no-results").html();
  var template = Handlebars.compile(source);
  var html = template();
  $(".covers").append(html);
}

function printStars(vote) {
  var voteBis = Math.round(vote/2);
  var star = "";
  for (var i = 1; i <= 5; i++) {
    if (i <= voteBis){
      var singleStar = '<i class="fas fa-star"></i>';
    } else {
      var singleStar = '<i class="far fa-star"></i>';
    }
    star += singleStar;
  }
  return star;
}
