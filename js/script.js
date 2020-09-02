// Milestone 1:
// Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film.
// Possiamo, cliccando il bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
// Titolo
// Titolo Originale
// Lingua
// Voto

$(document).ready(function(){
  // Funzione click tasto ricerca
  $('#title-search').click(function(){
    var titolo = $('#title').val();
    $('.film-ctr').empty();
    ricerca(titolo);
    $('#title').val('');
  });
  // Richiamo funzione tastiera
  $('#title').keydown(keyboard);
});

// Funzione con ajax e Handlebars per la ricerca di film e la compilazione dell'HTML
function ricerca(film){
  $.ajax(
    {
      url: 'https://api.themoviedb.org/3/search/movie',
      method: 'GET',
      data: {
        api_key: '72dc32a32f51c244d20fcafee0b12798',
        query: film,
        language: 'it-IT'
      },
      success: function(risposta){
        var results = risposta.results;
        // Handlebars
        var source = $('#film-template').html();
        var template = Handlebars.compile(source);
        // Messaggio in caso di zero risultati
        if (risposta.total_results == 0) {
            $('.film-ctr').html('<h4>' + 'Nessun Risultato trovato' + '</h4>');
            return;
        }
        // ciclo for che stampa in base al numero dei risultati
        for (var i = 0; i < results.length; i++) {
          var context = {
            title: results[i].title,
            originalTitle: results[i].original_title,
            language: results[i].original_language,
            vote: results[i].vote_average
          };
          var html = template(context);
          $('.film-ctr').append(html);
        }
      },
      // errore
      error: function(){
        alert('Errore');
      }
    }
  )
}

// Funzione per tasto Invio sulla ricerca
function keyboard() {
  var titolo = $('#title').val();
  if (event.which == 13 || event.keyCode == 13) {
    $('.film-ctr').empty();
    ricerca(titolo);
    $('#title').val('');
  }
}
