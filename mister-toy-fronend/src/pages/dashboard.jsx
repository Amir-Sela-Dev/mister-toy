import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale } from 'chart.js';
import { Doughnut, PolarArea, Pie } from 'react-chartjs-2';
import { toyService } from '../services/toy.service.js'
import { useSelector } from 'react-redux';
import { loadToys } from '../store/toy.action.js';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);


export function Dashboard() {
    const [toysTypeNum, setToysTypeNum] = useState({})
    const [toysAvgPrice, setToysAvgPrice] = useState({})
    // let { toys } = useSelector((storeState) => storeState.toyModule)
    const { toys } = useSelector((storeState) => storeState.toyModule)

    useEffect(() => {
        loadToys()
    }, [])

    useEffect(() => {
        if (toys.length) {
            getToysTypeNum()
        }
    }, [toys])



    function getToysTypeNum() {
        let toysTypeNum = {}
        console.log(toys);
        if (!toys) return

        toys.forEach(toy => {
            toy.lables.forEach(lable => {
                if (!toysTypeNum[lable]) {
                    toysTypeNum[lable] = 1
                } else {
                    toysTypeNum[lable] += 1
                }
                return toysTypeNum
            })
        })
        setToysTypeNum(toysTypeNum)
        let toysAvgPrice = {}

        let toysLables = Object.keys(toysTypeNum)
        console.log(toysLables);
        toysLables.forEach(type => {
            let filteredToys = toys.filter(toy => toy.lables.includes(type))
            console.log(filteredToys);
            let count = 0
            let avg = 0
            filteredToys.forEach(toy => {
                count += toy.price
            })
            avg = count / filteredToys.length
            toysAvgPrice[type] = avg

        })
        setToysAvgPrice(toysAvgPrice)
        console.log(toysAvgPrice);
    }




    const data = {
        lables: Object.keys(toysTypeNum),
        datasets: [
            {
                label: 'Inventory by type',
                data: Object.values(toysTypeNum),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                    'rgba(155, 159, 34, 0.7)',
                    'rgba(55, 209, 4, 0.7)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(155, 159, 34, 0.7)',
                    'rgba(55, 209, 4, 0.7)',

                ],
                borderWidth: 2,
            },
        ],
    };
    const priceData = {
        lables: Object.keys(toysAvgPrice),
        datasets: [
            {
                label: 'Avg price of type in $',
                data: Object.values(toysAvgPrice),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                    'rgba(155, 159, 34, 0.7)',
                    'rgba(55, 209, 4, 0.7)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(155, 159, 34, 0.7)',
                    'rgba(55, 209, 4, 0.7)',

                ],
                borderWidth: 2,
            },
        ],
    };
    return (
        <div style={{ width: '40%', margin: 'auto', display: 'flex', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>Inventory by type</h2>
                <Pie data={data} />
            </div>
            <div style={{ textAlign: 'center' }}>
                <h2>Avg prices by type </h2>
                <Doughnut data={priceData} />
            </div>
        </div>



    )
}
