

const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        // Check if mutation added nodes with class 'copy-button'
        const addedNodes = Array.from(mutation.addedNodes);
        const copyButtonParent = addedNodes.find(node => {
            return node.querySelector && node.querySelector('button.flex.gap-1.items-center');
        });

        if (copyButtonParent) {
            const saveButton = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            saveButton.setAttribute('width', '36');
            saveButton.setAttribute('height', '36');
            saveButton.setAttribute('viewBox', '0 0 36 36');
            saveButton.classList.add('svg-icon');
            saveButton.style.fill = 'grey'; // Set the fill color
            saveButton.style.cursor = 'pointer'; // Set the cursor to pointer

            // Create SVG path
            const svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            svgPath.setAttribute('d', 'M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5');
            svgPath.setAttribute('d', 'M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z');
         // Append SVG path to SVG element
            saveButton.appendChild(svgPath);

            // Add click event listener
            saveButton.addEventListener('click', () => {
                // Get content to save
                const copyRelatedField = copyButtonParent.parentNode.querySelector('pre');
                let raw_content = copyRelatedField ? copyRelatedField.textContent : '';
                let lines = raw_content.split('\n');
                lines[0] = lines[0].replace(/.*Copy code/, '');
                let content = lines.join('\n');

                console.log(content);
                // Save content to file
                if (content) {
                    const blob = new Blob([content], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'copied_content.txt';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                }
            });

            // Insert 'Save to File' button after the copy button parent
            copyButtonParent.parentNode.insertBefore(saveButton, copyButtonParent.nextSibling);
        }
    });
});


// Start observing the DOM for mutations
observer.observe(document.body, { childList: true, subtree: true });

