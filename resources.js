fetch('resources.json')
    .then(response => response.json())
    .then(resources => {
        const container = document.getElementById('resources');
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
        resources.forEach(resource => {
            const card = document.createElement('div');
            card.className = 'card';
            card.id = resource.file.split('.')[0];


            const cardinfo = document.createElement('div');
            cardinfo.id = 'carddata';

            const header = document.createElement('h3');
            header.textContent = resource.name;
            header.class = 'header'

            const paragraph = document.createElement('p');
            paragraph.textContent = "The best notes out there! TAGS: Physics, Edexcel, Notes, IAL, Unit 2"

            const BTNs = document.createElement('div');
            BTNs.id = 'btns';

            const downloadBTN = document.createElement('button');
            downloadBTN.textContent = 'Download';
            const ViewBTN = document.createElement('button');
            ViewBTN.textContent = 'View';


            BTNs.appendChild(downloadBTN);
            BTNs.appendChild(ViewBTN);
            cardinfo.appendChild(header);
            cardinfo.appendChild(paragraph);
            cardinfo.appendChild(BTNs);
            card.appendChild(cardinfo);
            container.appendChild(card);

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
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', function () {
            const input = searchInput.value.toLowerCase();
            const resourceItems = document.getElementsByClassName('card');
            const inputArray = input.split(' ');
            for (let i = 0; i < resourceItems.length; i++) {
                let valid = true;
                const itemText = resourceItems[i].innerText.toLowerCase();
                for (let x = 0; x < inputArray.length; x++){
                    if (itemText.includes(inputArray[x]) == false){
                        valid = false;
                    }
                }

                if (valid == true){
                    resourceItems[i].style.display = '';
                }else{
                    resourceItems[i].style.display = 'none';
                }
            }
        });
    })
