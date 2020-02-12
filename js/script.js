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


// Milestone 3:
// In questa milestone come prima cosa aggiungiamo la copertina del film o della serie al nostro elenco. Ci viene passata dall’API solo la parte finale dell’URL, questo perché poi potremo generare da quella porzione di URL tante dimensioni diverse. Dovremo prendere quindi l’URL base delle immagini di TMDB: https://image.tmdb.org/t/p/ per poi aggiungere la dimensione che vogliamo generare (troviamo tutte le dimensioni possibili a questo link: https://www.themoviedb.org/talk/53c11d4ec3a3684cf4006400) per poi aggiungere la parte finale dell’URL passata dall’API.
// Esempio di URL che torna la copertina di BORIS:
// https://image.tmdb.org/t/p/w185/s2VDcsMh9ZhjFUxw77uCFDpTuXp.jpg

// Milestone 4:
// Trasformiamo quello che abbiamo fatto fino ad ora in una vera e propria webapp, creando un layout completo simil-Netflix:
// •	Un header che contiene logo e search bar
// •	Dopo aver ricercato qualcosa nella searchbar, i risultati appaiono sotto forma di “card” in cui lo sfondo è rappresentato dall’immagine di copertina (consiglio la poster_path con w342)
// •	Andando con il mouse sopra una card (on hover), appaiono le informazioni aggiuntive già prese nei punti precedenti più la overview




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
     getResults(query);
  });

  $(".send-text").keypress(function(event){
    if (event.which == 13) {
      var query = $(".send-text").val();
      resetSearch();
      getResults(query);
    }
  });

});

// FUNCTIONS //
function getResults(string) {
  //AJAX  Films
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

  //AJAX  SerieTV
  var api_key = "2497798e40ab8a3da50f2eb1da517d7c";
  var url = "https://api.themoviedb.org/3/search/tv";
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
        var series = data.results;
        printSeries(series);
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


//  Stampa Films
function printFilms(films) {
  var source = $("#film-template").html();
  var template = Handlebars.compile(source);

    for (var i = 0; i < films.length; i++) {
      var thisFilm = films[i];
      // console.log(thisFilm);
      var flag = thisFilm.original_language;
      var thumbnail = thisFilm.poster_path;

      var context = {

        title: thisFilm.title,
        original_title : thisFilm.original_title,
        original_language : printLanguage(flag),
        specialChars: printStars(thisFilm.vote_average),
        poster_path: printThumbnail(thumbnail),
        overview: thisFilm.overview

      }
      var html = template(context);
      $(".covers").append(html);
    }


}



//  Stampa Thumbnail
function printThumbnail(thumbnail) {
  var poster = 'img/not_available.png';
  if (thumbnail) { //quindi non è null
    poster = 'https://image.tmdb.org/t/p/w342' + thumbnail;
  }
  return poster;
}




//  Stampa Series
function printSeries(series) {
  var source = $("#series-template").html();
  var template = Handlebars.compile(source);

    for (var i = 0; i < series.length; i++) {
      var thisSerie = series[i];
      // console.log(thisFilm);
      var flag = thisSerie.original_language;
      var thumbnail = thisSerie.poster_path;

      var context = {

        name: thisSerie.name,
        original_name : thisSerie.original_name,
        original_language : printLanguage(flag),
        poster_path: printThumbnail(thumbnail),
        overview: thisSerie.overview

      }
      var html = template(context);
      $(".covers").append(html);
    }


}

//  Resetta la ricerca
function resetSearch() {
    $(".covers").html("");
    $(".send-text").val("");
}

//  Stampa nessun risultato
function printNoResult() {
  var source = $("#no-results").html();
  var template = Handlebars.compile(source);
  var html = template();
  $(".covers").append(html);
}

//  Stampa le stelle
function printStars(vote) {
  var voteBis = Math.round(vote/2);
  var star = "";
  for (var i = 1; i <= 5; i++) {
    if (i <= voteBis){
      var singleStar = '<i class="fas fa-star yellow"></i>';
    } else {
      var singleStar = '<i class="far fa-star yellow"></i>';
    }
    star += singleStar;
  }
  return star;
}

//  Stampa le lingue
function printLanguage(string) {
  var availablelangs = ["it", "de", "es", "uk", "fr", "en"];
  if (availablelangs.includes(string)) {

    string ='<img class="flag" src="img/' + string  +'.png" alt="">'
  }
  return string;
}
