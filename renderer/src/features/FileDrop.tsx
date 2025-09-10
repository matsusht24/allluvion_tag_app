import React, { useState} from "react";
import type { DragEvent, ChangeEvent } from "react";

function FileDrop() {
    const [fileName, setFileName] = useState<string | null>(null);

    //Handle Drag over event
    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    //Handle Drop event
    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.name.endsWith('.xlsx')) {
            setFileName(file.name);
            // Send to Electron main process for further processing
            window.electronAPI.openFile(file.path);
        } else {
            alert("Please drop a valid .xlsx file.");
        }
    };

    //Handle manual file select
    const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.name.endsWith('.xlsx')) {
            setFileName(file.name);
            window.electronAPI.openFile(file.path);
        } else {
            alert("Please select a valid .xlsx file.");
        }
    };

        
    return (
        <div 
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="file-drop-area">
            <p>Drag and drop an .xlsx file here, or click to select a file.</p>
            <input 
                type="file" 
                accept=".xlsx"
                onChange={handleFileSelect}
                className="file-input"
                id="fileInput"
            />
            <label htmlFor="fileInput" className="file-input-label">
                {fileName ? `Selected file: ${fileName}` : "Choose a file"}
            </label>


        </div>
    )
}

export default FileDrop;
