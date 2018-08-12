function shuffle(sourceArray) {
    for (var i = 0; i < sourceArray.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (sourceArray.length - i));

        var temp = sourceArray[j];
        sourceArray[j] = sourceArray[i];
        sourceArray[i] = temp;
    }
    return sourceArray;
}

const source = [
  {
    "name": "Roth Arnold",
    "stargazers_count": 29,
    "owner": "@Hicks",
    "html_url": "http://example.com"
  },
  {
    "name": "Pam Pennington",
    "stargazers_count": 27,
    "owner": "@Delacruz",
    "html_url": "http://example.com"
  },
  {
    "name": "Lambert Goff",
    "stargazers_count": 31,
    "owner": "@Christina",
    "html_url": "http://example.com"
  },
  {
    "name": "Calhoun Solis",
    "stargazers_count": 37,
    "owner": "@Barr",
    "html_url": "http://example.com"
  },
  {
    "name": "Amalia Golden",
    "stargazers_count": 40,
    "owner": "@Stewart",
    "html_url": "http://example.com"
  },
  {
    "name": "Stout Barker",
    "stargazers_count": 38,
    "owner": "@Rivera",
    "html_url": "http://example.com"
  },
  {
    "name": "Ayers Oneal",
    "stargazers_count": 35,
    "owner": "@Pate",
    "html_url": "http://example.com"
  },
  {
    "name": "Vivian Ross",
    "stargazers_count": 25,
    "owner": "@Bernard",
    "html_url": "http://example.com"
  },
  {
    "name": "Reilly Sargent",
    "stargazers_count": 32,
    "owner": "@Allison",
    "html_url": "http://example.com"
  },
  {
    "name": "Bettie Pierce",
    "stargazers_count": 32,
    "owner": "@Dickerson",
    "html_url": "http://example.com"
  },
  {
    "name": "Ruthie Fox",
    "stargazers_count": 37,
    "owner": "@Robyn",
    "html_url": "http://example.com"
  },
  {
    "name": "Woods Poole",
    "stargazers_count": 25,
    "owner": "@Savannah",
    "html_url": "http://example.com"
  },
  {
    "name": "Caldwell Sloan",
    "stargazers_count": 37,
    "owner": "@Mccarty",
    "html_url": "http://example.com"
  },
  {
    "name": "Laurel Vazquez",
    "stargazers_count": 27,
    "owner": "@Mona",
    "html_url": "http://example.com"
  },
  {
    "name": "Saunders Montgomery",
    "stargazers_count": 25,
    "owner": "@Graves",
    "html_url": "http://example.com"
  },
  {
    "name": "Serrano Adkins",
    "stargazers_count": 26,
    "owner": "@James",
    "html_url": "http://example.com"
  },
  {
    "name": "Cannon Rowland",
    "stargazers_count": 21,
    "owner": "@Bridgett",
    "html_url": "http://example.com"
  },
  {
    "name": "Howell Molina",
    "stargazers_count": 36,
    "owner": "@Snow",
    "html_url": "http://example.com"
  },
  {
    "name": "Bailey Mercado",
    "stargazers_count": 27,
    "owner": "@Bonnie",
    "html_url": "http://example.com"
  },
  {
    "name": "Crane Shelton",
    "stargazers_count": 24,
    "owner": "@Whitehead",
    "html_url": "http://example.com"
  },
  {
    "name": "Selena Craig",
    "stargazers_count": 20,
    "owner": "@Sonia",
    "html_url": "http://example.com"
  },
  {
    "name": "Rivas Quinn",
    "stargazers_count": 40,
    "owner": "@Muriel",
    "html_url": "http://example.com"
  },
  {
    "name": "Terrell Jensen",
    "stargazers_count": 33,
    "owner": "@Rebekah",
    "html_url": "http://example.com"
  },
  {
    "name": "Lea Odom",
    "stargazers_count": 39,
    "owner": "@Stark",
    "html_url": "http://example.com"
  },
  {
    "name": "Hollie Davidson",
    "stargazers_count": 27,
    "owner": "@Knox",
    "html_url": "http://example.com"
  },
  {
    "name": "Cox Doyle",
    "stargazers_count": 27,
    "owner": "@Watkins",
    "html_url": "http://example.com"
  },
  {
    "name": "Tamika Hansen",
    "stargazers_count": 37,
    "owner": "@Aida",
    "html_url": "http://example.com"
  },
  {
    "name": "Adriana Williams",
    "stargazers_count": 36,
    "owner": "@Greene",
    "html_url": "http://example.com"
  },
  {
    "name": "Janell Lindsay",
    "stargazers_count": 23,
    "owner": "@Bird",
    "html_url": "http://example.com"
  },
  {
    "name": "Meghan Ware",
    "stargazers_count": 36,
    "owner": "@Lorena",
    "html_url": "http://example.com"
  },
  {
    "name": "Boone Bailey",
    "stargazers_count": 20,
    "owner": "@Pugh",
    "html_url": "http://example.com"
  },
  {
    "name": "Lila Reynolds",
    "stargazers_count": 33,
    "owner": "@Leach",
    "html_url": "http://example.com"
  },
  {
    "name": "Blair Hanson",
    "stargazers_count": 26,
    "owner": "@Annie",
    "html_url": "http://example.com"
  },
  {
    "name": "Meyers Santana",
    "stargazers_count": 40,
    "owner": "@Ballard",
    "html_url": "http://example.com"
  },
  {
    "name": "Warner Mcfarland",
    "stargazers_count": 28,
    "owner": "@Baldwin",
    "html_url": "http://example.com"
  },
  {
    "name": "Tamera Bright",
    "stargazers_count": 25,
    "owner": "@Wilcox",
    "html_url": "http://example.com"
  }
]

module.exports = {shuffle, source}
