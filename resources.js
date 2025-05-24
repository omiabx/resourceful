fetch('resources.json')
    .then(response => response.json())
    .then(resources => {
        const container = document.getElementById('resources');
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
        resources.forEach(resource => {
            const card = document.createElement('div');
            card.className = resource.file.split('.')[0];
            card.id = resource.file.split('.')[0];

            const cardinfo = document.createElement('div');
            cardinfo.className = 'info'

            const header = document.createElement('h2');
            header.textContent = resource.file.split('.')[0];

            const paragraph = document.createElement('p');
            paragraph.textContent = "The best notes out there! TAGS: Physics, Edexcel, Notes, IAL, Unit 2"

            cardinfo.appendChild(header);
            cardinfo.appendChild(paragraph);
            card.appendChild(cardinfo);
            container.appendChild(card);

            card.style.backgroundSize = 'cover';
            card.style.backgroundPosition = 'center';
            card.style.backgroundRepeat = 'norepeat';


            const url = "resources/" + resource.file;
            const canvas = document.createElement('canvas');

            pdfjsLib.getDocument(url).promise.then(pdf =>{
                return pdf.getPage(1);
            }).then(page => {
                const scale = 2;
                const viewport = page.getViewport({scale});

                const context = canvas.getContext('2d');
                canvas.width = viewport.width;
                canvas.height = viewport.height;

                return page.render({
                    canvasContext: context,
                    viewport : viewport
                }).promise;
            }).then(() => {
                const dataURL = canvas.toDataURL();
                document.getElementById(card.id).style.backgroundImage = `url(${dataURL})`;
            })
        })
    })
