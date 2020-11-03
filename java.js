// A personality quiz

// This is an array of objects that stores the personality trait that is prompted to the user and the weight for each prompt. 
// If a personality trait is considered more introverted, it will have a negative weight.
// If a personlity trait is considered more extroverted, it will have a positive weight.

var prompts = [
{
	prompt: 'Me cuesta presentarme a la gente',
	weight: -1,
	class: 'group0'
},
{
	prompt: 'Me pierdo en mis propios pensamientos e ignoro y olvido lo que me rodea',
	weight: -1,
	class: 'group1'
},
{
	prompt: 'No suelo iniciar conversaciones',
	weight: -1,
	class: 'group2'
},
{
	prompt: 'Prefiero no relacionarme con personas que están enojadas',
	weight: -1,
	class: 'group3'
},
{
	prompt: 'Elijo cuidadosamente a mis amigos',
	weight: -1,
	class: 'group4'
},
{
	prompt: 'Encuentro dificil hablar de mi mismo',
	weight: -1,
	class: 'group5'
},
{
	prompt: 'Usualente soy positivo y energico',
	weight: 1,
	class: 'group6'
},
{
	prompt: 'Facilmente entro a un grupo e inicio una conversación',
	weight: 1,
	class: 'group7'
},
{
	prompt: 'Adaptarse es más importante que ser organizado',
	weight: 1,
	class: 'group8'
},
{
	prompt: 'Me preocupo más por que nadie se enoje más que por ganar un debate',
	weight: 1,
	class: 'group9'
},
{
	prompt: 'No necesito justificarme ante la gente',
	weight: 1,
	class: 'group10'
},
{
	prompt: 'Me gusta improvisar ante un examen dificil',
	weight: 1,
	class: 'group11'
}

]

// This array stores all of the possible values and the weight associated with the value. 
// The stronger agreeance/disagreeance, the higher the weight on the user's answer to the prompt.
var prompt_values = [
{
	value: '100% de acuerdo', 
	class: 'btn-default btn-strongly-agree',
	weight: 5
},
{
	value: 'De acuerdo',
	class: 'btn-default btn-agree',
	weight: 3,
}, 
{
	value: 'Neutral', 
	class: 'btn-default',
	weight: 0
},
{
	value: 'Desacuerdo',
	class: 'btn-default btn-disagree',
	weight: -3
},
{ 
	value: '100% desacuerdo',
	class: 'btn-default btn-strongly-disagree',
	weight: -5
}
]

// For each prompt, create a list item to be inserted in the list group
function createPromptItems() {

	for (var i = 0; i < prompts.length; i++) {
		var prompt_li = document.createElement('li');
		var prompt_p = document.createElement('p');
		var prompt_text = document.createTextNode(prompts[i].prompt);

		prompt_li.setAttribute('class', 'list-group-item prompt');
		prompt_p.appendChild(prompt_text);
		prompt_li.appendChild(prompt_p);

		document.getElementById('quiz').appendChild(prompt_li);
	}
}

// For each possible value, create a button for each to be inserted into each li of the quiz
// function createValueButtons() {
	
// 	for (var li_index = 0; li_index < prompts.length; li_index++) {
// 		for (var i = 0; i < prompt_values.length; i++) {
// 			var val_button = document.createElement('button');
// 			var val_text = document.createTextNode(prompt_values[i].value);

// 			val_button.setAttribute('class', 'value-btn btn ' + prompt_values[i].class);
// 			val_button.appendChild(val_text);

// 			document.getElementsByClassName('prompt')[li_index].appendChild(val_button);
// 		}
// 	}
// }
function createValueButtons() {
	for (var li_index = 0; li_index < prompts.length; li_index++) {
		var group = document.createElement('div');
		group.className = 'btn-group btn-group-justified';

		for (var i = 0; i < prompt_values.length; i++) {
			var btn_group = document.createElement('div');
			btn_group.className = 'btn-group';

			var button = document.createElement('button');
			var button_text = document.createTextNode(prompt_values[i].value);
			button.className = 'group' + li_index + ' value-btn btn ' + prompt_values[i].class;
			button.appendChild(button_text);

			btn_group.appendChild(button);
			group.appendChild(btn_group);

			document.getElementsByClassName('prompt')[li_index].appendChild(group);
		}
	}
}

createPromptItems();
createValueButtons();

// Keep a running total of the values they have selected. If the total is negative, the user is introverted. If positive, user is extroverted.
// Calculation will sum all of the answers to the prompts using weight of the value * the weight of the prompt.
var total = 0;

// Get the weight associated to group number
function findPromptWeight(prompts, group) {
	var weight = 0;

	for (var i = 0; i < prompts.length; i++) {
		if (prompts[i].class === group) {
			weight = prompts[i].weight;
		}
	}

	return weight;
}

