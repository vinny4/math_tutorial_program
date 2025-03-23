// JavaScript for Year 5 Math Adventure

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Store all main content sections
    const sections = {
        home: document.getElementById('hero'),
        features: document.getElementById('features'),
        topics: document.getElementById('topics'),
        sampleGame: document.getElementById('sample-game'),
        testimonials: document.getElementById('testimonials'),
        getStarted: document.getElementById('get-started')
    };
    
    // Navigation active state and section display
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active state
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
            
            // Get the target section id from the href attribute
            const targetId = this.getAttribute('href').substring(1);
            
            // Handle special cases like login/register
            if (targetId === 'login') {
                showLoginModal();
                return;
            }
            
            if (targetId === 'register') {
                showRegisterModal();
                return;
            }
            
            // Show the target section
            showSection(targetId);
        });
    });
    
    // Handle all other links within the page
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            
            // Handle special cases
            if (targetId === 'login') {
                showLoginModal();
                return;
            }
            
            if (targetId === 'register') {
                showRegisterModal();
                return;
            }
            
            if (targetId === 'play-game') {
                showGameModal();
                return;
            }
            
            if (targetId === 'number-algebra' || targetId === 'measurement-geometry' || targetId === 'statistics-probability') {
                showTopicDetail(targetId);
                return;
            }
            
            if (targetId === 'start') {
                showSection('topics');
                return;
            }
            
            if (targetId === 'about') {
                showSection('features');
                return;
            }
            
            // Show the target section for regular navigation
            showSection(targetId);
        });
    });
    
    // Function to show a specific section
    function showSection(sectionId) {
        // Hide all sections first
        Object.values(sections).forEach(section => {
            if (section) {
                section.style.display = 'none';
            }
        });
        
        // Show the target section
        if (sections[sectionId]) {
            sections[sectionId].style.display = 'flex';
            
            // Scroll to the section
            sections[sectionId].scrollIntoView({ behavior: 'smooth' });
        } else {
            // If section doesn't exist in our mapping, try to find it by ID
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.style.display = 'block';
                targetSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                // Default to home if section not found
                sections.home.style.display = 'flex';
                sections.features.style.display = 'block';
                sections.topics.style.display = 'block';
                sections.sampleGame.style.display = 'block';
                sections.testimonials.style.display = 'block';
                sections.getStarted.style.display = 'flex';
            }
        }
    }
    
    // Function to show topic detail
    function showTopicDetail(topicId) {
        // Create modal for topic detail
        const topicModal = document.createElement('div');
        topicModal.className = 'topic-modal';
        
        let topicTitle, topicContent, topicImage;
        
        // Set content based on topic ID
        if (topicId === 'number-algebra') {
            topicTitle = 'Number and Algebra';
            topicImage = 'images/number-algebra.png';
            topicContent = `
                <p>In Year 5, students develop their understanding of number and algebra concepts through various activities and exercises.</p>
                
                <h4>Key Learning Areas:</h4>
                <ul>
                    <li><strong>Place Value and Decimals:</strong> Understanding the place value system to millions and thousandths.</li>
                    <li><strong>Addition and Subtraction Strategies:</strong> Using efficient mental and written strategies for addition and subtraction.</li>
                    <li><strong>Multiplication and Division:</strong> Solving problems involving multiplication of large numbers by one or two-digit numbers.</li>
                    <li><strong>Fractions and Decimals:</strong> Comparing, ordering, and representing fractions with related denominators.</li>
                    <li><strong>Money and Financial Mathematics:</strong> Creating simple financial plans and calculating percentages.</li>
                    <li><strong>Patterns and Algebra:</strong> Finding unknown quantities in number sentences and creating sequences.</li>
                </ul>
                
                <h4>Sample Activities:</h4>
                <div class="activity-examples">
                    <div class="activity">
                        <h5>Decimal Place Value Game</h5>
                        <p>Arrange decimal numbers on a number line and identify their place value.</p>
                        <button class="btn topic-btn">Try Activity</button>
                    </div>
                    <div class="activity">
                        <h5>Fraction Wall Explorer</h5>
                        <p>Visualize and compare fractions using interactive fraction walls.</p>
                        <button class="btn topic-btn">Try Activity</button>
                    </div>
                    <div class="activity">
                        <h5>Pattern Detective</h5>
                        <p>Identify and continue number patterns, then create your own.</p>
                        <button class="btn topic-btn">Try Activity</button>
                    </div>
                </div>
            `;
        } else if (topicId === 'measurement-geometry') {
            topicTitle = 'Measurement and Geometry';
            topicImage = 'images/measurement-geometry.png';
            topicContent = `
                <p>Year 5 students explore measurement and geometry concepts through hands-on activities and problem-solving.</p>
                
                <h4>Key Learning Areas:</h4>
                <ul>
                    <li><strong>Units of Measurement:</strong> Converting between common metric units of length, mass, and capacity.</li>
                    <li><strong>Shape Properties:</strong> Connecting three-dimensional objects with their nets and two-dimensional representations.</li>
                    <li><strong>Location and Transformation:</strong> Using a grid reference system to describe locations and describe routes.</li>
                    <li><strong>Geometric Reasoning:</strong> Measuring and constructing different angles using a protractor.</li>
                    <li><strong>Perimeter and Area:</strong> Calculating the perimeter and area of rectangles using formal units.</li>
                    <li><strong>Time and Calendars:</strong> Comparing 12- and 24-hour time systems and interpreting timetables.</li>
                </ul>
                
                <h4>Sample Activities:</h4>
                <div class="activity-examples">
                    <div class="activity">
                        <h5>Shape Explorer</h5>
                        <p>Identify 3D shapes and their properties, then create nets for them.</p>
                        <button class="btn topic-btn">Try Activity</button>
                    </div>
                    <div class="activity">
                        <h5>Angle Measurer</h5>
                        <p>Practice measuring and drawing angles with a virtual protractor.</p>
                        <button class="btn topic-btn">Try Activity</button>
                    </div>
                    <div class="activity">
                        <h5>Area and Perimeter Challenge</h5>
                        <p>Calculate area and perimeter of various shapes in real-world contexts.</p>
                        <button class="btn topic-btn">Try Activity</button>
                    </div>
                </div>
            `;
        } else if (topicId === 'statistics-probability') {
            topicTitle = 'Statistics and Probability';
            topicImage = 'images/statistics-probability.png';
            topicContent = `
                <p>In Year 5, students develop their understanding of statistics and probability through data collection, representation, and analysis.</p>
                
                <h4>Key Learning Areas:</h4>
                <ul>
                    <li><strong>Chance Experiments:</strong> Listing outcomes of chance experiments with equally likely outcomes.</li>
                    <li><strong>Data Collection:</strong> Posing questions and collecting categorical or numerical data by observation or survey.</li>
                    <li><strong>Data Representation:</strong> Constructing displays including column graphs, dot plots, and tables.</li>
                    <li><strong>Data Interpretation:</strong> Interpreting and comparing data displays and discussing their effectiveness.</li>
                    <li><strong>Probability Scales:</strong> Using 0-1 scale to describe the likelihood of everyday events.</li>
                    <li><strong>Predicting Outcomes:</strong> Making predictions based on data displays and probability experiments.</li>
                </ul>
                
                <h4>Sample Activities:</h4>
                <div class="activity-examples">
                    <div class="activity">
                        <h5>Data Detective</h5>
                        <p>Collect, organize, and display data, then answer questions about it.</p>
                        <button class="btn topic-btn">Try Activity</button>
                    </div>
                    <div class="activity">
                        <h5>Probability Spinner</h5>
                        <p>Experiment with spinners to understand probability concepts.</p>
                        <button class="btn topic-btn">Try Activity</button>
                    </div>
                    <div class="activity">
                        <h5>Graph Creator</h5>
                        <p>Create different types of graphs and analyze the data they represent.</p>
                        <button class="btn topic-btn">Try Activity</button>
                    </div>
                </div>
            `;
        }
        
        topicModal.innerHTML = `
            <div class="topic-modal-content">
                <span class="close-modal">&times;</span>
                <div class="topic-header">
                    <img src="${topicImage}" alt="${topicTitle}" class="topic-detail-image">
                    <h2>${topicTitle}</h2>
                </div>
                <div class="topic-body">
                    ${topicContent}
                </div>
                <div class="topic-footer">
                    <button class="btn primary-btn">Start Learning This Topic</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(topicModal);
        
        // Add styles for the modal
        const modalStyle = document.createElement('style');
        modalStyle.textContent = `
            .topic-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                overflow-y: auto;
            }
            
            .topic-modal-content {
                background-color: white;
                padding: 2rem;
                border-radius: 15px;
                width: 90%;
                max-width: 800px;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            }
            
            .close-modal {
                position: absolute;
                top: 10px;
                right: 20px;
                font-size: 2rem;
                cursor: pointer;
                color: #5a5c69;
            }
            
            .topic-header {
                display: flex;
                align-items: center;
                margin-bottom: 1.5rem;
                flex-wrap: wrap;
            }
            
            .topic-detail-image {
                width: 100px;
                height: 100px;
                object-fit: cover;
                border-radius: 10px;
                margin-right: 1.5rem;
            }
            
            .topic-header h2 {
                color: #4e73df;
                margin: 0;
                font-size: 2rem;
            }
            
            .topic-body {
                margin-bottom: 1.5rem;
            }
            
            .topic-body h4 {
                color: #4e73df;
                margin-top: 1.5rem;
                margin-bottom: 1rem;
            }
            
            .topic-body ul {
                padding-left: 1.5rem;
                margin-bottom: 1.5rem;
            }
            
            .topic-body li {
                margin-bottom: 0.5rem;
            }
            
            .activity-examples {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 1rem;
                margin-top: 1rem;
            }
            
            .activity {
                background-color: #f8f9fc;
                padding: 1rem;
                border-radius: 10px;
            }
            
            .activity h5 {
                color: #4e73df;
                margin-top: 0;
                margin-bottom: 0.5rem;
            }
            
            .activity p {
                margin-bottom: 1rem;
            }
            
            .topic-footer {
                text-align: center;
            }
        `;
        
        document.head.appendChild(modalStyle);
        
        // Close modal functionality
        const closeModal = document.querySelector('.close-modal');
        closeModal.addEventListener('click', function() {
            document.body.removeChild(topicModal);
            document.head.removeChild(modalStyle);
        });
        
        // Close modal when clicking outside
        topicModal.addEventListener('click', function(e) {
            if (e.target === topicModal) {
                document.body.removeChild(topicModal);
                document.head.removeChild(modalStyle);
            }
        });
    }
    
    // Function to show login modal
    function showLoginModal() {
        // Create login modal
        const loginModal = document.createElement('div');
        loginModal.className = 'login-modal';
        
        loginModal.innerHTML = `
            <div class="login-modal-content">
                <span class="close-modal">&times;</span>
                <h2>Login to Math Adventure</h2>
                <form id="login-form">
                    <div class="form-group">
                        <label for="login-email">Email Address</label>
                        <input type="email" id="login-email" required>
                    </div>
                    <div class="form-group">
                        <label for="login-password">Password</label>
                        <input type="password" id="login-password" required>
                    </div>
                    <button type="submit" class="btn primary-btn">Login</button>
                </form>
                <div class="form-feedback"></div>
                <p class="register-link">Don't have an account? <a href="#register">Register here</a></p>
            </div>
        `;
        
        document.body.appendChild(loginModal);
        
        // Add styles for the modal
        const modalStyle = document.createElement('style');
        modalStyle.textContent = `
            .login-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            }
            
            .login-modal-content {
                background-color: white;
                padding: 2rem;
                border-radius: 15px;
                width: 90%;
                max-width: 400px;
                position: relative;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            }
            
            .close-modal {
                position: absolute;
                top: 10px;
                right: 20px;
                font-size: 2rem;
                cursor: pointer;
                color: #5a5c69;
            }
            
            .form-group {
                margin-bottom: 1.5rem;
            }
            
            .form-group label {
                display: block;
                margin-bottom: 0.5rem;
                font-weight: 600;
            }
            
            .form-group input {
                width: 100%;
                padding: 0.8rem;
                border: 1px solid #d1d3e2;
                border-radius: 10px;
                font-size: 1rem;
            }
            
            .form-feedback {
                margin-top: 1.5rem;
                text-align: center;
                font-weight: 600;
            }
            
            .register-link {
                text-align: center;
                margin-top: 1.5rem;
            }
        `;
        
        document.head.appendChild(modalStyle);
        
        // Close modal functionality
        const closeModal = document.querySelector('.close-modal');
        closeModal.addEventListener('click', function() {
            document.body.removeChild(loginModal);
            document.head.removeChild(modalStyle);
        });
        
        // Form submission
        const loginForm = document.getElementById('login-form');
        const formFeedback = document.querySelector('.form-feedback');
        
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            if (!email || !password) {
                formFeedback.textContent = 'Please fill in all fields.';
                formFeedback.style.color = '#e74a3b';
                return;
            }
            
            // Simulate successful login
            formFeedback.textContent = 'Login successful! Redirecting to dashboard...';
            formFeedback.style.color = '#1cc88a';
            
            // Reset form
            loginForm.reset();
            
            // Close modal after delay
            setTimeout(() => {
                document.body.removeChild(loginModal);
                document.head.removeChild(modalStyle);
                
                // Show dashboard (in a real app, this would redirect to the dashboard)
                alert('Welcome to your Math Adventure dashboard!');
            }, 2000);
        });
        
        // Register link
        const registerLink = document.querySelector('.register-link a');
        registerLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close login modal
            document.body.removeChild(loginModal);
            document.head.removeChild(modalStyle);
            
            // Show register modal
            showRegisterModal();
        });
    }
    
    // Function to show register modal
    function showRegisterModal() {
        // Create registration modal
        const registerModal = document.createElement('div');
        registerModal.className = 'register-modal';
        
        registerModal.innerHTML = `
            <div class="register-modal-content">
                <span class="close-modal">&times;</span>
                <h2>Register for Math Adventure</h2>
                <form id="register-form">
                    <div class="form-group">
                        <label for="student-name">Student Name</label>
                        <input type="text" id="student-name" required>
                    </div>
                    <div class="form-group">
                        <label for="parent-name">Parent/Guardian Name</label>
                        <input type="text" id="parent-name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input type="email" id="email" required>
                    </div>
                    <div class="form-group">
                        <label for="school">School</label>
                        <input type="text" id="school" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Create Password</label>
                        <input type="password" id="password" required>
                    </div>
                    <button type="submit" class="btn primary-btn">Register Now</button>
                </form>
                <div class="form-feedback"></div>
                <p class="login-link">Already have an account? <a href="#login">Login here</a></p>
            </div>
        `;
        
        document.body.appendChild(registerModal);
        
        // Add styles for the modal
        const modalStyle = document.createElement('style');
        modalStyle.textContent = `
            .register-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            }
            
            .register-modal-content {
                background-color: white;
                padding: 2rem;
                border-radius: 15px;
                width: 90%;
                max-width: 500px;
                position: relative;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
                max-height: 90vh;
                overflow-y: auto;
            }
            
            .close-modal {
                position: absolute;
                top: 10px;
                right: 20px;
                font-size: 2rem;
                cursor: pointer;
                color: #5a5c69;
            }
            
            .form-group {
                margin-bottom: 1.5rem;
            }
            
            .form-group label {
                display: block;
                margin-bottom: 0.5rem;
                font-weight: 600;
            }
            
            .form-group input {
                width: 100%;
                padding: 0.8rem;
                border: 1px solid #d1d3e2;
                border-radius: 10px;
                font-size: 1rem;
            }
            
            .form-feedback {
                margin-top: 1.5rem;
                text-align: center;
                font-weight: 600;
            }
            
            .login-link {
                text-align: center;
                margin-top: 1.5rem;
            }
        `;
        
        document.head.appendChild(modalStyle);
        
        // Close modal functionality
        const closeModal = document.querySelector('.close-modal');
        closeModal.addEventListener('click', function() {
            document.body.removeChild(registerModal);
            document.head.removeChild(modalStyle);
        });
        
        // Form submission
        const registerForm = document.getElementById('register-form');
        const formFeedback = document.querySelector('.form-feedback');
        
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const studentName = document.getElementById('student-name').value;
            const parentName = document.getElementById('parent-name').value;
            const email = document.getElementById('email').value;
            const school = document.getElementById('school').value;
            const password = document.getElementById('password').value;
            
            if (!studentName || !parentName || !email || !school || !password) {
                formFeedback.textContent = 'Please fill in all fields.';
                formFeedback.style.color = '#e74a3b';
                return;
            }
            
            if (password.length < 6) {
                formFeedback.textContent = 'Password must be at least 6 characters.';
                formFeedback.style.color = '#e74a3b';
                return;
            }
            
            // Simulate successful registration
            formFeedback.textContent = 'Registration successful! Welcome to Math Adventure!';
            formFeedback.style.color = '#1cc88a';
            
            // Reset form
            registerForm.reset();
            
            // Close modal after delay
            setTimeout(() => {
                document.body.removeChild(registerModal);
                document.head.removeChild(modalStyle);
                
                // Show welcome message (in a real app, this would redirect to the dashboard)
                alert('Welcome to Math Adventure! Your account has been created successfully.');
            }, 3000);
        });
        
        // Login link
        const loginLink = document.querySelector('.login-link a');
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close register modal
            document.body.removeChild(registerModal);
            document.head.removeChild(modalStyle);
            
            // Show login modal
            showLoginModal();
        });
    }
    
    // Function to show game modal
    function showGameModal() {
        // Create game modal
        const gameModal = document.createElement('div');
        gameModal.className = 'game-modal';
        
        gameModal.innerHTML = `
            <div class="game-modal-content">
                <span class="close-modal">&times;</span>
                <h2>Number Ninja Challenge</h2>
                <div class="game-area">
                    <div class="game-question">
                        <p>What is <span id="num1">6</span> × <span id="num2">7</span>?</p>
                    </div>
                    <div class="game-options">
                        <button class="game-option">36</button>
                        <button class="game-option">42</button>
                        <button class="game-option">48</button>
                        <button class="game-option">54</button>
                    </div>
                    <div class="game-feedback"></div>
                    <div class="game-score">Score: <span id="score">0</span></div>
                </div>
            </div>
        `;
        
        document.body.appendChild(gameModal);
        
        // Add styles for the modal
        const modalStyle = document.createElement('style');
        modalStyle.textContent = `
            .game-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            }
            
            .game-modal-content {
                background-color: white;
                padding: 2rem;
                border-radius: 15px;
                width: 90%;
                max-width: 600px;
                position: relative;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            }
            
            .close-modal {
                position: absolute;
                top: 10px;
                right: 20px;
                font-size: 2rem;
                cursor: pointer;
                color: #5a5c69;
            }
            
            .game-area {
                margin-top: 1.5rem;
            }
            
            .game-question {
                font-size: 2rem;
                text-align: center;
                margin-bottom: 2rem;
                font-family: 'Comic Neue', cursive;
                color: #4e73df;
            }
            
            .game-options {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 1rem;
            }
            
            .game-option {
                padding: 1rem;
                font-size: 1.5rem;
                border: none;
                border-radius: 10px;
                background-color: #f0f8ff;
                cursor: pointer;
                transition: all 0.3s ease;
                font-family: 'Comic Neue', cursive;
            }
            
            .game-option:hover {
                background-color: #d4e4fd;
                transform: translateY(-3px);
            }
            
            .correct {
                background-color: #1cc88a !important;
                color: white;
            }
            
            .incorrect {
                background-color: #e74a3b !important;
                color: white;
            }
            
            .game-feedback {
                text-align: center;
                margin: 1.5rem 0;
                font-size: 1.2rem;
                min-height: 2rem;
            }
            
            .game-score {
                text-align: center;
                font-size: 1.5rem;
                font-weight: bold;
                color: #4e73df;
            }
        `;
        
        document.head.appendChild(modalStyle);
        
        // Close modal functionality
        const closeModal = document.querySelector('.close-modal');
        closeModal.addEventListener('click', function() {
            document.body.removeChild(gameModal);
            document.head.removeChild(modalStyle);
        });
        
        // Game logic
        let score = 0;
        const scoreElement = document.getElementById('score');
        const feedbackElement = document.querySelector('.game-feedback');
        const gameOptions = document.querySelectorAll('.game-option');
        
        function generateQuestion() {
            const num1 = Math.floor(Math.random() * 10) + 1;
            const num2 = Math.floor(Math.random() * 10) + 1;
            const correctAnswer = num1 * num2;
            
            document.getElementById('num1').textContent = num1;
            document.getElementById('num2').textContent = num2;
            
            // Generate 4 options with one being the correct answer
            const options = [correctAnswer];
            
            while (options.length < 4) {
                const wrongAnswer = Math.floor(Math.random() * 100) + 1;
                if (!options.includes(wrongAnswer)) {
                    options.push(wrongAnswer);
                }
            }
            
            // Shuffle options
            options.sort(() => Math.random() - 0.5);
            
            // Set options text
            gameOptions.forEach((option, index) => {
                option.textContent = options[index];
                option.classList.remove('correct', 'incorrect');
            });
            
            // Add click event to options
            gameOptions.forEach(option => {
                option.onclick = function() {
                    const selectedAnswer = parseInt(this.textContent);
                    
                    if (selectedAnswer === correctAnswer) {
                        this.classList.add('correct');
                        feedbackElement.textContent = 'Correct! Well done!';
                        feedbackElement.style.color = '#1cc88a';
                        score += 10;
                        scoreElement.textContent = score;
                        
                        // Generate new question after a delay
                        setTimeout(generateQuestion, 1500);
                    } else {
                        this.classList.add('incorrect');
                        feedbackElement.textContent = `Incorrect. The answer is ${correctAnswer}.`;
                        feedbackElement.style.color = '#e74a3b';
                        
                        // Show correct answer
                        gameOptions.forEach(opt => {
                            if (parseInt(opt.textContent) === correctAnswer) {
                                opt.classList.add('correct');
                            }
                        });
                        
                        // Generate new question after a delay
                        setTimeout(generateQuestion, 2000);
                    }
                };
            });
        }
        
        // Start the game
        generateQuestion();
    }
    
    // Simple animation for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
    });

    // Sample game interaction
    const playButton = document.querySelector('.play-btn');
    
    if (playButton) {
        playButton.addEventListener('click', function(e) {
            e.preventDefault();
            showGameModal();
        });
    }

    // Initialize the page to show all sections
    // This ensures everything is visible when the page first loads
    sections.home.style.display = 'flex';
    sections.features.style.display = 'block';
    sections.topics.style.display = 'block';
    sections.sampleGame.style.display = 'block';
    sections.testimonials.style.display = 'block';
    sections.getStarted.style.display = 'flex';
});
