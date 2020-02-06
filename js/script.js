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
    var query = "Ritorno al futuro";
    var newQuery = $(".send-text").val();
    $.ajax({
      url: "https://api.themoviedb.org/3/search/movie",
      method: "GET",
      data: {
        api_key: "2497798e40ab8a3da50f2eb1da517d7c",
        query: newQuery,
        language:"it-IT"

      },
      success: function(data) {
        console.log(data);
        var films = data.results;

        console.log(films);
        printFilms(films);

      },
      error: function (request,state,errors) {
        console.log(errors);
        alert("Nessun risultato trovato, riprova");
      }
    });
  });

});

// FUNCTIONS //
function printFilms(films) {
  var source = $("#film-template").html();
  var template = Handlebars.compile(source);

  $(".covers").html(""); //Cancello l'HTML della ricerca precedente
  if (films.length == 0) {
    alert("Nessun risultato trovato, riprova");
  }

  else {
    for (var i = 0; i < films.length; i++) {
      var thisFilm = films[i];
      console.log(thisFilm);


      var context = {

        title: thisFilm.title,
        original_title : thisFilm.original_title,
        original_language : thisFilm.original_language,
        vote_average: thisFilm.vote_average

      }
      var html = template(context);
      $(".covers").append(html);
    }

  }


}