// Get the weight associated to the value
function findValueWeight(values, value) {
	var weight = 0;

	for (var i = 0; i < values.length; i++) {
		if (values[i].value === value) {
			weight = values[i].weight;
		}
	}

	return weight;
}

// When user clicks a value to agree/disagree with the prompt, display to the user what they selected
$('.value-btn').mousedown(function () {
	var classList = $(this).attr('class');
	// console.log(classList);
	var classArr = classList.split(" ");
	// console.log(classArr);
	var this_group = classArr[0];
	// console.log(this_group);

	// If button is already selected, de-select it when clicked and subtract any previously added values to the total
	// Otherwise, de-select any selected buttons in group and select the one just clicked
	// And subtract deselected weighted value and add the newly selected weighted value to the total
	if($(this).hasClass('active')) {
		$(this).removeClass('active');
		total -= (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $(this).text()));
	} else {
		// $('[class='thisgroup).prop('checked', false);
		total -= (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $('.'+this_group+'.active').text()));
		// console.log($('.'+this_group+'.active').text());
		$('.'+this_group).removeClass('active');

		// console.log('group' + findValueWeight(prompt_values, $('.'+this_group).text()));
		// $(this).prop('checked', true);
		$(this).addClass('active');
		total += (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $(this).text()));
	}

	console.log(total);
})



$('#submit-btn').click(function () {
	// After clicking submit, add up the totals from answers
	// For each group, find the value that is active
	$('.results').removeClass('hide');
	$('.results').addClass('show');
	
	if(total < 0) {
		// document.getElementById('intro-bar').style.width = ((total / 60) * 100) + '%';
		// console.log(document.getElementById('intro-bar').style.width);
		// document.getElementById('intro-bar').innerHTML= ((total / 60) * 100) + '%';
		document.getElementById('results').innerHTML = '<b>Eres introvertido!</b><br><br>\
		Los introvertidos son difíciles de entender, ya que es muy fácil para nosotros asumir que la introversión es lo mismo que ser tímido, cuando, de hecho, los introvertidos son simplemente personas a las que les resulta agotador estar cerca de otras personas..\n\
<br><br>\
Me encanta esta explicación de un introvertido:\n\
<br><br>\
Para los introvertidos, estar a solas con nuestros pensamientos es tan reconstituyente como dormir, tan nutritivo como comer.\n\n\
<br><br>\
Las personas introvertidas son conocidas por pensar las cosas detenidamente antes de hablar, disfrutar de grupos pequeños y cercanos de amigos y del tiempo a solas, necesitar tiempo a solas para recargar energías y sentirse molestas por cambios inesperados o sorpresas de última hora. Los introvertidos no son necesariamente tímidos y es posible que ni siquiera eviten situaciones sociales, pero definitivamente necesitarán un tiempo a solas o solo con amigos cercanos o familiares después de pasar tiempo entre una gran multitud.\
		';
	} else if(total > 0) {
		document.getElementById('results').innerHTML = '<b>Eres extrovertido!</b><br><br>\
		En el lado opuesto de la moneda, las personas extrovertidas reciben energía de las personas. Por lo general, disfrutan pasar tiempo con los demás, ya que así es como se recargan del tiempo que pasan solos, concentrados o trabajando duro..\
<br><br>\
Me gusta cómo este extrovertido explica:\
<br><br>\
´Cuando estoy entre personas, hago contacto visual, sonrío, tal vez charlo si hay una oportunidad (como estar atrapado en una larga fila en el supermercado). Como extrovertido, eso es un pequeño de energía, un pequeño momento positivo en el día\
		';
	} else {
		document.getElementById('results').innerHTML = '<b>Eres ambivertido!</b><br><br>\
		Dado que los introvertidos y extrovertidos son los extremos de la escala, el resto de nosotros caemos en algún punto intermedio. Muchos de nosotros nos inclinamos de una manera u otra, pero hay algunos que están bastante equilibrados entre las dos tendencias. Estas personas se llaman ambivertidos .\
<br><br>\
Así que veamos cómo se compara un ambivertido.\
<br><br>\
Los ambivertidos exhiben tendencias tanto extrovertidas como introvertidas. Esto significa que generalmente disfrutan estar cerca de las personas, pero después de mucho tiempo esto comenzará a agotarlos. Del mismo modo, disfrutan de la soledad y la tranquilidad, pero no por mucho tiempo. Los ambivertidos recargan sus niveles de energía con una mezcla de interacción social y tiempo a solas'}

	// Hide the quiz after they submit their results
	$('#quiz').addClass('hide');
	$('#submit-btn').addClass('hide');
	$('#retake-btn').removeClass('hide');
})

// Refresh the screen to show a new quiz if they click the retake quiz button
$('#retake-btn').click(function () {
	$('#quiz').removeClass('hide');
	$('#submit-btn').removeClass('hide');
	$('#retake-btn').addClass('hide');

	$('.results').addClass('hide');
	$('.results').removeClass('show');
})