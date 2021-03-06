$(document).ready(function() {
    // išvalome paieškos lauką prieš kiekvieną paiešką:
    $('input#searchWeed').val('');
    var results;
    $('input#searchWeed').keyup(function(e) {
        if (this.value.length < 3) return; //grąžiname rezultatus tik jei įvestos 3 raidės ar daugiau
        let weedName = e.target.value;
        // prasideda linksmybės :)
        $.ajax({
            url: 'http://strainapi.evanbusse.com/Q1tPKQw/strains/search/name/' + weedName
        }).done(function(weeds) {
            // Kuriame rezultatų masyvą, kad optimizuot paiešką
            results = [];
            $.each(weeds, function(index, weed) {
                results.push({
                    'name': weed.name,
                    'id'  : weed.id,
                    'race': weed.race,
                    'desc': weed.desc
                });
            });
            printResults(results); // išvedame pradinius rezultatus
            // rezultatų filtravimas, paspaudus filtravimo mygtuką:
            $('#filter').click(function(e) {
                e.preventDefault();
                filterResults(results);
            });
            // rezultatų filtravimas, pakeitus rūšes pasirinkimą:
            $('#raceSelection').change(function(e) {
                e.preventDefault();
                filterResults(results);
            });
            // filtro numetimas:
            $('#clear').click(function(e) {
                e.preventDefault();
                printResults(results);
            });
        });
    });
});

function printResult (weed) {
    $('#strains').append(`
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">${weed.name}</h3>
            </div>
            <div class="panel-body">
                <div class="row">
                    <div class="col-md-5">
                        Strain Race: &nbsp;<span class="badge badge-danger">${weed.race}</span>
                    </div>
                    <div class="col-md-7">
                        <ul class="list-group">
                            <h6><span class="badge badge-success">Description:</span></h6>
                            <li class="list-group-item">${weed.desc}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `);
}

function printResults(weeds) {
    $('#strains').html(``);
    if (weeds.length > 0) {
        $.each(weeds, function(index, weed) {
            printResult(weed);
        });
    } else {
        $('#strains').append(`
            <h4>Your search returned no results, sorry.</h4>
        `);
    }
}

function filterResults(weeds) {
    $('#strains').html(``);
    let filterValue = $('#raceSelection').val();
    $.each(weeds, function(index, weed) {
        if (weed.race == filterValue) {
            printResult(weed);
        }
    });
}
