// Script by Narassin
// Things to do
// Separate each canvas function to their respective modules
// add a event listener to the form submit button
// make sure the end date automatically update when start date is inputed
// optimize the canvas by adding a canvas scaling.
// (optional) add a downlaod button to download the schedule as a pdf or png.

document.addEventListener('schedule-form-submit',function(event){
  var previ = document.getElementById('previ');
  previ.classList.remove('d-none');
  console.log("Event received");
  console.log(event.detail);
  const data = event.detail;
  // const imageData = event.detail.filename;
  const imageData = document.getElementById('myFile');
  drawSchedule(data,imageData);
});

// VARIABLES LIST
const canvas = document.getElementById('schedule');
const ctx = canvas.getContext('2d');


// // FORM HANDLING
// document.getElementById('scheduleForm').addEventListener('submit', function(event) {
//   event.preventDefault(); // Prevent default form submission

//   // Get input values from form fields
//   const title = document.getElementById('title').value;
//   const name = document.getElementById('name').value;
//   const startDate = document.getElementById('startDate').value;
//   const endDate = document.getElementById('endDate').value;

//   // Call generateSchedule function with input values
//   generateSchedule(title, name, startDate, endDate);
// });


// Canvas Drawing Modules

// Function to draw rounded rectangle
function drawRoundedRect(x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}


