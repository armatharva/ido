// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all tab buttons and content
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and content
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
    
    // Q&A Accordion functionality
    const qaQuestions = document.querySelectorAll('.qa-question');
    
    qaQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const qaItem = this.parentElement;
            const answer = qaItem.querySelector('.qa-answer');
            const isActive = qaItem.classList.contains('active');
            
            // Close all other open Q&A items
            document.querySelectorAll('.qa-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.qa-answer').classList.remove('active');
            });
            
            // If this item wasn't active, open it
            if (!isActive) {
                qaItem.classList.add('active');
                answer.classList.add('active');
            }
        });
    });
    
    // Video error handling
    const demoVideo = document.querySelector('.demo-video');
    if (demoVideo) {
        demoVideo.addEventListener('error', function() {
            const container = this.parentElement;
            container.innerHTML = `
                <div style="
                    background: linear-gradient(135deg, #fdf2f8 0%, #f3e8ff 100%);
                    padding: 40px;
                    border-radius: 12px;
                    text-align: center;
                    border: 2px dashed #ec4899;
                ">
                    <h3 style="color: #ec4899; margin-bottom: 16px;">Video Demonstration</h3>
                    <p style="color: #6b7280; margin-bottom: 16px;">
                        The demonstration video "pad-demonstration-video.mp4" is not available.
                    </p>
                    <p style="color: #6b7280; font-size: 14px;">
                        Please add your video file to display the step-by-step pad demonstration.
                    </p>
                </div>
            `;
        });
    }
    
    // Anatomy diagram error handling
    const anatomyDiagram = document.querySelector('.diagram');
    if (anatomyDiagram) {
        anatomyDiagram.addEventListener('error', function() {
            this.style.display = 'none';
            const container = this.parentElement;
            const placeholder = document.createElement('div');
            placeholder.innerHTML = `
                <div style="
                    background: linear-gradient(135deg, #fdf2f8 0%, #f3e8ff 100%);
                    padding: 40px;
                    border-radius: 12px;
                    text-align: center;
                    border: 2px dashed #8b5cf6;
                    margin-bottom: 16px;
                ">
                    <div style="font-size: 48px; margin-bottom: 16px;">📊</div>
                    <h4 style="color: #8b5cf6; margin-bottom: 12px;">Anatomical Diagram</h4>
                    <p style="color: #6b7280; font-size: 14px;">
                        Add "anatomy-diagram.jpg" to display the reproductive system diagram
                    </p>
                </div>
            `;
            container.insertBefore(placeholder, this);
        });
    }
    
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add some interactive feedback for buttons
    document.querySelectorAll('button, .qa-question').forEach(element => {
        element.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        element.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Urgency filter functionality (optional enhancement)
    function filterQuestionsByUrgency(urgencyLevel) {
        const qaItems = document.querySelectorAll('.qa-item');
        
        qaItems.forEach(item => {
            if (urgencyLevel === 'all' || item.getAttribute('data-urgency') === urgencyLevel) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    // Add filter buttons dynamically (optional feature)
    function addUrgencyFilters() {
        const qaCard = document.querySelector('#qa .card');
        const urgencyLegend = document.querySelector('.urgency-legend');
        
        if (qaCard && urgencyLegend) {
            const filterContainer = document.createElement('div');
            filterContainer.innerHTML = `
                <div style="margin: 20px 0; text-align: center;">
                    <p style="margin-bottom: 12px; color: #6b7280;">Filter questions by urgency:</p>
                    <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;">
                        <button class="urgency-filter active" data-filter="all" style="
                            padding: 8px 16px;
                            border: none;
                            border-radius: 6px;
                            background: #ec4899;
                            color: white;
                            font-size: 12px;
                            cursor: pointer;
                            transition: all 0.2s;
                        ">All Questions</button>
                        <button class="urgency-filter" data-filter="emergency" style="
                            padding: 8px 16px;
                            border: 1px solid #fca5a5;
                            border-radius: 6px;
                            background: #fef2f2;
                            color: #dc2626;
                            font-size: 12px;
                            cursor: pointer;
                            transition: all 0.2s;
                        ">Emergency</button>
                        <button class="urgency-filter" data-filter="concerning" style="
                            padding: 8px 16px;
                            border: 1px solid #fcd34d;
                            border-radius: 6px;
                            background: #fffbeb;
                            color: #d97706;
                            font-size: 12px;
                            cursor: pointer;
                            transition: all 0.2s;
                        ">Concerning</button>
                        <button class="urgency-filter" data-filter="normal" style="
                            padding: 8px 16px;
                            border: 1px solid #86efac;
                            border-radius: 6px;
                            background: #f0fdf4;
                            color: #059669;
                            font-size: 12px;
                            cursor: pointer;
                            transition: all 0.2s;
                        ">Normal</button>
                    </div>
                </div>
            `;
            
            urgencyLegend.parentNode.insertBefore(filterContainer, urgencyLegend.nextSibling);
            
            // Add click handlers for filter buttons
            document.querySelectorAll('.urgency-filter').forEach(button => {
                button.addEventListener('click', function() {
                    // Remove active class from all filter buttons
                    document.querySelectorAll('.urgency-filter').forEach(btn => {
                        btn.classList.remove('active');
                        btn.style.background = btn.getAttribute('data-filter') === 'all' ? '#f3f4f6' : 
                                             btn.getAttribute('data-filter') === 'emergency' ? '#fef2f2' :
                                             btn.getAttribute('data-filter') === 'concerning' ? '#fffbeb' : '#f0fdf4';
                        btn.style.color = btn.getAttribute('data-filter') === 'all' ? '#374151' : 
                                         btn.getAttribute('data-filter') === 'emergency' ? '#dc2626' :
                                         btn.getAttribute('data-filter') === 'concerning' ? '#d97706' : '#059669';
                    });
                    
                    // Add active class to clicked button
                    this.classList.add('active');
                    this.style.background = '#ec4899';
                    this.style.color = 'white';
                    
                    // Filter questions
                    filterQuestionsByUrgency(this.getAttribute('data-filter'));
                });
            });
        }
    }
    
    // Initialize urgency filters
    addUrgencyFilters();
    
    // Analytics tracking (placeholder for future implementation)
    function trackEvent(eventName, properties = {}) {
        console.log('Event tracked:', eventName, properties);
        // Implement actual analytics tracking here if needed
    }
    
    // Track tab changes
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            trackEvent('tab_change', {
                tab: this.getAttribute('data-tab')
            });
        });
    });
    
    // Track Q&A interactions
    qaQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const questionText = this.querySelector('.question-text').textContent;
            const urgency = this.querySelector('.urgency-badge').textContent;
            
            trackEvent('qa_question_opened', {
                question: questionText,
                urgency: urgency
            });
        });
    });
});
