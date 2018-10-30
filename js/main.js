const width = 800;
const height = 600;
const margin = {left: 100, top: 50, right: 50, bottom: 100};
const svgWidth = width + margin.left + margin.right;
const svgHeight = height + margin.top + margin.bottom;

var svg = d3.select('body').append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

svg.append('text')
    .text('BTS Member Heights')
    .attr('x', width/2)
    .attr('y', -20)
    .attr('text-anchor', 'middle')
    .attr('class', 'title');

svg.append('text')
    .text('BTS Member Names')
    .attr('x', width/2)
    .attr('y', height + 100)
    .attr('text-anchor', 'middle')
    .attr('class', 'nameTitle');

svg.append('text')
    .text('Height(cm)')
    .attr('x', -50)
    .attr('y', height /2)
    .attr('transform', `rotate(-90, -50, ${height/2})`)
    .attr('class', 'nameTitle');

    

d3.csv('bts.csv').then((data) => {
    let names = [];
    data.forEach(element => {
        element.height = +element.height;
        names.push(element.name);
    })
    const heightMax = d3.max(data, d => d.height);
    const heightMin = d3.min(data, d => d.height);
    
    const yScale = d3.scaleLinear()
        .domain([heightMin - 1, heightMax + 1])
        .range([height, 0]);

    const xScale = d3.scaleBand()
        .domain(names)
        .range([0, width])
        .padding(0.1);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append('g')
        .call(xAxis)
        .attr('transform', `translate(0, ${height})`)
        .attr('class', 'axis');

    svg.append('g')
        .call(yAxis)
        .attr('class', 'axis');

    svg.selectAll('image')
        .data(data)
        .enter()
        .append('image')
            .attr('x', (d) => {
                return xScale(d.name) + 25;
            })
            .attr('y', 0)
            .attr('opacity', 0.1)
            .attr('xlink:href', d => {
                var imageName;
                if (d.name == "Kim Taehyung"){
                    imageName = "assets/v.png";
                }
                else if (d.name == "Kim Namjoon"){
                    imageName = "assets/rm.png";
                }
                else if (d.name == "Park Jimin"){
                    imageName = "assets/jimin.png";
                }
                else if (d.name == "Jeon Jeong-guk"){
                    imageName = "assets/jungkook.png";
                }
                else if (d.name == "Min Yoongi"){
                    imageName = "assets/suga.png";
                }
                else if (d.name == "Kim Seokjin"){
                    imageName = "assets/jin.png";
                }
                else if (d.name == "Jung Hoseok"){
                    imageName = "assets/jhope.png";
                }
                return imageName;
            })
            .attr('width', '50')
            .attr('height', '50')
            .transition()
            .attr('opacity', '1')
            .attr('y', d => yScale(d.height)-25)
            .duration(1200);
})