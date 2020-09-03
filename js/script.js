// Milestone 2:
// Trasformiamo il voto da 1 a 10 decimale in un numero intero da 1 a 5, così da permetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5, lasciando le restanti vuote (troviamo le icone in FontAwesome).
// Arrotondiamo sempre per eccesso all’unità successiva, non gestiamo icone mezze piene (o mezze vuote :P)
// Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera della nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera della nazione ritornata dall’API (le flag non ci sono in FontAwesome).
// Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricerca dovremo prendere sia i film che corrispondono alla query, sia le serie tv, stando attenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel JSON di risposta diversi, simili ma non sempre identici)
// Qui un esempio di chiamata per le serie tv:
// https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT&query=scrubs

$(document).ready(function(){
  // Funzione click tasto ricerca
  $('#title-search').click(function(){
    ricercaFilm();
    ricercaSerie();
    if ($('.film-ctr').is(':empty')){
      $('.film-ctr').html('<h4>' + 'Nessun Risultato trovato' + '</h4>');
      return;
    }
    reset();
  });
  // Richiamo funzione tastiera
  $('#title').keydown(keyboard);
});

// Funzione con ajax e Handlebars per la ricerca di film e la compilazione dell'HTML
function ricercaFilm(){
  var query = $('#title').val();
  // Ajax
  $.ajax(
    {
      url: 'https://api.themoviedb.org/3/search/movie',
      method: 'GET',
      data: {
        api_key: '72dc32a32f51c244d20fcafee0b12798',
        query: query,
        language: 'it-IT'
      },
      success: function(risposta){
        print('Film', risposta);
      },
      // errore
      error: function(){
        alert('Errore');
      }
    }
  )
}

// Funzione con ajax e Handlebars per la ricerca di serie tv e la compilazione dell'HTML
function ricercaSerie(){
  var query = $('#title').val();
  // Ajax
  $.ajax(
    {
      url: 'https://api.themoviedb.org/3/search/tv',
      method: 'GET',
      data: {
        api_key: '72dc32a32f51c244d20fcafee0b12798',
        query: query,
        language: 'it-IT'
      },
      success: function(risposta){
        print('Serie Tv', risposta);
      },
      // errore
      error: function(){
        alert('Errore');
      }
    }
  )
}

// funzione print per compilazione html
function print(type, data){
  var results = data.results;
  // Handlebars
  var source = $('#film-template').html();
  var template = Handlebars.compile(source);
  for (var i = 0; i < results.length; i++) {
    if (type == 'Film') {
      titolo = results[i].title;
      originalTitle = results[i].original_title;
    } else if (type == 'Serie Tv') {
      titolo = results[i].name;
      originalTitle = results[i].original_name;
    }
    var context = {
      name: titolo,
      originalName: originalTitle,
      language: flags(results[i].original_language),
      vote: stars(results[i].vote_average),
      type: type
    };
    var html = template(context);
    $('.film-ctr').append(html);
  }
}

// Funzione per tasto Invio sulla ricerca
function keyboard(){
  if (event.which == 13 || event.keyCode == 13) {
    ricercaFilm();
    ricercaSerie();
    if ($('.film-ctr').is(':empty')){
      $('.film-ctr').html('<h4>' + 'Nessun Risultato trovato' + '</h4>');
      return;
    }
    reset();
  }
}

// funzione stelle
function stars(num){
  var num = Math.ceil(num / 2);
  var somma = '';
  for (var i = 0; i < 5; i++) {
    if (i < num){
      var star = '<i class="fas fa-star"></i>';
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

// funzione reset
function reset(){
  $('.film-ctr').empty();
  $('#title').val('');
}