// Main Schedule Module
function drawSchedule(data,imageData) {
  
  // Draw background image
  const name = 'Narassin';
  const bgImage = new Image();
  const filename = data.filename;
  console.log('Filename:', filename);
  var imageUrl = '';  

  const imageFile = imageData.files[0]; // Assuming imageData is the file input element
    if (imageFile) {
      console.log('pass checkpoint');
      console.log('Image file:', imageFile);
      imageUrl = URL.createObjectURL(imageFile);

        // Now you can use imageUrl to display the uploaded image or perform further processing
        console.log('Image URL:', imageUrl);
    } else {
        console.error('No image file selected');
    }
  console.log('Image URL:', imageUrl);

  bgImage.src = 'Assets/Canvas/bg.png'; // Replace with your image URL
  bgImage.onload = function() {
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    
    // Draw title with banner
    ctx.fillStyle = "#9aabc6";
    ctx.fillRect(0, 0, canvas.width, 50);

    ctx.font = "36px 'Russo One', sans-serif";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(`${name}'s Schedule ${data.date} - ${data.date2}`, canvas.width / 2, 35);
    
    // Draw schedule listing
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const startX = 20;
    const startY = 50;
    const lineHeight = canvas.height / 8;
    const xOffset = 150;
    const yOffset = 55;

    // render the Schedule List
    // ctx.font = "20px 'Kode Mono', monospace";
    ctx.textAlign = "left";
    for (let i = 0,j=1; i < 7; i++,j++) {
        // var title = document.getElementById('title'+ i).value;
        // ctx.font = "16px 'Kode Mono', monospace";
        const time = data[`time-${j}`];
        const day = days[i];
        const title = data[`title-${j}`];
        var cate = data[`cat-${j}`];
        console.log(title);
        const date = new Date(data.date);
        date.setDate(date.getDate() + i);
        const dateString = `${date.toDateString().slice(4, 10)}`;

        // The Box container
        // ctx.fillStyle = "#9aabc6";
        // ctx.fillRect(startX-10, startY/4 + yOffset  + i * lineHeight , canvas.width*0.7, lineHeight - 10);

        ctx.fillStyle = "#9aabc6";
        ctx.fillRect(startX-10, startY/4 + yOffset  + i * lineHeight , canvas.width*0.7, lineHeight - 10);
        
        const cat = new Image();
        
        cat.onload = function() {
          ctx.save();
          // The Box container
          ctx.rect(startX-10, startY/4 + yOffset  + i * lineHeight , canvas.width*0.7, lineHeight - 10)
          ctx.clip();
          ctx.drawImage(cat, startX-10,startY/4 + yOffset  + i * lineHeight);

          // Date
          ctx.font = "16px 'Kode Mono', monospace";
          ctx.fillStyle = "white";
          ctx.fillText(`${dateString} `, startX, startY + yOffset + i * lineHeight);
          
          // Day
          ctx.font = "30px 'Bebas Neue', sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(`${day}`, startX + xOffset/4*3, startY + yOffset + i * lineHeight+6);
          
          ctx.font = "16px 'Bebas Neue', sans-serif";
          ctx.fillText(`${time}`, startX + xOffset/4*3, startY + yOffset + 15 + i * lineHeight+6);
          console.log(title);
          
          // Title
          ctx.font = "30px 'Bebas Neue', sans-serif";
          ctx.textAlign = "left";
          if(title!== ''){
            ctx.fillText(`${title}`, startX + xOffset, startY + yOffset + i * lineHeight+6);
          } else {
            ctx.fillText('Rest Day', startX + xOffset, startY + yOffset + i * lineHeight+6);
          }

          // ${title};

          ctx.restore();
        };
        
        
        switch(cate) {
          case 'JC':
            cat.src = 'Assets/Canvas/rpg.png';
            break;
          case 'code':
            cat.src = 'Assets/Canvas/code.png';
            break;
          case 'hi3':
            cat.src = 'Assets/Canvas/hi3.png';
            break;
          case 'art':
            cat.src = 'Assets/Canvas/art.png';
            break;
          default:
            cat.src = 'Assets/Canvas/code.png';
            break;
        }
        

        // // Date
        // ctx.font = "16px 'Kode Mono', monospace";
        // ctx.fillStyle = "white";
        // ctx.fillText(`${dateString} `, startX, startY + yOffset + i * lineHeight);
        
        // // Day
        // ctx.font = "26px 'Bebas Neue', sans-serif";
        // ctx.textAlign = "center";
        // ctx.fillText(`${day}`, startX + xOffset/4*3, startY + yOffset + i * lineHeight+3);
        
        // // Title
        // ctx.textAlign = "left";
        // ctx.fillText("Schedule Title", startX + xOffset, startY + yOffset + i * lineHeight+3);
        // // ${title};
    }

    // Draw rounded rectangles on the right side with placeholder image
    const cardWidth = 300;
    const cardHeight = cardWidth/2*3;
    const cardRadius = 10;
    const tiltAngle = -10;
    const cardX = canvas.width - cardWidth - 20;
    const cardY = canvas.height / 2 - cardHeight / 2;
    // const LCHeight = 15;


    // Inserting Card Cover
    const cover = new Image();
    ctx.save();
    cover.onload = function() {
              ctx.drawImage(cover, cardX-10 , cardY+10 , cardWidth, cardHeight);
    };
    cover.src = 'Assets/Canvas/cardCover.png';
    
    // Inserting Card Image
    const img = new Image();
    img.onload = function() {
        ctx.save();
        ctx.rotate(tiltAngle * Math.PI / 180);
        ctx.translate(canvas.width-cardWidth-130 ,(canvas.height/2+cardHeight/2)-250);
        drawRoundedRect(0, 0, cardWidth, cardHeight, cardRadius);
        ctx.clip();
        ctx.drawImage(img, 0,0 , cardHeight* img.width/img.height , cardHeight);
        // ctx.fillStyle = "purple";
        // ctx.font = "11px Arial";
        // ctx.fillText("* Stream are subject for changes", 10,cardHeight/8*6);
        // ctx.fillText("  (Always high chance for guerrilla stream)", 10,cardHeight/8*6+LCHeight);
        // ctx.fillText("* Update announcement will be made on", 10,cardHeight/8*6+LCHeight*2);
        // ctx.fillText("  Twitter / X", 10,cardHeight/8*6+LCHeight*3);
        // ctx.fillText("  Twitter(X): @thenarassin", 10,cardHeight/8*6+LCHeight*4);
        // ctx.drawImage(img, canvas.width-cardWidth-225 ,(canvas.height/2+cardHeight/2)-80 , cardWidth -20, cardHeight - 20);
        ctx.restore();
    };
    img.src = imageUrl;
     
  };
}

// drawSchedule("Stream", "02/26/24", "03/03/24");