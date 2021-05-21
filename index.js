//Getting Element
const row = document.getElementById('root');

//Creating Container
const container = document.createElement('div');
container.setAttribute('class', 'container');

//Appending Container to root
row.appendChild(container);

//Creating a XMLHttpRequest object
var request = new XMLHttpRequest();

//Get request to URL
request.open('GET', 'http://sandbox.bittsdevelopment.com/code1/fetchemployees.php', true);

//Onload function
request.onload = function () {
  //JSON data
  var info = JSON.parse(this.response);

  var newInfo = Object.values(info);
    newInfo.forEach((employees) => {
      //Creating Card
      var card = document.createElement('div');
      card.setAttribute('class', 'card');

      //Checking if Crown symbol should apper
      var isFeatured = employees.employeeisfeatured;
      if (isFeatured == 1){
        var crown = document.createElement('p');
        crown.setAttribute('class', 'crown');
        crown.textContent = "👑";
      } else {
        var crown = document.createElement('p');
        crown.textContent = "";
      }

      //Accessing Employee Id
      var imgId = employees.employeeid;

      //Fetching coorect images for employeeid
      var img = document.createElement('img');
      img.setAttribute('src', 'http://sandbox.bittsdevelopment.com/code1/employeepics/'+ imgId + '.jpg');

      //Fetching names
      var title = document.createElement('p');
      title.setAttribute('class', 'title');
      title.textContent = employees.employeefname + " " + employees.employeelname;

      //Feteching descriptions
      var description = document.createElement('p');
      description.setAttribute('class', 'description');
      description.textContent = employees.employeebio;

      //Getting roles for each person
      const getNestedObject = (nestedObj, pathArr) => {
          return pathArr.reduce((obj, key) =>
            (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);
      }

      var role1 = getNestedObject(employees, ['roles', 0 ,'rolename']);
      var role2 = getNestedObject(employees, ['roles', 1 ,'rolename']);

      var rolecolor1 = getNestedObject(employees, ['roles', 0 , 'rolecolor']);
      var rolecolor2 = getNestedObject(employees, ['roles', 1 , 'rolecolor']);

      var roles = document.createElement('p');
      roles.setAttribute('class', 'roles');
      roles.style.background= rolecolor1;
      roles.textContent = role1 + " " + role2;

      container.appendChild(card);
      card.appendChild(crown);
      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(description);
      card.appendChild(roles);
    });
};

//Sending the request
request.send();
