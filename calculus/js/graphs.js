const graphCanvas = document.getElementById("graphs")




var graphFunction = x=>1

function plotFunction(fun){

    graphCanvas.width = graphCanvas.clientWidth;
    graphCanvas.height = graphCanvas.clientHeight;
    let x = linspace(-5,5,200);
    let y=map(x,fun);
    figure("graphs")
    plot(x,y,'axis','fixed','xlim',[-5,5],'ylim',[-5,5],'color','#f00','lineWidth',15,'fontSize',20,'xTicks',range(-5,5),'yTicks',range(-5,5))

}