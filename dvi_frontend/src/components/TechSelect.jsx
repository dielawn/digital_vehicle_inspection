import React, { useState, useEffect } from "react";

export const TechSelector = ({ tech, setTech }) => {
    
    const techOptions = ['Alice', 'Bob', 'Carol', 'Dillon'];
        
    return (
        <div>
            <label htmlFor="techSelect">Select Tech: </label>
            <select 
                id="techSelect"
                value={tech} 
                onChange={(e) => setTech(e.target.value)} 
            >
                {techOptions.map((techOption) => (
                    <option key={techOption} value={techOption}>
                        {techOption}
                    </option>
                ))}
            </select>
        </div>
    )
}   