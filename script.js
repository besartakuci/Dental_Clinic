// Hamburger Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
})

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}))

document.addEventListener('DOMContentLoaded', (event) => {
  // Change Text Based on Time of Day
  const welcomeMessage = document.getElementById('welcome-message');
  const currentHour = new Date().getHours();
  if (currentHour < 12) {
      welcomeMessage.textContent = 'Good Morning! Affordable Full-Service Dental Care in LA';
  } else if (currentHour < 18) {
      welcomeMessage.textContent = 'Good Afternoon! Affordable Full-Service Dental Care in LA';
  } else {
      welcomeMessage.textContent = 'Good Evening! Affordable Full-Service Dental Care in LA';
  }

  // Load More Button
  const loadMoreButton = document.getElementById('load-more');
  loadMoreButton.addEventListener('click', function() {
      const newService = document.createElement('div');
      newService.classList.add('container_services');
      newService.innerHTML = `
          <img src="./assets/images/service-4.jpg" alt="">
          <div class="overlay">
              <div class="content">
                  <h2>New Service</h2>
              </div>
          </div>
      `;
      document.querySelector('.services').appendChild(newService);
  });
  

  // Hover Effects
  const serviceContainers = document.querySelectorAll('.container_services');
  serviceContainers.forEach(container => {
      container.addEventListener('mouseover', () => {
          container.style.backgroundColor = '#f0f0f0';
      });
      container.addEventListener('mouseout', () => {
          container.style.backgroundColor = '';
      });
  });

  // Form Validation
  const form = document.getElementById('appointment-form');
  form.addEventListener('submit', function(event) {
      event.preventDefault();
      let isValid = true;
      const email = document.getElementById('email');
      const emailValue = email.value;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailValue)) {
          isValid = false;
          email.classList.add('error');
      } else {
          email.classList.remove('error');
      }

      if (isValid) {
          const formMessage = document.getElementById('form-message');
          formMessage.style.display = 'block';
          formMessage.textContent = 'Form submitted successfully!';
          form.reset();
      }
  });
});

// Get the button
let backToTopButton = document.getElementById("back-to-top");

// When the user scrolls down 100px from the top of the document, show the button
window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
};

// When the user clicks on the button, scroll to the top of the document
backToTopButton.onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Asynchronous function to fetch team members data from an API
async function fetchTeamMembers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const teamMembers = await response.json();
        displayTeamMembers(teamMembers);
    } catch (error) {
        console.error('Error fetching team members:', error);
    }
}

// Function to display team members dynamically
function displayTeamMembers(members) {
    const teamContainer = document.getElementById('team-members');
    members.forEach(member => {
        const memberElement = document.createElement('div');
        memberElement.classList.add('team_container');
        memberElement.innerHTML = `
            <img src="https://i.pravatar.cc/150?img=${member.id}" alt="">
            <div class="team_overlay">
                <div class="team_content">
                    <h2>${member.name}</h2>
                    <p>${member.company.name}</p>
                </div>
            </div>
        `;
        teamContainer.appendChild(memberElement);
    });
}

// Fetch team members on page load
document.addEventListener('DOMContentLoaded', fetchTeamMembers);

// JavaScript class for managing services
class Service {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }

    render() {
        return `
            <div class="service">
                <h2>${this.name}</h2>
                <p>${this.description}</p>
            </div>
        `;
    }
}

//this works but based on the fact that there are no API with the dental services it doesn't look that good in the front
// Example of using the Service class to render services
/*const services = [
    new Service('Dental Exams', 'Comprehensive dental exams for all ages.'),
    new Service('Dental Cleaning', 'Professional teeth cleaning for a bright smile.'),
    new Service('Root Canal', 'Effective root canal treatment to save your teeth.')
];

services.forEach(service => {
    document.querySelector('.services').innerHTML += service.render();
});
*/

 // Save user preferences in local storage
 const themeToggle = document.getElementById('theme-toggle');

 themeToggle.addEventListener('click', () => {
     document.body.classList.toggle('dark-theme');
     const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
     localStorage.setItem('theme', theme);
 });

 // Apply saved theme on page load
 document.addEventListener('DOMContentLoaded', () => {
     const savedTheme = localStorage.getItem('theme');
     if (savedTheme === 'dark') {
         document.body.classList.add('dark-theme');
     }
 });

// Handle form submission and save inputs to local storage
const form = document.getElementById('appointment-form');
form.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());
    localStorage.setItem('appointmentData', JSON.stringify(formObject));
    document.getElementById('form-message').style.display = 'block';
});
