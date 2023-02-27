class CanvasController{
    constructor(canvasId){
        this.canvasId = canvasId;
        this.canvas = document.getElementById(canvasId);
        this.canvas.height = this.canvas.clientHeight;
        this.canvas.width  = this.canvas.clientWidth;
        this.mouseX = 0;
        this.mouseY = 0;
        this.mouseDropX = 0;
        this.mouseDropY = 0;
        this.canvas.addEventListener('click',(e)=>{
            this.update()
        })
        this.drag = false;


        // ADDING EVENT LISTENERS
		this.canvas.addEventListener('mousedown', (e) => {
			this.drag = true;
			this.mouseX=e.x;
			this.mouseY=e.y;
		});
		this.canvas.addEventListener('touchstart', (e) => {
			e.preventDefault();
			this.drag = true;
			this.mouseX=e.touches[0].clientX;
			this.mouseY=e.touches[0].clientY;
		});
		// RELEASE
		this.canvas.addEventListener('mouseup', (e) => {
			this.drag=false;
			this.mouseDropX=e.x;
			this.mouseDropY=e.y;
		});
		this.canvas.addEventListener('touchend', (e) => {
			e.preventDefault();
			this.mouseDropX=this.mouseX;
			this.mouseDropY=this.mouseY;
			this.drag=false;
		});
		
		// MOUSE POSITION LISTENER
		this.canvas.addEventListener('mousemove', (e) => {
			this.mouseX=e.x;
			this.mouseY=e.y;
		});
		this.canvas.addEventListener('touchmove', (e) => {
			e.preventDefault();
			this.mouseX=e.touches[0].clientX;
			this.mouseY=e.touches[0].clientY;
		});

    }
    update(){
                    let h = figure(this.canvasId)
                    h.axis='fixed';
                    console.log(h);
        plot([0,h.pxToX(this.mouseX)],[0,h.pxToY(this.mouseY)]);
        // let c = this.canvas.getContext('2d');
        // c.clearRect(0,0,this.canvas.width,this.canvas.height)
        // c.strokeStyle= colorCode//"rgb(200,200,200)"; // from color value
        // c.lineWidth = this.lineWidth
        // c.beginPath()
        // c.moveTo(this.canvas.width/2, this.canvas.height/2)
        // for (let index = 0; index <= x.length; index++) {
        //     c.lineTo(this.xtoPx(x[index]), this.ytoPx(y[index]));
        // }
        // c.stroke();
    }





}

let eigenController = new CanvasController("eigenCanvas")



// function animate(){
//     eigenController.update();
//     requestAnimationFrame(animate)
// }
// animate()

