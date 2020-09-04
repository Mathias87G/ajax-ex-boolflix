// Milestone 3:
// In questa milestone come prima cosa aggiungiamo la copertina del film o della serie
// al nostro elenco. Ci viene passata dall’API solo la parte finale dell’URL, questo
// perché poi potremo generare da quella porzione di URL tante dimensioni diverse.
// Dovremo prendere quindi l’URL base delle immagini di TMDB:
// https://image.tmdb.org/t/p/ per poi aggiungere la dimensione che vogliamo generare
// (troviamo tutte le dimensioni possibili a questo link:
// https://www.themoviedb.org/talk/53c11d4ec3a3684cf4006400) per poi aggiungere la
// parte finale dell’URL passata dall’API.
// Esempio di URL che torna la copertina di BORIS:
// https://image.tmdb.org/t/p/w185/s2VDcsMh9ZhjFUxw77uCFDpTuXp.jpg

$(document).ready(function(){
  // Funzione click tasto ricerca
  $('#title-search').click(function(){
    reset();
    init();

  });
  // Richiamo funzione tastiera
  $('#title').keydown(keyboard);
});

// funzione init
function init(){
  var url1 = 'https://api.themoviedb.org/3/search/movie'
  var url2 = 'https://api.themoviedb.org/3/search/tv'
  ricerca(url1, 'Film');
  ricerca(url2, 'Tv');
}

// Funzione con ajax e Handlebars per la ricerca di film e la compilazione dell'HTML
function ricerca(url, type){
  var query = $('#title').val();
  // Ajax
  $.ajax(
    {
      url: url,
      method: 'GET',
      data: {
        api_key: '72dc32a32f51c244d20fcafee0b12798',
        query: query,
        language: 'it-IT'
      },
      success: function(risposta){
        print(risposta, type);
        $('#title').val('');
      },
      // errore
      error: function(){
        alert('Errore');
      }
    }
  )
}

// funzione print per compilazione html
function print(data, type){
  var results = data.results;
  // Handlebars
  var source = $('#film-template').html();
  var template = Handlebars.compile(source);
  for (var i = 0; i < results.length; i++) {
    if (type == 'Film') {
      titolo = results[i].title;
      originalTitle = results[i].original_title;
      console.log(results[i].poster_path);
    } else if (type == 'Tv') {
      titolo = results[i].name;
      originalTitle = results[i].original_name;
      console.log(results[i].poster_path);
    }
    var context = {
      name: titolo,
      originalName: originalTitle,
      language: flags(results[i].original_language),
      vote: stars(results[i].vote_average),
      type: type,
      img: img(results[i].poster_path),
      overview: results[i].overview
    };
    var html = template(context);
    $('.movie-ctr').append(html);
  }
}

// Funzione per tasto Invio sulla ricerca
function keyboard(){
  if (event.which == 13 || event.keyCode == 13) {
    reset();
    init();

  }
}

// funzione stelle
function stars(num){
  var num = Math.ceil(num / 2);
  var resto = num % 2;
  var somma = '';
  for (var i = 0; i < 5; i++) {
    if (i < num){
      var star = '<i class="fas fa-star"></i>';
    } else if (resto != 0){
      var star = '<i class="fas fa-star-half-alt"></i>';
      resto = 0;
    } else {
      var star = '<i class="far fa-star"></i>';
    }
    somma += star;
  }
  return somma;
}

// funzione flags
function flags(data){
  if (data == "en") {
    return '<img class="flag" src="img/en.png" alt="flag eng">';
  } else if (data == "it") {
    return '<img class="flag" src="img/it.png" alt="flag ita">';
  }
  return data;
}

function img(data){
  if (data != null) {
    return 'https://image.tmdb.org/t/p/w342' + data;
  }
  return 'img/nd.jpg';
}

// funzione reset
function reset(){
  $('.movie-ctr').empty();
}
