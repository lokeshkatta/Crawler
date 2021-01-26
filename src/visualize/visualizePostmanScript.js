
// template for visualization
let template = `
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
        crossorigin="anonymous">
    <style type="text/css">
        body { font-size: 12px; background: #eee; padding: 16px;}
        .card { border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,.15); -webkit-box-shadow: 0 4px 10px rgba(0,0,0,.15); -moz-box-shadow: 0 4px 10px rgba(0,0,0,.15);}
        .card-topper { border-top-right-radius: 8px; border-top-left-radius: 8px; padding: 8px 16px; font-size: 12px; font-weight: 600; text-transform: uppercase;}
        .card-topper.micro { background-color: #173F5F; color: #ffffff;}
        .card-topper.planning { background-color: #ED553B; color: #ffffff;}
        .card-topper.large { background-color: #ED553B; color: #ffffff;}
        .card-topper.brewpub { background-color: #20639B; color: #ffffff;}
        .card-topper.regional { background-color: #F6D55C;}
        .card-topper.contract { background-color: #3CAEA3; color: #ffffff;}
        .card-topper.proprietor { background-color: #ED553B; color: #ffffff;}
        .card-topper.bar { background-color: #ED553B; color: #ffffff;}
    </style>
    <div class="container-fluid">
        <div class="row">
            <div class="col mb-4">
                <h1>Top 100</h1>
            </div>
        </div>
        <div class="row">
            {{#each response}}
            <div class="col-sm-6 col-lg-4 col-xl-3 mb-5">
                <div class="card">
                    <div class="test card-topper card-img-top {{shotId}}">shotId-{{shotId}}</div>
                    <div class="card-body">
                        <h2>{{title}}</h2>
                        <address><a href="{{url}}" class="card-link" target="_blank" rel="noopener noreferrer">Dribbble Link</a><br><address>
                        <a href="#" class="card-link" target="_blank" rel="noopener noreferrer">Likes-{{likes}}</a>
                        <a href="#" class="card-link" target="_blank" rel="noopener noreferrer">Views-{{views}}</a>
                        <a href="#" class="card-link" target="_blank" rel="noopener noreferrer">Comments-{{comments}}</a>

                    </div>
                </div>
            </div>
            {{/each}}
        </div>
    </div>
`;

// Set Visualizer
pm.visualizer.set(template, {
    response: JSON.parse(responseBody)
});

// test if the status code is having 200
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});