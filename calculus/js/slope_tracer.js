// Tracing the slope from mouse position point


var slopeTracerFunctionCanvas=document.getElementById("slope-tracer-function-canvas");
var slopeTracerDerivativeCanvas=document.getElementById("slope-tracer-derivative-canvas");

var fun = x => pow(x,2); // function 
var derivative = x=>x*2; // its derivative
var prob = "y=x"
let derivativeString = "y=1"
var functionPlotHandle, derivativePlotHandle
var xlimits=[0,1], ylimits=[0,1]
var deltaX=document.getElementById("")

var deltaX = 1;
var slopeTracerDeltaXElem = document.getElementById("slopeTracerDeltaXSlider")
slopeTracerDeltaXElem.oninput=()=>{
    deltaX = slopeTracerDeltaXElem.value*0.01;
    let label = document.getElementById("slopeTracerDeltaXLabel")
    label.innerText = "$\\Delta x$ = "+deltaX.toFixed(2);
    LaTeXrender(label)
    slopeTracerCanvasUpdate()
}
var mouse={x:0,y:0}


slopeTracerFunctionCanvas.addEventListener("mousemove",(event)=>{
    const rect = slopeTracerFunctionCanvas.getBoundingClientRect()
    mouse.x=event.clientX - rect.left;
    mouse.y=event.clientY - rect.top;
    // console.log(event)
    slopeTracerCanvasUpdate()
})


// slopeTracerProblem()

function slopeTracerProblem(prob){
    switch (prob) {
        case "y=1":
            fun = x=> 1;
            derivative = x=>0;
            derivativeString = "dy/dx=0";
            // xlimits=[-10,10]
            // ylimits=[-10,10]
            xlimits=[-5,5]
            ylimits=[-5,5]
            break;
        case "y=x":
        fun = x=> x;
        derivative = x=>1;
        derivativeString = "dy/dx=1";
        // xlimits=[-10,10]
        // ylimits=[-10,10]
        xlimits=[-5,5]
        ylimits=[-5,5]
        break;
        
        case "y=x^2":
        fun = x=> x**2;
        derivative = x=>2*x;
        derivativeString = "dy/dx=2x"
        xlimits=[-5,5]
        ylimits=[-15,15]
        break;
        
        case "y=cosx":
        fun = x=> Math.cos(x);
        derivative = x=>-Math.sin(x);
        derivativeString = "dy/dx= -sin(x)"
        // xlimits=[-Math.PI,Math.PI]
        xlimits=[-5,5]
        ylimits=[-1.5,1.5]
        break;
        case "y=sinx":
        fun = x=> Math.sin(x);
        derivative = x=> Math.cos(x);
        derivativeString = "dy/dx= cos(x)"
        // xlimits=[-Math.PI,Math.PI]
        xlimits=[-5,5]

        ylimits=[-1.5,1.5]
        break;
        
        
        default:
            console.error('problem improperly defined')

        break;
    }
    slope_tracer_setup()
    
}

function slope_tracer_setup(){
    let x = range(xlimits[0],.1,xlimits[1]);
    let y = map(x,fun);
    functionPlotHandle = figure("slope-tracer-function-canvas")
    plot(x,y,'axis','fixed','xlim',xlimits,'ylim',ylimits,'padding',60,'xlabel','','ylabel','','title','y=x^2','color','red')
    let dydx = map(x, derivative);

    derivativePlotHandle = figure("slope-tracer-derivative-canvas")
    // derivativePlotHandle.hold = true;
    plot(x,dydx,'axis','fixed','xlim',xlimits,'ylim',ylimits,'padding',60,'xlabel','','ylabel','','title',derivativeString,'color','#00f')

}









function slopeTracerCanvasUpdate(){
    slopeTracerFunctionCanvas.width = slopeTracerFunctionCanvas.clientWidth;
    slopeTracerFunctionCanvas.height = slopeTracerFunctionCanvas.clientHeight;
    
    // update function plot and slope line
    functionPlotHandle.drawLines()
    let ptx = functionPlotHandle.pxToX(mouse.x)
    let pty = map(ptx, fun)
    let pty1 = map(ptx-deltaX, fun)
    let pty2 = map(ptx+deltaX, fun)
    functionPlotHandle.drawPoint(ptx,pty,5,"#f00") // draw mouse point
    functionPlotHandle.drawLine({x:[ptx-deltaX,ptx+deltaX, ptx+deltaX],y:[pty1,pty1,pty2],color:"#f00"})
    functionPlotHandle.clearPadding()
    functionPlotHandle.drawAxes()
    
    
    // update derivative plot and height line
    // let ptdydx = map(ptx, derivative);
    let ptdydx = map(ptx, xi=> (fun(xi+deltaX)-fun(xi-deltaX))/(2*deltaX));

    derivativePlotHandle.draw()
    derivativePlotHandle.drawPoint(ptx,ptdydx,5,"#0f0") // draw mouse point
    derivativePlotHandle.drawLine({x:[ptx,ptx],y:[0,ptdydx],color:"#0f0"}) // draw mouse point
    derivativePlotHandle.drawLine({x:[-10,10],y:[0,0],color:"#000"}) // draw zero line
    
    let x = range(xlimits[0],.1,xlimits[1]);
    // let y = map(x,fun);
    let delydelx = map(x, xi=> (fun(xi+deltaX)-fun(xi-deltaX))/(2*deltaX));
    console.log(delydelx);
    derivativePlotHandle.drawLine({x:x,y:delydelx,color:"#0f0"}) // draw mouse point
}







