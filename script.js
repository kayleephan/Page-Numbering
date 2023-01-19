var dataJSON;
getText();

async function getText() {
	var url = 'https://randomuser.me/api/?results=33';
	if( typeof dataJSON === 'undefined'){
		let json = await fetch(url); // read json data from url or file
		let data = await json.text(); // assign data to variable name data
		dataJSON = data;
	}
	await listUsers(dataJSON);
	return dataJSON;
}

function listUsers(data){
	var obj = JSON.parse(data); // parse json to object
	//console.log(obj); // console.log json object
	//console.log(obj.results[0]); // console.log first object in array
	//console.log(obj.results.length); // console.log total objects in array
	
	pagingData(obj.results, 0);
	showPaging(obj.results.length);
	
	var totalSpan = document.getElementById("totals");
	createElement('i', totalSpan, obj.results.length);
}

function showList(curPage){
	pagingData(undefined, curPage);
}

function pagingData(obj, curPage){
	if( typeof obj === 'undefined' ){
		obj = JSON.parse(dataJSON).results;
	}
	if( curPage != 0 )
		curPage = curPage - 1; // cause paging begin from 1 and array begin from 0
	var start = curPage * 10;
	var end = start + 10;
	
	var list = document.getElementById("list");
	list.innerHTML = ''; // clear old content to fill new one
	var ul = createElement('ul', list);
	
	for( var i = start; i < end; i++ ){
		var item = obj[i];
		if( typeof item !== 'undefined' ){ // if out of array then not display

			var li = createElement('li', ul);
		
			createImage(li, item.picture.medium);
			
			var divLeft = createElement('div', li);
			divLeft.setAttribute("class", "divLeft");
			createElement('strong', divLeft, item.name.first +' '+ item.name.last);
			createElement('strong', divLeft, 'Email: ' + item.email);

			var divRight = createElement('div', li);
			divRight.setAttribute("class", "divRight");
			createElement('span', divRight, 'Registered: ' + item.registered.date);
		}
	}
}

function showPaging(size){
	var over = parseInt(size % 10); 
	var page = parseInt(size / 10); 
	
	var paging = document.getElementById("paging");
	var div = createElement('div', paging);
	
	for( var i = 1; i <= page; i++ ){ 
		var btn = createButton(div, i, 'showList('+i+')');
		if( i == 1 )
			btn.classList.add('active');
		btn.addEventListener('click', function (e){
		    toggleButtonClass(e.target);
		});
	}
	if( over > 0 ){
		var extra = page + 1;
		var extraBtn = createButton(div, extra, 'showList('+extra+')');
		extraBtn.addEventListener('click', function (e){
		    toggleButtonClass(e.target);
		});
	}
	
}

function toggleButtonClass(btn){
	// remove other active button class
	var btns = document.getElementsByTagName('button');
	for( var x=0; x<btns.length; x++ ){
		btns[x].classList.remove('active');
	}
	btn.classList.add('active');
}

function createElement(tagName, appendToDiv, textData){
	var ele = document.createElement(tagName);
	if( typeof textData !== 'undefined' )
		ele.appendChild( document.createTextNode(textData) );
	if( typeof appendToDiv !== 'undefined' )
		appendToDiv.appendChild(ele);
	return ele;
}

function createImage(appendToDiv, imgSrc){
	var ele = document.createElement('img');
	if( typeof imgSrc !== 'undefined' )
		ele.src = imgSrc;
	if( typeof appendToDiv !== 'undefined' )
		appendToDiv.appendChild(ele);
	return ele;
}

function createButton(appendToDiv, textData, eventCall){
	var ele = document.createElement('button');
	if( typeof eventCall !== 'undefined' )
		ele.setAttribute("onclick", eventCall);
	if( typeof textData !== 'undefined' )
		ele.appendChild( document.createTextNode(textData) );
	if( typeof appendToDiv !== 'undefined' )
		appendToDiv.appendChild(ele);
	return ele;
}