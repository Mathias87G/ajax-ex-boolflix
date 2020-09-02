// Milestone 1:
// Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film.
// Possiamo, cliccando il bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
// Titolo
// Titolo Originale
// Lingua
// Voto

$(document).ready(function(){
  $('#title-search').click(function(){
    var titolo = $('#title').val();
    console.log(titolo);
    $.ajax(
      {
        url: 'https://api.themoviedb.org/3/search/movie',
        method: 'GET',
        data: {
          api_key: '72dc32a32f51c244d20fcafee0b12798',
          query: titolo,
          language: 'it-IT'
        },
        success: function(risposta){
          var results = risposta.results;

          var source = $('#film-template').html();
          var template = Handlebars.compile(source);
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
        error: function(){
          alert('Errore');
        }
      }
    )
  });

});
