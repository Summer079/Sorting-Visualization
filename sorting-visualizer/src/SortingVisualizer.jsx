// src/SortingVisualizer.jsx
import React, { useState, useEffect } from 'react';
import './SortingVisualizer.css'; // We'll add styles later

const SortingVisualizer = () => {
    const [data, setData] = useState([]);
    const [isSorting, setIsSorting] = useState(false);
    const [arraySize, setArraySize] = useState(20); // Default array size
    const [sortingSpeed, setSortingSpeed] = useState(50); // Default speed (milliseconds)

    // Generate a random array of numbers whenever the array size changes
    useEffect(() => {
        generateNewData();
    }, [arraySize]);

    // Generate a new array with random numbers
    const generateNewData = () => {
        const newData = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100) + 1);
        setData(newData);
        setIsSorting(false);
    };

    // Bubble Sort Algorithm
    const bubbleSort = async () => {
        let arr = [...data];
        let n = arr.length;
        let swapped;

        setIsSorting(true);

        // Sorting process visualization
        for (let i = 0; i < n - 1; i++) {
            swapped = false;
            for (let j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap elements
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    swapped = true;
                    // Update state to trigger re-render
                    setData([...arr]);
                    // Introduce delay based on sorting speed
                    await new Promise((resolve) => setTimeout(resolve, sortingSpeed));
                }
            }
            if (!swapped) break; // Stop if array is already sorted
        }
        setIsSorting(false);
    };

    return (
        <div className="container">
            <h1>Sorting Visualization</h1>
            <div className="bar-container">
                {data.map((value, index) => (
                    <div
                        key={index}
                        className="bar"
                        style={{
                            height: `${value * 3}px`, // Adjust the height of each bar based on the value
                            width: `${(100 / arraySize) - 0.5}%`, // Bar width is proportional to the number of bars
                            margin: '0 0.25%'
                        }}
                    ></div>
                ))}
            </div>

            {/* Slider for controlling array size */}
            <div className="slider-container">
                <label>Array Size: {arraySize}</label>
                <input
                    type="range"
                    min="10"
                    max="100"
                    value={arraySize}
                    onChange={(e) => setArraySize(Number(e.target.value))}
                    disabled={isSorting}
                />
            </div>

            {/* Slider for controlling sorting speed */}
            <div className="slider-container">
                <label>Sorting Speed: {sortingSpeed} ms</label>
                <input
                    type="range"
                    min="10"
                    max="500"
                    value={sortingSpeed}
                    onChange={(e) => setSortingSpeed(Number(e.target.value))}
                    disabled={isSorting}
                />
            </div>

            {/* Buttons to generate new data and start sorting */}
            <button onClick={generateNewData} disabled={isSorting}>Generate New Array</button>
            <button onClick={bubbleSort} disabled={isSorting}>Sort with Bubble Sort</button>
        </div>
    );
};

export default SortingVisualizer;
