window.addEventListener('load', () => {
    let countUser = document.querySelector('.count-user'),
        countComp = document.querySelector('.count-comp'),
        userField = document.querySelector('.user-field'),
        compField = document.querySelector('.comp-field'),
        sound = document.querySelector('.sound'),
        res = document.querySelector('.result'),
        play = document.querySelector('.play'),
        fields = document.querySelectorAll('.field'),
        userStep, compStep, countU = 0, countC = 0, blocked = false;

    function choiceUser(e) {
        if (blocked) return;
        let target = e.target;
        if (target.classList.contains('field')) {
            userStep = target.dataset.field;
            fields.forEach(item => item.classList.remove('active', 'error'));
            target.classList.add('active');
            choiceComp();
        }
    }
    function choiceComp() {
        blocked = true;
        let rand = Math.floor(Math.random() * 3);
        compField.classList.add('blink');
        let compFields = compField.querySelectorAll('.field');
        setTimeout(() => {
            compField.classList.remove('blink');
            compStep = compFields[rand].dataset.field;
            compFields[rand].classList.add('active');
            winner();
        }, 2500);
    }
    function winner() {
        blocked = false;
        let comb = userStep + compStep;
        switch (comb) {
            case 'rr':
            case 'ss':
            case 'pp':
                res.innerText = 'GAME OVER. TIE!';
                sound.setAttribute('src', 'audio/draw.mp3');
                sound.play();
                break;
            case 'rs':
            case 'sp':
            case 'pr':
                res.innerText = 'Your victory!';
                sound.setAttribute('src', 'audio/win.mp3');
                sound.play();
                countU++;
                countUser.innerText = countU;
                compField.querySelector('[data-field='+compStep+']').classList.add('error');
                break;
            case 'sr':
            case 'ps':
            case 'rp':
                res.innerText = 'Computer won!';
                sound.setAttribute('src', 'audio/loss.mp3');
                sound.play();
                countC++;
                countComp.innerText = countC;
                userField.querySelector('[data-field='+userStep+']').classList.add('error');
                break;
        }
    }
    function playGame() {
        countU = countC = 0;
        res.innerText = 'Choose one!';
        countUser.innerText = '0';
        countComp.innerText = '0';
        fields.forEach(item => item.classList.remove('active', 'error'));
    }

    play.addEventListener('click', playGame);
    userField.addEventListener('click', choiceUser);
});

particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 150,
            "density": {
            "enable": true,
            "value_area": 800
            }
        },
        "color": {
            "value": "#ffffff"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
        },
        "polygon": {
            "nb_sides": 5
        },
        "image": {
            "src": "img/github.svg",
            "width": 100,
            "height": 100
        }
        },
        "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
        }
        },
        "size": {
            "value": 2,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 100,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "grab"
            },
        "onclick": {
            "enable": true,
            "mode": "push"
        },
        "resize": true
        },
        "modes": {
            "grab": {
                "distance": 140,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
});
