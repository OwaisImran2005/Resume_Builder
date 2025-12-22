// Function to update resume preview in real-time
function updateResume() {
    // 1. Get values from input fields
    const name = document.getElementById('nameInput').value;
    const title = document.getElementById('titleInput').value;
    const phone = document.getElementById('phoneInput').value;
    const email = document.getElementById('emailInput').value;
    const address = document.getElementById('addressInput').value;
    const objective = document.getElementById('objectiveInput').value;
    const eduRaw = document.getElementById('eduInput').value;
    const skillsRaw = document.getElementById('skillsInput').value;
    const interests = document.getElementById('interestsInput').value;

    document.getElementById('nameDisplay').innerText = name || "YOUR NAME";
    document.getElementById('titleDisplay').innerText = title || "PROFESSIONAL TITLE";
    document.getElementById('phoneDisplay').innerText = phone ? `📞 ${phone}` : "";
    document.getElementById('emailDisplay').innerText = email ? `✉️ ${email}` : "";
    document.getElementById('addressDisplay').innerText = address ? `📍 ${address}` : "";
    document.getElementById('objectiveDisplay').innerText = objective || "Write something about yourself...";
    document.getElementById('interestsDisplay').innerText = interests || "Your interests here...";

    // 3. Handle Lists (Education)
    // We split by new line to create paragraphs
    const eduContainer = document.getElementById('eduDisplay');
    eduContainer.innerHTML = ''; // Clear current
    const eduLines = eduRaw.split('\n');
    eduLines.forEach(line => {
        if(line.trim().length > 0) {
            let p = document.createElement('p');
            p.innerText = line;
            eduContainer.appendChild(p);
        }
    });

    // 4. Handle Skills (Comma separated)
    const skillsContainer = document.getElementById('skillsDisplay');
    skillsContainer.innerHTML = '';
    const skillsArray = skillsRaw.split(',');
    skillsArray.forEach(skill => {
        if(skill.trim().length > 0) {
            let span = document.createElement('span');
            span.innerText = skill.trim();
            skillsContainer.appendChild(span);
        }
    });
}


function loadImage(event) {
    const file = event.target.files[0];
    if (!file) return;

    // We use FileReader to convert the image to Base64
    // This ensures html2pdf can render it correctly
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const image = document.getElementById('profileDisplay');
        image.src = e.target.result;
    };
    
    reader.readAsDataURL(file);
}

function downloadPDF() {
    const element = document.getElementById('resume-template');
    
    const opt = {
        margin:       0,
        filename:     'my_resume.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 }, // Higher scale = better quality
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };


    // Execute download
    html2pdf().set(opt).from(element).save();
}