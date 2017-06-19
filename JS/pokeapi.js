var pokeapi='http://www.pokeapi.co';

//checking if first time and remembering page
if(localStorage.getItem("isRender")==null || localStorage.getItem("isRender")=='false'){localStorage.setItem("page",1);}
var page=localStorage.getItem("page")==null ? 1 : localStorage.getItem("page");
var pokemon=localStorage.getItem("pokemon")==null ? '/api/v1/pokemon/1/' : localStorage.getItem("pokemon");
localStorage.setItem("isRender",false);

function render(n){
    page=n;
    localStorage.setItem("isRender",true);
    localStorage.setItem("page",page);
    location.reload();
}

function putImgToNRow(n,img){document.getElementById('container').children[2].children[n].children[0].innerHTML='<img src="'+img+'"/>';}
function putNameToNRow(n,name){document.getElementById('container').children[2].children[n].children[1].innerHTML=name;}
function putHpToNRow(n,hp){document.getElementById('container').children[2].children[n].children[2].innerHTML=hp;}

function getWithFunForN(url,fun,n){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            fun(JSON.parse(xmlHttp.responseText),n);
    }
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}

function f2(parsed,n){
    putImgToNRow(n,pokeapi+parsed['image']);
}
function f1(parsed,n){
    putNameToNRow(n,parsed['name']);
    putHpToNRow(n,parsed['hp']);
    getWithFunForN(pokeapi+parsed['sprites']['1']['resource_uri'],f2,n);
}

function fillPokemons(){
    for(j=0,i=10*(page-1)+1;j<10;i++,j++){
        getWithFunForN(pokeapi+'/api/v1/pokemon/'+i+'/',f1,j);
    }
}

function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}

function showPokemon(nameid){
    localStorage.setItem("pokemon",'/api/v1/pokemon/'+((page-1)*10+nameid)+'/');
    openInNewTab('pokemon.html');
}

function putImg(img){document.getElementById('container').children[1].children[0].innerHTML='<img src="'+img+'"/>';}
function putName(name){document.getElementById('container').children[1].children[1].innerHTML='Name: '+name;}
function putHp(hp){document.getElementById('container').children[1].children[2].innerHTML='HP: '+hp;}
function putEvolution(evolution){document.getElementById('container').children[1].children[3].innerHTML= evolution==undefined ? 'Evolution form:<br/> None'
    :'<div id="refe" onclick="fillPokemon(\''+evolution['resource_uri']+'\')">Evolution form:<br/>'+evolution['to']+'</div>';}
function putSpeed(speed){document.getElementById('container').children[1].children[4].innerHTML="Speed: "+speed;}
function putAttack(attack){document.getElementById('container').children[1].children[5].innerHTML="Attack: "+attack;}
function putDefense(defense){document.getElementById('container').children[1].children[6].innerHTML="Defense: "+defense;}

function getWithFun(url,fun){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            fun(JSON.parse(xmlHttp.responseText));
    }
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}

function f4(parsed,n){
    putImg(pokeapi+parsed['image']);
}
function f3(parsed,n){
    putName(parsed['name']);
    putHp(parsed['hp']);
    putEvolution(parsed['evolutions']['0']);
    putSpeed(parsed['speed']);
    putAttack(parsed['attack']);
    putDefense(parsed['defense']);

    if(parsed['sprites']['0']!=null)getWithFun(pokeapi+parsed['sprites']['0']['resource_uri'],f4);
    else putImg('../Images/logo.png');
}

function renderPokemon(url){
    pokemon=url;
    localStorage.setItem("isRender",true);
    localStorage.setItem("pokemon",url);
    location.reload();
}
function fillPokemon(url){
    getWithFun(pokeapi+url,f3);
}
