
const app = {
  // just a utility var to remember all the colors
  colors: ['red','green','blue','yellow'],

  // this var will contain the sequence said by Simon
  sequence: [],

  indice: 0,

  // check: true,

  drawCells: function () {
    const playground = document.getElementById('playground');
    for (const color of app.colors) {
      let cell = document.createElement('div');
      cell.className = 'cell';
      cell.id = color;
      cell.style.backgroundColor = color;
      playground.appendChild(cell);
    }
  },

  bumpCell: function (color) {
    // let's modify the syle directly
    document.getElementById(color).style.borderWidth = '45px';
    // and reset the same style, after a small pause (150 ms)
    setTimeout( () => {
      document.getElementById(color).style.borderWidth = '0';
    }, 150);


  },

  newGame: function () {
    // start by reseting the sequence 
    app.sequence = [];
    // make it 3 times :
    for (let index = 0; index < 3; index++) {
      // get a random number between 0 and 3
      let random = Math.floor(Math.random()*4);
      // add the corresponding color to the sequence
      app.sequence.push( app.colors[random] );
    }
    //app.showMessage("C'est parti");
    // start the "Simon Says" sequence
    app.simonSays(app.sequence);
  },

  simonSays: function (sequence) {
    // app.check = true;
    app.showMessage("Mémorisez la séquence");
    if (sequence && sequence.length) {
      // after 500ms, bump the first cell
      setTimeout( app.bumpCell, 500, sequence[0] );
      // plays the rest of the sequence after a longer pause
      setTimeout( app.simonSays, 850, sequence.slice(1));
    }else {
      // app.check = false
      app.showMessage ('Reproduisez la séquence');
      // setTimeout(app.gameOver(),5000,event.none)
    }
   },

  init: function () {
    console.log('init');
    app.drawCells();
    app.bump();
    
    // listen click on the "go" button
    document.getElementById('go').addEventListener('click', app.newGame );
    
  },


  showMessage: function (message) {
    document.getElementById('message').style.display = 'block'
    document.getElementById('message').innerHTML = message;
    document.getElementById('go').style.display = 'none'
  },

  hideMessage: function () {
    document.getElementById('message').style.display = 'none'
    document.getElementById('go').style.display = 'block';
  },

  gameOver: function() {
    alert(`Partie terminée. Votre score : ${app.sequence.length - 1}`);
    app.hideMessage();
    indice = 0;
  },

  bump: function() {
    let cells = document.querySelectorAll('.cell') 
    // if(app.check === true){
    //   return
    // }  
    for(const cell of cells){
      cell.addEventListener('click', function(){
        app.bumpCell(cell.id)
        if(event.target.id === app.sequence[app.indice]){
          console.log(event.target.id === app.sequence[app.indice])
          app.indice++;
        }else if(event.target.id !== app.sequence[app.indice]){
          app.gameOver()
        }
        if(app.indice === app.sequence.length){
          console.log('next');
          app.nextMove();
        }
      })
    };
  },

  nextMove: function(){
      let random = Math.floor(Math.random()*4);
      // add the corresponding color to the sequence
      app.sequence.push(app.colors[random]);
      console.log(app.sequence.length);
      console.log(app.sequence);
      app.simonSays(app.sequence);
      app.indice = 0;
    },
  
}; 

document.addEventListener('DOMContentLoaded', app.init);

