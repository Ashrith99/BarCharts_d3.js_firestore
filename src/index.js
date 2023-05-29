import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDlS1Zmz7dchPgjezE1JkOHY2i6BC2PQGQ",
    authDomain: "neww-7042b.firebaseapp.com",
    projectId: "neww-7042b",
    storageBucket: "neww-7042b.appspot.com",
    messagingSenderId: "669314217573",
    appId: "1:669314217573:web:da1d67ba6a53b8db8bb88c"
};

initializeApp(firebaseConfig);

export const db = getFirestore()

const col = collection(db, 'dishes')

//   getDocs(col)
//     .then((snapshot)=>{
//         let books = []
//         snapshot.docs.forEach((doc) => {

//             books.push({...doc.data(),id: doc.id})

//         })
//         console.log(books)

//     })
//     .catch(err=>{
//         console.log(err.message)
//     })




const svg = d3.select('.canvas')
    .append('svg')
    .attr('width', 600)
    .attr('height', 600);

// create margins & dimensions
const margin = { top: 20, right: 20, bottom: 100, left: 100 };
const graphWidth = 600 - margin.left - margin.right;
const graphHeight = 600 - margin.top - margin.bottom;

const graph = svg.append('g')
    .attr('width', graphWidth)
    .attr('height', graphHeight)
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

// create axes groups
const xAxisGroup = graph.append('g')
    .attr('transform', `translate(0, ${graphHeight})`)

const yAxisGroup = graph.append('g');


getDocs(col)
    .then((res) => {
        var data = []
        res.docs.forEach((doc) => {

            data.push(doc.data(),)

        })
        console.log(data)

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.orders)])
            .range([graphHeight, 0]);

        const x = d3.scaleBand()
            .domain(data.map(item => item.name))
            .range([0, graphWidth])
            .paddingInner(0.2)
            .paddingOuter(0.2);

        // join the data to circs
        const rects = graph.selectAll('rect')
            .data(data);

        // add attrs to circs already in the DOM
        rects.attr('width', x.bandwidth)
            .attr("height", d => graphHeight - y(d.orders))
            .attr('fill', 'orange')
            .attr('x', d => x(d.name))
            .attr('y', d => y(d.orders));

        // append the enter selection to the DOM
        rects.enter()
            .append('rect')
            .attr('width', x.bandwidth)
            .attr("height", d => graphHeight - y(d.orders))
            .attr('fill', 'orange')
            .attr('x', (d) => x(d.name))
            .attr('y', d => y(d.orders));

        // create & call axesit
        const xAxis = d3.axisBottom(x);
        const yAxis = d3.axisLeft(y)
            .ticks(3)
            .tickFormat(d => d + ' orders');

        xAxisGroup.call(xAxis);
        yAxisGroup.call(yAxis);

        xAxisGroup.selectAll('text')
            .attr('fill', 'orange')
            .attr('transform', 'rotate(-40)')
            .attr('text-anchor', 'end')     

    })
    .catch(err => {
        console.log(err.message)
    })

