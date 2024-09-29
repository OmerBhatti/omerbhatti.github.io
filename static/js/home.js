document.addEventListener('DOMContentLoaded', () => {
    // Typewriter effect
    const titleTypewriter = new Typewriter('#title', {
        strings: ['Software Engineer', 'Full Stack Developer', 'Open Source Contributor'],
        autoStart: true,
        loop: true,
        startDelay: 2000,
    });

    // Three.js setup
    const canvas = document.getElementById('cube-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);

    let geometry = new THREE.OctahedronGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    let mesh = new THREE.Mesh(geometry, material);
    let isSphere = false;
    
    // Projects terminal
    const projectsTerminal = document.createElement('div');
    projectsTerminal.id = 'projects-terminal';
    projectsTerminal.style.display = 'none';
    projectsTerminal.innerHTML = `
<div class="flex-between" style="margin-bottom: 20px;">
<h2>Projects</h2>
<div class="flex">
<div class="terminal-button"></div>
<div class="terminal-button"></div>
<div class="terminal-button"></div>
</div>
</div>
<div id="projects-container">

<div class="project">
<h3>Workstream - ERP</h3>
<div class="code">It is Arbisoft's in-house ERP in the making which empowers organizations to manage internal HR and accounts functions solutions. Reduced manual work by automation of different tasks, invoices, user profiles, HR functions (annual reviews, increments, bonuses), expense and leave management and many more

As part of workstream i worked on a lot of features, bug fixes, optimization and improvements some are stated below:

 - Developed and integrated help-desk micro-service to troubleshoot issues related to different departments.
 - Completely designed and developed stock management module to keep track of company stocks.
 - Created a complete kanban module to manage open source tasks within different teams.
 - Optimization of unit-tests runtime by 70% and coverage to 90+.
 - Optimized app performance by creating/updating api's with least DB hits.
 - Made leaves module dynamic and optimized the code.
 - Dockerize the app for easy setup.
</div>
</div>

<div class="project">
<h3>Lazy AI - (AI Powered App Builder)</h3>
<div class="code">Lazy AI is a web app builder powered by AI which can build and modify web apps with prompts and deploy to the cloud with 1 click.

 - Created multiple apps (Chatbot, DiscordBot, Instagram/Tiktok/Youtube LinkTracker, Link Shortener and location tracker, M3U8 url streaming)
 - Fixing code written by AI
 - Writing propmpts for better AI usage
</div>
</div>

<div class="project">
<h3>NPM Packages</h3>
<div class="code">I have published several NPM packages in my free time, focusing on creating reusable and efficient modules that solve common problems in web development. These packages are designed to be lightweight, well-documented, and easy to integrate into various JavaScript projects.

link: <a href="https://www.npmjs.com/~omer_bhatti" target="_blank">https://www.npmjs.com/~omer_bhatti</a></div>
</div>

<div class="project">
<h3>Lowcoder</h3>
<div class="code">An Open Source drag and drop website builder.

I fixed many components and added new components in it.</div>
</div>

</div>
    `;
    document.body.appendChild(projectsTerminal);
    scene.add(mesh);

    camera.position.z = 5;

    let scrollPosition = 0;

    function animate() {
        requestAnimationFrame(animate);

        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;

        renderer.render(scene, camera);
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', onWindowResize);

    window.addEventListener('scroll', () => {
        scrollPosition = window.scrollY;
        console.log(scrollPosition);
        
        // Calculate zoom based on scroll position
        let zoomFactor = Math.max(0, 1 + scrollPosition / 200);
        const fadeFactor = Math.max(0, 1 - scrollPosition / 40);

        if (scrollPosition >= 500) {
            zoomFactor = Math.max(0, 1 + scrollPosition / 5000);
            
            // Replace octahedron with sphere
            if (!isSphere) {
                scene.remove(mesh);
                geometry = new THREE.SphereGeometry(1, 20, 20);
                mesh = new THREE.Mesh(geometry, material);
                scene.add(mesh);
                isSphere = true;
            }
        } else {
            // Replace sphere with octahedron
            if (isSphere) {
                scene.remove(mesh);
                geometry = new THREE.OctahedronGeometry();
                mesh = new THREE.Mesh(geometry, material);
                scene.add(mesh);
                isSphere = false;
            }
        }

        // Update camera position
        camera.position.z = 5 + (1 - zoomFactor) * 20;
        
        // Fade out typewriter
        const typewriterContainer = document.getElementById('typewriter-container');
        typewriterContainer.style.opacity = fadeFactor;
        
        // Stop typewriter when fully zoomed out
        if (fadeFactor === 0) {
            titleTypewriter.stop();
        } else {
            titleTypewriter.start();
        }
        
        // Show projects terminal when scroll reaches 50
        const projectsTerminal = document.getElementById('projects-terminal');
        const projectsContainer = document.getElementById('projects-container');
        if (scrollPosition >= 50) {
            projectsTerminal.style.display = 'block';
            projectsTerminal.style.opacity = Math.min(1, (scrollPosition - 50) / 100);
            projectsTerminal.style.transform = `translate(-50%, -50%) scale(${Math.min(1, (scrollPosition - 50) / 100)})`;
        } else {
            projectsContainer.scrollTo({ top: 0 });
            projectsTerminal.style.display = 'none';
        }
        
        // Fade out projects terminal
        if (scrollPosition >= 400) {
            const fadeOutFactor = Math.max(0, 1 - (scrollPosition - 400) / 100);
            projectsTerminal.style.opacity = fadeOutFactor;
            if (fadeOutFactor === 0) {
                projectsTerminal.style.display = 'none';
            }
        }
        
        // Show skills section
        const skillsSection = document.getElementById('skills-section');
        if (scrollPosition >= 500) {
            skillsSection.style.display = 'block';
            const translateY = Math.max(0, 100 - (scrollPosition - 500) / 2);
            skillsSection.style.transform = `translateY(${translateY}%)`;
            skillsSection.style.opacity = Math.min(1, (scrollPosition - 500) / 100);
        } else {
            skillsSection.style.display = 'none';
        }
    });

    animate();
});
