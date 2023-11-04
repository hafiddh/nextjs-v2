'use client'

import React, { useState } from 'react'

export default function GetFromAPI() {
    const [data, setData] = useState([])

    const callAPI = async () => {
        try {
            const res = await fetch(
                `https://data.morowalikab.go.id/api/data`,
                {
                    method: 'GET',
                }
            );
            const data = await res.json();
            setData(data.dataset)
            console.log(data.dataset);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <button onClick={callAPI}>Make API call</button>
            {data ? (
                data.map((data) => (
                    <ul key={data.identifier}>
                        <li>* {data.title}</li>
                    </ul>
                ))
            ) : (
                <h1> NO DATA</h1>
            )}
        </div>
    )
}
