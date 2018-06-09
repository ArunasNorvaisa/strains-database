$(document).ready(function() {
    $('input#searchWeed').val('');
    var results;
    $('input#searchWeed').keyup(function(e) {
        if (this.value.length < 3) return;
        let weedName = e.target.value;
        $.ajax({
            url: 'http://strainapi.evanbusse.com/Q1tPKQw/strains/search/name/' + weedName
        }).done(function(weeds) {
            results = [];
            $.each(weeds, function(index, weed) {
                results.push({
                    'name': weed.name,
                    'id'  : weed.id,
                    'race': weed.race,
                    'desc': weed.desc
                });
            });
            printResults(results);
            $('body').on('click', "#filter", function(e) {
                e.preventDefault();
                filterResults(results);
            });
            $('body').on('click', "#clear", function(e) {
                e.preventDefault();
                printResults(results);
            });
        });
    });
});

function printResults(weeds) {
    $('#strains').html(``);
    $.each(weeds, function(index, weed){
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
   });
}

function filterResults(weeds) {
    $('#strains').html(``);
    let filterValue = $('#raceSelection').val();
    $.each(weeds, function(index, weed){
        if (weed.race == filterValue) {
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
    });
}

