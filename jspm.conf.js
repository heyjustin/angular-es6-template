System.config({
  "baseURL": "/",
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js"
  }
});

System.config({
  "map": {
    "angular": "github:angular/bower-angular@1.3.13",
    "angular-route": "github:angular/bower-angular-route@1.3.13",
    "github:angular/bower-angular-route@1.3.13": {
      "angular": "github:angular/bower-angular@1.3.13"
    }
  }
});

