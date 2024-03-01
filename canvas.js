const canvas = document.getElementById('schedule');
const ctx = canvas.getContext('2d');
// var heightRatio = 9/16;
// canvas.height = canvas.width * heightRatio;

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


// Function to draw the schedule
function drawSchedule( name, startDate, endDate) {
  
    // Draw background image
  const bgImage = new Image();
  bgImage.src = 'Assets/Canvas/bg.png'; // Replace with your image URL
  bgImage.onload = function() {
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    
    // Draw title with banner
    ctx.fillStyle = "#9aabc6";
    ctx.fillRect(0, 0, canvas.width, 50);

    ctx.font = "36px 'Russo One', sans-serif";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(`${name}'s Schedule ${startDate} - ${endDate}`, canvas.width / 2, 35);
    
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
    for (let i = 0; i < 7; i++) {
        // var title = document.getElementById('title'+ i).value;
        // ctx.font = "16px 'Kode Mono', monospace";
        const day = days[i];
        const date = new Date(startDate);
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
          
          // Title
          ctx.textAlign = "left";
          ctx.fillText("Schedule Title", startX + xOffset, startY + yOffset + i * lineHeight+6);
          // ${title};

          ctx.restore();
        };
        cat.src = 'Assets/Canvas/code.png';


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
    const tiltAngle = -20;
    const cardX = canvas.width - cardWidth - 20;
    const cardY = canvas.height / 2 - cardHeight / 2;
    const LCHeight = 15;


    // Inserting Card Cover
    const cover = new Image();
    ctx.save();
    cover.onload = function() {
              ctx.drawImage(cover, cardX + 10, cardY + 10, cardWidth - 20, cardHeight - 20);
    };
    cover.src = 'Assets/Canvas/cardCover.png';
    
    // Inserting Card Image
    const img = new Image();
    img.onload = function() {
        ctx.save();
        ctx.rotate(tiltAngle * Math.PI / 180);
        ctx.translate(canvas.width-cardWidth-225 ,(canvas.height/2+cardHeight/2)-140);
        drawRoundedRect(0, 0, cardWidth- 20, cardHeight-20, cardRadius);
        ctx.clip();
        ctx.drawImage(img, 0,0 , cardHeight* img.width/img.height + 20, cardHeight + 20);
        ctx.fillStyle = "purple";
        ctx.font = "11px Arial";
        ctx.fillText("* Stream are subject for changes", 10,cardHeight/8*6);
        ctx.fillText("  (Always high chance for guerrilla stream)", 10,cardHeight/8*6+LCHeight);
        ctx.fillText("* Update announcement will be made on", 10,cardHeight/8*6+LCHeight*2);
        ctx.fillText("  Twitter / X", 10,cardHeight/8*6+LCHeight*3);
        ctx.fillText("  Twitter(X): @thenarassin", 10,cardHeight/8*6+LCHeight*4);
        // ctx.drawImage(img, canvas.width-cardWidth-225 ,(canvas.height/2+cardHeight/2)-80 , cardWidth -20, cardHeight - 20);
        ctx.restore();
    };
    img.src = 'Assets/Canvas/card.png';
     
  };
}

drawSchedule("Stream", "02/26/24", "03/03/24");