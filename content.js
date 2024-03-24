// Observe changes in the DOM
const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        // Check if mutation added nodes with class 'copy-button'
        const addedNodes = Array.from(mutation.addedNodes);
        const copyButtonParent = addedNodes.find(node => {
            return node.querySelector && node.querySelector('button.flex.gap-1.items-center');
        });
        
        if (copyButtonParent) {
            // Create 'Save to File' button
            const saveButton = document.createElement('button');
            saveButton.textContent = 'Save to File';
            saveButton.classList.add('save-button');
            
            // Add click event listener
            saveButton.addEventListener('click', () => {
                // Get content to save
                const copyRelatedField = copyButtonParent.previousElementSibling;
                const content = copyRelatedField ? copyRelatedField.textContent : '';

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

